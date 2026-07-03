import https from "node:https";

export interface RussianShare {
  ticker: string;
  name: string;
  sector: string;
  logoName: string;
  logoBaseColor: string;
  textColor: string;
  figi: string;
  uid: string;
}

let sharesCache: { data: RussianShare[]; ts: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

const BASE_HOST = "invest-public-api.tinkoff.ru";

function quotationToNumber(units: string | number, nano: number): number {
  return Number(units) + nano / 1_000_000_000;
}

function getToken(): string {
  const raw = process.env.TINKOFF_TOKEN;
  if (!raw) throw new Error("TINKOFF_TOKEN environment variable is not set");
  const token = raw.replace(/[^\x20-\x7E]/g, "").trim();
  if (!token) throw new Error("TINKOFF_TOKEN contains only non-ASCII characters — please re-enter the token");
  return token;
}

function tinkoffPost(path: string, body: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const token = getToken();
    const data = JSON.stringify(body);
    const options: https.RequestOptions = {
      hostname: BASE_HOST,
      port: 443,
      path: `/rest${path}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Content-Length": Buffer.byteLength(data),
        "Authorization": `Bearer ${token}`,
      },
    };

    const req = https.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => { raw += chunk; });
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 400) {
          return reject(new Error(`Tinkoff API ${res.statusCode}: ${raw}`));
        }
        try {
          resolve(JSON.parse(raw));
        } catch {
          reject(new Error(`Failed to parse response: ${raw}`));
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

export async function getStockPrice(ticker: string, classCode = "TQBR") {
  const shareData = await tinkoffPost(
    "/tinkoff.public.invest.api.contract.v1.InstrumentsService/ShareBy",
    { idType: "INSTRUMENT_ID_TYPE_TICKER", classCode, id: ticker }
  );

  const instrument = shareData.instrument;
  if (!instrument) throw new Error(`Instrument not found: ${ticker}`);

  const { figi, uid, name, currency } = instrument;

  const priceData = await tinkoffPost(
    "/tinkoff.public.invest.api.contract.v1.MarketDataService/GetLastPrices",
    { instrumentId: [uid] }
  );

  const lastPrice = priceData.lastPrices?.[0]?.price;
  const price = lastPrice != null ? quotationToNumber(lastPrice.units, lastPrice.nano) : null;

  return { name, ticker, figi, price, currency };
}

export async function getAllRussianShares(): Promise<RussianShare[]> {
  if (sharesCache && Date.now() - sharesCache.ts < CACHE_TTL_MS) {
    return sharesCache.data;
  }

  const result = await tinkoffPost(
    "/tinkoff.public.invest.api.contract.v1.InstrumentsService/Shares",
    { instrumentStatus: "INSTRUMENT_STATUS_ALL" }
  );

  const instruments: RussianShare[] = (result.instruments || [])
    .filter((s: any) => s.classCode === "TQBR" && s.apiTradeAvailableFlag === true && s.ticker !== "HHRU")
    .map((s: any) => ({
      ticker: s.ticker,
      name: s.name,
      sector: s.sector || "",
      logoName: s.brand?.logoName || "",
      logoBaseColor: s.brand?.logoBaseColor || "#666666",
      textColor: s.brand?.textColor || "#ffffff",
      figi: s.figi,
      uid: s.uid,
    }))
    .sort((a: RussianShare, b: RussianShare) => a.ticker.localeCompare(b.ticker));

  sharesCache = { data: instruments, ts: Date.now() };
  return instruments;
}

export async function getMultipleStockPrices(
  tickers: string[],
  classCode = "TQBR"
): Promise<Record<string, number | null>> {
  const results = await Promise.allSettled(
    tickers.map((ticker) => getStockPrice(ticker, classCode))
  );

  const prices: Record<string, number | null> = {};
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      prices[tickers[i]] = result.value.price;
    } else {
      console.error(`Price fetch failed for ${tickers[i]}:`, result.reason?.message);
      prices[tickers[i]] = null;
    }
  });

  return prices;
}
