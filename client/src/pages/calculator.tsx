import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Plus, Trash2, Pencil, ArrowUpDown, ArrowUp, ArrowDown, X, Wallet, Settings2, ChevronDown, TrendingUp, TrendingDown, PlusCircle, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Trade, Company } from "@shared/schema";

import gazpLogo from "@assets/gazp_1772864925931.png";
import lkohLogo from "@assets/lkoh_1772868220319.png";
import nlmkLogo from "@assets/NLMK_1772868220320.png";
import sberLogo from "@assets/ssber_1772868220320.png";
import tLogo from "@assets/T_1772868220321.png";
import mtsLogo from "@assets/mts_1773152486781.png";
import gmknLogo from "@assets/Norilskynikel_1773152486785.png";
import rstiLogo from "@assets/rostelecom_1773152486788.png";
import chmfLogo from "@assets/severstal_1773152486790.png";
import roloLogo from "@assets/sovoc_1773152486791.png";
import vkLogo from "@assets/vk_1773152486793.png";
import domrfLogo from "@assets/domrf_1773484648107.png";
import abioLogo from "@assets/ABIO_1773496453863.png";
import abrdLogo from "@assets/ABRD_1773496453864.png";
import afksLogo from "@assets/AFKS_1773496453865.png";
import afltLogo from "@assets/AFLT_1773496453865.png";
import akrnLogo from "@assets/AKRN_1773496453866.png";
import alrsLogo from "@assets/ALRS_1773496453867.png";
import aptkLogo from "@assets/APTK_1773496453867.png";
import aquaLogo from "@assets/AQUA_1773496453868.png";
import astrLogo from "@assets/ASTR_1773496453868.png";
import baneLogo from "@assets/BANE_1773496453869.png";
import banepLogo from "@assets/BANEP_1773496453869.png";
import bazaLogo from "@assets/BAZA_1773506513207.png";
import beluLogo from "@assets/BELU_1773506513208.png";
import blngLogo from "@assets/BLNG_1773506513209.png";
import bspbLogo from "@assets/BSPB_1773506513210.png";
import carmLogo from "@assets/CARM_1773506513210.png";
import cbomLogo from "@assets/CBOM_1773506513211.png";
import chmkLogo from "@assets/CHMK_1773506513211.png";
import cnruLogo from "@assets/CNRU_1773506513212.png";
import cntlLogo from "@assets/CNTL_1773506513212.png";
import cntlpLogo from "@assets/CNTLP_1773506513213.png";
import dataLogo from "@assets/DATA_1773506513214.png";
import deliLogo from "@assets/DELI_1773506513214.png";
import diasLogo from "@assets/DIAS_1773506513215.png";
import dvecLogo from "@assets/DVEC_1773506513215.png";
import elfvLogo from "@assets/ELFV_1773506513216.png";
import enpgLogo from "@assets/ENPG_1773506513216.png";
import etlnLogo from "@assets/ETLN_1773506513217.png";
import eutrLogo from "@assets/EUTR_1773506513217.png";
import feesLogo from "@assets/FEES_1773506513217.png";
import feshLogo from "@assets/FESH_1773506513218.png";
import fixrLogo from "@assets/FIXR_1773507452048.png";
import flotLogo from "@assets/FLOT_1773507452051.png";
import gcheLogo from "@assets/GCHE_1773507452051.png";
import gecoLogo from "@assets/GECO_1773507452052.png";
import gemcLogo from "@assets/GEMC_1773507452052.png";
import glrxLogo from "@assets/GLRX_1773507452053.png";
import gtrkLogo from "@assets/GTRK_1773507452053.png";
import headLogo from "@assets/HEAD_1773507452054.png";
import hnfgLogo from "@assets/HNFG_1773507452054.png";
import hydrLogo from "@assets/HYDR_1773507452055.png";
import iraoLogo from "@assets/IRAO_1773507452055.png";
import irktLogo from "@assets/IRKT_1773507452056.png";
import ivatLogo from "@assets/IVAT_1773507452056.png";
import kaztLogo from "@assets/KAZT_1773507452057.png";
import kaztpLogo from "@assets/KAZTP_1773507452057.png";
import klsbLogo from "@assets/KLSB_1773507452058.png";
import klvzLogo from "@assets/KLVZ_1773507452058.png";
import kmazLogo from "@assets/KMAZ_1773507639979.png";
import krknpLogo from "@assets/KRKNP_1773507639981.png";
import krotLogo from "@assets/KROT_1773507639982.png";
import magnLogo from "@assets/MAGN_1773507639982.png";
import unklLogo from "@assets/UNKL_1773507639983.png";
import uproLogo from "@assets/UPRO_1773507639983.png";
import uwgnLogo from "@assets/UWGN_1773507639984.png";
import veonRxLogo from "@assets/VEON-RX_1773507639984.png";
import veonLogo from "@assets/VEON_1773507639985.png";
import vrsbLogo from "@assets/VRSB_1773507639985.png";
import vsehLogo from "@assets/VSEH_1773507639986.png";
import vsmoLogo from "@assets/VSMO_1773507639986.png";
import vtbrLogo from "@assets/VTBR_1773507639987.png";
import wushLogo from "@assets/WUSH_1773507639987.png";
import x5Logo from "@assets/X5_1773507639988.png";
import yakgLogo from "@assets/YAKG_1773507639988.png";
import ydexLogo from "@assets/YDEX_1773507639989.png";
import zaymLogo from "@assets/ZAYM_1773507639989.png";
import kzosLogo from "@assets/KZOS_1773508746982.png";
import kzospLogo from "@assets/KZOSP_1773508746983.png";
import leasLogo from "@assets/LEAS_1773508746983.png";
import lentLogo from "@assets/LENT_1773508746983.png";
import lifeLogo from "@assets/LIFE_1773508746984.png";
import lnzlLogo from "@assets/LNZL_1773508746984.png";
import lnzlpLogo from "@assets/LNZLP_1773508746985.png";
import lsngLogo from "@assets/LSNG_1773508746985.png";
import lsngpLogo from "@assets/LSNGP_1773508746985.png";
import lsrgLogo from "@assets/LSRG_1773508746986.png";
import mbnkLogo from "@assets/MBNK_1773508746986.png";
import mdmgLogo from "@assets/MDMG_1773508746986.png";
import mgklLogo from "@assets/MGKL_1773508746987.png";
import mgntLogo from "@assets/MGNT_1773508746987.png";
import mgtspLogo from "@assets/MGTSP_1773508746988.png";
import moexLogo from "@assets/MOEX_1773508746989.png";
import mrkcLogo from "@assets/MRKC_1773508825533.png";
import mrkpLogo from "@assets/MRKP_1773508825535.png";
import mrksLogo from "@assets/MRKS_1773508825536.png";
import mrkuLogo from "@assets/MRKU_1773508825537.png";
import mrkvLogo from "@assets/MRKV_1773508825537.png";
import mrkyLogo from "@assets/MRKY_1773508825538.png";
import mrkzLogo from "@assets/MRKZ_1773508825538.png";
import msrsLogo from "@assets/MSRS_1773508825539.png";
import msttLogo from "@assets/MSTT_1773508825540.png";
import mtlrLogo from "@assets/MTLR_1773508825540.png";
import mtlrpLogo from "@assets/MTLRP_1773508825540.png";
import mvidLogo from "@assets/MVID_1773508825541.png";
import nkhpLogo from "@assets/NKHP_1773508825541.png";
import nkncLogo from "@assets/NKNC_1773508825542.png";
import nkncpLogo from "@assets/NKNCP_1773508825542.png";
import nmtpLogo from "@assets/NMTP_1773508825542.png";
import nsvzLogo from "@assets/NSVZ_1773508825543.png";
import nvtkLogo from "@assets/NVTK_1773508825543.png";
import ogkbLogo from "@assets/OGKB_1773508825543.png";
import okeyLogo from "@assets/OKEY_1773508825544.png";
import ozonLogo from "@assets/OZON_1773508970834.png";
import ozphLogo from "@assets/OZPH_1773508970835.png";
import phorLogo from "@assets/PHOR_1773508970835.png";
import pikkLogo from "@assets/PIKK_1773508970836.png";
import plzlLogo from "@assets/PLZL_1773508970836.png";
import pmsbLogo from "@assets/PMSB_1773508970838.png";
import pmsbpLogo from "@assets/PMSBP_1773508970839.png";
import posiLogo from "@assets/POSI_1773508970839.png";
import ugldLogo from "@assets/UGLD_1773508970840.png";
import unacLogo from "@assets/UNAC_1773508970840.png";
import msngLogo from "@assets/MSNG_1773509615289.png";
import prfnLogo from "@assets/PRFN_1773509615291.png";
import prmdLogo from "@assets/PRMD_1773509615292.png";
import ragrLogo from "@assets/RAGR_1773509615292.png";
import raspLogo from "@assets/RASP_1773509615293.png";
import rbcmLogo from "@assets/RBCM_1773509615293.png";
import reniLogo from "@assets/RENI_1773509615294.png";
import rkkeLogo from "@assets/RKKE_1773509615295.png";
import rnftLogo from "@assets/RNFT_1773509615295.png";
import roloLogo2 from "@assets/ROLO_1773509615296.png";
import rosnLogo from "@assets/ROSN_1773509615296.png";
import rtkmpLogo from "@assets/RTKMP_1773509615297.png";
import rualLogo from "@assets/RUAL_1773509615297.png";
import sberpLogo from "@assets/SBERP_1773509615298.png";
import selgLogo from "@assets/SELG_1773509615298.png";
import sfinLogo from "@assets/SFIN_1773509678091.png";
import sgzhLogo from "@assets/SGZH_1773509678092.png";
import sibnLogo from "@assets/SIBN_1773509678093.png";
import sngsLogo from "@assets/SNGS_1773509678093.png";
import sngspLogo from "@assets/SNGSP_1773509678094.png";
import soflLogo from "@assets/SOFL_1773509678094.png";
import svavLogo from "@assets/SVAV_1773509678095.png";
import tatnLogo from "@assets/TATN_1773509678096.png";
import tatnpLogo from "@assets/TATNP_1773509678096.png";
import tgkaLogo from "@assets/TGKA_1773509678097.png";
import tgkbLogo from "@assets/TGKB_1773509678097.png";
import tgkbpLogo from "@assets/TGKBP_1773509678098.png";
import tgknLogo from "@assets/TGKN_1773509678098.png";
import trmkLogo from "@assets/TRMK_1773509678099.png";
import trnfpLogo from "@assets/TRNFP_1773509678100.png";
import ttlkLogo from "@assets/TTLK_1773509678100.png";
import smltLogo from "@assets/SMLT_1773509806640.png";

const logoMap: Record<string, string> = {
  GAZP: gazpLogo, LKOH: lkohLogo, NLMK: nlmkLogo, SBER: sberLogo,
  "T": tLogo, MTSS: mtsLogo, GMKN: gmknLogo, RTKM: rstiLogo,
  CHMF: chmfLogo, SVCB: roloLogo, VKCO: vkLogo, DOMRF: domrfLogo,
  ABIO: abioLogo, ABRD: abrdLogo, AFKS: afksLogo, AFLT: afltLogo,
  AKRN: akrnLogo, ALRS: alrsLogo, APTK: aptkLogo, AQUA: aquaLogo,
  ASTR: astrLogo, BANE: baneLogo, BANEP: banepLogo,
  BAZA: bazaLogo, BELU: beluLogo, BLNG: blngLogo, BSPB: bspbLogo,
  CARM: carmLogo, CBOM: cbomLogo, CHMK: chmkLogo, CNRU: cnruLogo,
  CNTL: cntlLogo, CNTLP: cntlpLogo, DATA: dataLogo, DELI: deliLogo,
  DIAS: diasLogo, DVEC: dvecLogo, ELFV: elfvLogo, ENPG: enpgLogo,
  ETLN: etlnLogo, EUTR: eutrLogo, FEES: feesLogo, FESH: feshLogo,
  FIXR: fixrLogo, FLOT: flotLogo, GCHE: gcheLogo, GECO: gecoLogo,
  GEMC: gemcLogo, GLRX: glrxLogo, GTRK: gtrkLogo, HEAD: headLogo,
  HNFG: hnfgLogo, HYDR: hydrLogo, IRAO: iraoLogo, IRKT: irktLogo,
  IVAT: ivatLogo, KAZT: kaztLogo, KAZTP: kaztpLogo, KLSB: klsbLogo,
  KLVZ: klvzLogo, KMAZ: kmazLogo, KRKNP: krknpLogo, KROT: krotLogo,
  MAGN: magnLogo, UNKL: unklLogo, UPRO: uproLogo, UWGN: uwgnLogo,
  "VEON-RX": veonRxLogo, VEON: veonLogo, VRSB: vrsbLogo, VSEH: vsehLogo,
  VSMO: vsmoLogo, VTBR: vtbrLogo, WUSH: wushLogo, X5: x5Logo,
  YAKG: yakgLogo, YDEX: ydexLogo, ZAYM: zaymLogo,
  KZOS: kzosLogo, KZOSP: kzospLogo, LEAS: leasLogo, LENT: lentLogo,
  LIFE: lifeLogo, LNZL: lnzlLogo, LNZLP: lnzlpLogo, LSNG: lsngLogo,
  LSNGP: lsngpLogo, LSRG: lsrgLogo, MBNK: mbnkLogo, MDMG: mdmgLogo,
  MGKL: mgklLogo, MGNT: mgntLogo, MGTSP: mgtspLogo, MOEX: moexLogo,
  MRKC: mrkcLogo, MRKP: mrkpLogo, MRKS: mrksLogo, MRKU: mrkuLogo,
  MRKV: mrkvLogo, MRKY: mrkyLogo, MRKZ: mrkzLogo, MSRS: msrsLogo,
  MSTT: msttLogo, MTLR: mtlrLogo, MTLRP: mtlrpLogo, MVID: mvidLogo,
  NKHP: nkhpLogo, NKNC: nkncLogo, NKNCP: nkncpLogo, NMTP: nmtpLogo,
  NSVZ: nsvzLogo, NVTK: nvtkLogo, OGKB: ogkbLogo, OKEY: okeyLogo,
  OZON: ozonLogo, OZPH: ozphLogo, PHOR: phorLogo, PIKK: pikkLogo,
  PLZL: plzlLogo, PMSB: pmsbLogo, PMSBP: pmsbpLogo, POSI: posiLogo,
  UGLD: ugldLogo, UNAC: unacLogo,
  MSNG: msngLogo, PRFN: prfnLogo, PRMD: prmdLogo, RAGR: ragrLogo,
  RASP: raspLogo, RBCM: rbcmLogo, RENI: reniLogo, RKKE: rkkeLogo,
  RNFT: rnftLogo, ROLO: roloLogo2, ROSN: rosnLogo, RTKMP: rtkmpLogo,
  RUAL: rualLogo, SBERP: sberpLogo, SELG: selgLogo,
  SFIN: sfinLogo, SGZH: sgzhLogo, SIBN: sibnLogo, SNGS: sngsLogo,
  SNGSP: sngspLogo, SOFL: soflLogo, SVAV: svavLogo, TATN: tatnLogo,
  TATNP: tatnpLogo, TGKA: tgkaLogo, TGKB: tgkbLogo, TGKBP: tgkbpLogo,
  TGKN: tgknLogo, TRMK: trmkLogo, TRNFP: trnfpLogo, TTLK: ttlkLogo,
  SMLT: smltLogo,
};

function fmt(n: number) {
  return n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcPnl(t: Trade, livePrice?: number): number {
  const bp = parseFloat(t.buyPrice as string);
  const sp = t.status === "closed"
    ? parseFloat(t.sellPrice as string || "0")
    : (livePrice ?? parseFloat(t.currentPrice as string || "0"));
  if (!sp) return 0;
  const mul = t.type === "BUY" ? 1 : -1;
  return mul * (sp - bp) * t.quantity;
}

function calcRet(t: Trade, livePrice?: number): number {
  const bp = parseFloat(t.buyPrice as string);
  if (!bp) return 0;
  const pnl = calcPnl(t, livePrice);
  return (pnl / (bp * t.quantity)) * 100;
}

type SortKey = keyof Trade | "pnl" | "ret";

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: "asc" | "desc" }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3 h-3 ml-1 text-white/20" />;
  return sortDir === "asc" ? <ArrowUp className="w-3 h-3 ml-1 text-violet-400" /> : <ArrowDown className="w-3 h-3 ml-1 text-violet-400" />;
}

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  company: "",
  ticker: "",
  type: "BUY",
  buyPrice: "",
  sellPrice: "",
  quantity: "",
  currentPrice: "",
  takeProfit: "",
  stopLoss: "",
  comment: "",
  status: "open",
  sector: "",
};

interface TinkoffShare {
  ticker: string;
  name: string;
  sector: string;
  logoName: string;
  logoBaseColor: string;
  textColor: string;
  figi: string;
  uid: string;
}

function CompanyLogo({ ticker, color, logoName, size = "sm" }: {
  ticker: string; color: string; logoName?: string; size?: "sm" | "md";
}) {
  const [localErr, setLocalErr] = useState(false);
  const [cdnErr, setCdnErr] = useState(false);
  const dim = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  const localLogo = logoMap[ticker];

  if (localLogo && !localErr) {
    return <img src={localLogo} alt={ticker} className={`${dim} rounded-full object-cover shrink-0`} onError={() => setLocalErr(true)} />;
  }
  if (logoName && !cdnErr) {
    const base = logoName.replace(/\.png$/i, "");
    return (
      <img
        src={`https://invest-static.cdn-tinkoff.ru/logos/invest/${base}x160.png`}
        alt={ticker}
        className={`${dim} rounded-full object-cover shrink-0`}
        onError={() => setCdnErr(true)}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center text-[9px] font-bold shrink-0`}
      style={{ backgroundColor: color + "33", border: `1px solid ${color}55`, color }}
    >
      {ticker.slice(0, 2)}
    </div>
  );
}

export default function CalculatorPage() {
  const [, setLocation] = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [portfolioSize, setPortfolioSize] = useState<string>(() => localStorage.getItem("portfolioSize") || "");
  const [portfolioInput, setPortfolioInput] = useState("");
  const [colSettingsOpen, setColSettingsOpen] = useState(false);
  const [expandedTradeId, setExpandedTradeId] = useState<number | null>(null);
  const [addToPositionOpen, setAddToPositionOpen] = useState(false);
  const [addToPositionTrade, setAddToPositionTrade] = useState<Trade | null>(null);
  const [addQty, setAddQty] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [closePriceDialogOpen, setClosePriceDialogOpen] = useState(false);
  const [closePriceTrade, setClosePriceTrade] = useState<Trade | null>(null);
  const [closePriceInput, setClosePriceInput] = useState("");
  const [livePrices, setLivePrices] = useState<Record<string, number | null>>({});
  const [priceUpdatedAt, setPriceUpdatedAt] = useState<Date | null>(null);
  const tradesRef = useRef<Trade[]>([]);

  const ALL_COLUMNS = [
    { key: "date", label: "Дата" },
    { key: "company", label: "Компания" },
    { key: "type", label: "Тип" },
    { key: "buyPrice", label: "Цена покупки" },
    { key: "sellPrice", label: "Цена продажи" },
    { key: "currentPrice", label: "Тек. цена" },
    { key: "quantity", label: "Кол-во" },
    { key: "amount", label: "Сумма сделки" },
    { key: "takeProfit", label: "Тейк Профит" },
    { key: "stopLoss", label: "Стоп Лосс" },
    { key: "pnl", label: "П/У" },
    { key: "ret", label: "Доходность %" },
    { key: "status", label: "Статус" },
  ] as const;
  type ColKey = typeof ALL_COLUMNS[number]["key"];

  const [visibleCols, setVisibleCols] = useState<Record<ColKey, boolean>>(() => {
    try {
      const saved = localStorage.getItem("tradeColVisibility");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { takeProfit: true, stopLoss: true, ...parsed };
      }
    } catch {}
    return { date: true, company: true, type: true, buyPrice: true, sellPrice: true, quantity: true, amount: true, currentPrice: true, pnl: true, ret: true, takeProfit: true, stopLoss: true, status: true };
  });

  function toggleCol(key: ColKey) {
    setVisibleCols(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("tradeColVisibility", JSON.stringify(next));
      return next;
    });
  }

  const [filterCompany, setFilterCompany] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const { data: trades = [], isLoading } = useQuery<Trade[]>({ queryKey: ["/api/trades"] });
  const { data: companies = [] } = useQuery<Company[]>({ queryKey: ["/api/companies"] });
  const { data: tinkoffShares = [] } = useQuery<TinkoffShare[]>({ queryKey: ["/api/tinkoff/shares"] });
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try { return localStorage.getItem("calcSidebarOpen") !== "false"; } catch { return true; }
  });
  const [companyPickerOpen, setCompanyPickerOpen] = useState(false);
  const [companyFormSearch, setCompanyFormSearch] = useState("");

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/trades", data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/trades"] }); setDialogOpen(false); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiRequest("PATCH", `/api/trades/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/trades"] }); setDialogOpen(false); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/trades/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/trades"] }),
  });
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => apiRequest("PATCH", `/api/trades/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/trades"] }),
  });

  useEffect(() => { tradesRef.current = trades; }, [trades]);

  useEffect(() => {
    async function fetchPrices() {
      const openTrades = tradesRef.current.filter((t) => t.status === "open");
      const tickers = [...new Set(openTrades.map((t) => t.ticker).filter(Boolean))];
      if (tickers.length === 0) return;
      try {
        const res = await fetch(`/api/prices?tickers=${tickers.join(",")}`);
        if (!res.ok) return;
        const data = await res.json();
        setLivePrices((prev) => ({ ...prev, ...data }));
        setPriceUpdatedAt(new Date());
      } catch {
      }
    }
    fetchPrices();
    const id = setInterval(fetchPrices, 3_000);
    return () => clearInterval(id);
  }, []);

  function openAdd() { setEditId(null); setForm({ ...emptyForm }); setDialogOpen(true); }
  function openEdit(t: Trade) {
    setEditId(t.id);
    setForm({
      date: t.date,
      company: t.company,
      ticker: t.ticker,
      type: t.type,
      buyPrice: t.buyPrice as string,
      sellPrice: t.sellPrice as string || "",
      quantity: String(t.quantity),
      currentPrice: t.currentPrice as string || "",
      takeProfit: t.takeProfit as string || "",
      stopLoss: t.stopLoss as string || "",
      comment: t.comment || "",
      status: t.status,
      sector: t.sector || "",
    });
    setDialogOpen(true);
  }

  function handleCompanySelect(ticker: string) {
    const tShare = tinkoffShares.find(s => s.ticker === ticker);
    if (tShare) {
      setForm(p => ({ ...p, company: tShare.name, ticker: tShare.ticker, sector: tShare.sector }));
      return;
    }
    const c = companies.find(c => c.ticker === ticker);
    if (c) setForm(p => ({ ...p, company: c.name, ticker: c.ticker }));
  }

  const filteredSidebarShares = useMemo(() => {
    if (!sidebarSearch.trim()) return tinkoffShares;
    const q = sidebarSearch.toLowerCase();
    return tinkoffShares.filter(s =>
      s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }, [tinkoffShares, sidebarSearch]);

  const filteredFormShares = useMemo(() => {
    if (!companyFormSearch.trim()) return tinkoffShares;
    const q = companyFormSearch.toLowerCase();
    return tinkoffShares.filter(s =>
      s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }, [tinkoffShares, companyFormSearch]);

  const selectedTShare = tinkoffShares.find(s => s.ticker === form.ticker);

  function handleSubmit() {
    const payload = {
      ...form,
      quantity: parseInt(form.quantity) || 0,
      buyPrice: form.buyPrice || "0",
      sellPrice: form.sellPrice || null,
      currentPrice: form.currentPrice || null,
      takeProfit: form.takeProfit || null,
      stopLoss: form.stopLoss || null,
      sector: form.sector || null,
      comment: form.comment || null,
    };
    if (editId !== null) updateMutation.mutate({ id: editId, data: payload });
    else createMutation.mutate(payload);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  }

  function resetFilters() {
    setFilterCompany(""); setFilterDateFrom(""); setFilterDateTo("");
    setFilterType("all"); setFilterStatus("all");
  }

  const filtered = useMemo(() => {
    return trades.filter(t => {
      if (filterCompany && !t.company.toLowerCase().includes(filterCompany.toLowerCase()) && !t.ticker.toLowerCase().includes(filterCompany.toLowerCase())) return false;
      if (filterDateFrom && t.date < filterDateFrom) return false;
      if (filterDateTo && t.date > filterDateTo) return false;
      if (filterType !== "all" && t.type !== filterType) return false;
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      return true;
    });
  }, [trades, filterCompany, filterDateFrom, filterDateTo, filterType, filterStatus]);

  const getLivePrice = (t: Trade) =>
    t.status === "open" ? (livePrices[t.ticker as string] ?? undefined) : undefined;

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av: any, bv: any;
      if (sortKey === "pnl") { av = calcPnl(a, getLivePrice(a)); bv = calcPnl(b, getLivePrice(b)); }
      else if (sortKey === "ret") { av = calcRet(a, getLivePrice(a)); bv = calcRet(b, getLivePrice(b)); }
      else { av = (a as any)[sortKey] ?? ""; bv = (b as any)[sortKey] ?? ""; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sortKey, sortDir, livePrices]);

  const totalPnl = trades.reduce((s, t) => s + calcPnl(t, getLivePrice(t)), 0);
  const closedTrades = trades.filter(t => t.status === "closed");
  const winners = closedTrades.filter(t => calcPnl(t, getLivePrice(t)) > 0);
  const winRate = closedTrades.length ? (winners.length / closedTrades.length) * 100 : 0;
  const portfolioBase = portfolioSize ? Number(portfolioSize) : 0;
  const portfolioCurrent = portfolioBase + totalPnl;
  const thClass = "px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-white/30 cursor-pointer hover:text-white/60 transition-colors select-none whitespace-nowrap";
  const tdClass = "px-4 py-3 text-sm text-white/80 whitespace-nowrap";

  return (
    <div className="h-screen bg-[#0a0a0c] text-white font-sans flex flex-col overflow-hidden">
      <header className="border-b border-white/5 bg-[#0d0d0f] px-8 py-5 flex items-center gap-5 shrink-0">
        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white hover:bg-white/5 rounded-xl gap-2"
          onClick={() => setLocation("/dashboard")} data-testid="button-back-dashboard">
          <ArrowLeft className="w-4 h-4" /> Назад
        </Button>
        <div className="h-5 w-px bg-white/10" />
        <Button
          variant="ghost"
          size="icon"
          title={sidebarOpen ? "Скрыть панель инструментов" : "Показать панель инструментов"}
          className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl w-8 h-8 shrink-0"
          onClick={() => {
            const next = !sidebarOpen;
            setSidebarOpen(next);
            try { localStorage.setItem("calcSidebarOpen", String(next)); } catch {}
          }}
          data-testid="button-toggle-sidebar"
        >
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </Button>
        <div className="h-5 w-px bg-white/10" />
        <h1 className="text-lg font-bold tracking-tight">Журнал сделок</h1>
        {priceUpdatedAt && (
          <span className="flex items-center gap-1.5 text-xs text-white/30" data-testid="text-price-updated">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live · {priceUpdatedAt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        )}
        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" onClick={() => { setPortfolioInput(portfolioSize); setPortfolioDialogOpen(true); }}
            className="text-white/50 hover:text-white hover:bg-white/5 rounded-xl gap-2 border border-white/10" data-testid="button-portfolio">
            <Wallet className="w-4 h-4" />
            {portfolioSize
              ? <span className={portfolioCurrent >= portfolioBase ? "text-emerald-400" : "text-red-400"}>{portfolioCurrent.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
              : "Портфель"}
          </Button>
          <Button onClick={openAdd} className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl gap-2 border-0 focus-visible:ring-0" data-testid="button-add-trade">
            <Plus className="w-4 h-4" /> Добавить сделку
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left Sidebar — Tinkoff instruments */}
        <aside className={`shrink-0 border-r border-white/5 bg-[#0d0d0f] flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? "w-60" : "w-0 border-r-0"}`}>
          <div className="p-3 border-b border-white/5 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
              <input
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
                placeholder="Поиск тикера..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/25 outline-none focus:border-violet-500/50"
                data-testid="input-sidebar-search"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {tinkoffShares.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2 text-white/20">
                <div className="w-4 h-4 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" />
                <span className="text-[11px]">Загрузка...</span>
              </div>
            ) : filteredSidebarShares.map(s => (
              <button
                key={s.ticker}
                data-testid={`sidebar-company-${s.ticker}`}
                onClick={() => {
                  setEditId(null);
                  setForm({ ...emptyForm });
                  handleCompanySelect(s.ticker);
                  setDialogOpen(true);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/5 transition-colors text-left group ${form.ticker === s.ticker && dialogOpen ? "bg-violet-500/10" : ""}`}
              >
                <CompanyLogo ticker={s.ticker} color={s.logoBaseColor} logoName={s.logoName} size="sm" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-mono font-semibold text-violet-400 leading-tight">{s.ticker}</span>
                  <span className="text-[11px] text-white/50 truncate leading-tight">{s.name}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-white/5 shrink-0">
            <p className="text-[10px] text-white/20 text-center">{filteredSidebarShares.length} инструментов · MOEX</p>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0d0f] border border-white/5 rounded-2xl px-5 py-4 space-y-1">
            <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Общая прибыль</p>
            <p className={`text-xl font-bold tabular-nums ${totalPnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {totalPnl >= 0 ? "+" : ""}{fmt(totalPnl)} ₽
            </p>
            {portfolioBase > 0 && (
              <p className={`text-xs font-medium tabular-nums ${totalPnl >= 0 ? "text-emerald-400/70" : "text-red-400/70"}`}>
                {totalPnl >= 0 ? "+" : ""}{fmt((totalPnl / portfolioBase) * 100)}% от портфеля
              </p>
            )}
          </div>
          {[
            { label: "Сделок", value: String(trades.length), color: "text-white" },
            { label: "Win Rate", value: `${fmt(winRate)}%`, color: winRate >= 50 ? "text-emerald-400" : "text-red-400" },
          ].map(s => (
            <div key={s.label} className="bg-[#0d0d0f] border border-white/5 rounded-2xl px-5 py-4 space-y-1">
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">{s.label}</p>
              <p className={`text-xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-[#0d0d0f] border border-white/5 rounded-2xl px-5 py-4 flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1 min-w-[180px]">
            <Label className="text-xs text-white/40">Компания / тикер</Label>
            <Input value={filterCompany} onChange={e => setFilterCompany(e.target.value)}
              placeholder="Поиск..." className="bg-white/5 border-white/10 h-9 rounded-xl text-sm" data-testid="input-filter-company" />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/40">Дата от</Label>
            <Input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)}
              className="bg-white/5 border-white/10 h-9 rounded-xl text-sm w-36" data-testid="input-filter-date-from" />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/40">Дата до</Label>
            <Input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)}
              className="bg-white/5 border-white/10 h-9 rounded-xl text-sm w-36" data-testid="input-filter-date-to" />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/40">Тип</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-white/5 border-white/10 h-9 rounded-xl w-28 text-sm" data-testid="select-filter-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="BUY">BUY</SelectItem>
                <SelectItem value="SELL">SELL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/40">Статус</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-white/5 border-white/10 h-9 rounded-xl w-32 text-sm" data-testid="select-filter-status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="open">Открыта</SelectItem>
                <SelectItem value="closed">Закрыта</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9 text-white/40 hover:text-white gap-1.5 rounded-xl border border-white/10 hover:bg-white/5" data-testid="button-reset-filters">
            <X className="w-3 h-3" /> Сбросить
          </Button>
          <div className="ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setColSettingsOpen(true)}
              className="h-9 w-9 text-white/40 hover:text-white rounded-xl border border-white/10 hover:bg-white/5" data-testid="button-col-settings">
              <Settings2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-[#0d0d0f] border-b border-white/5 z-10">
                <tr>
                  {([
                    ["date", "Дата"], ["company", "Компания"],
                    ["type", "Тип"], ["buyPrice", "Цена покупки"], ["sellPrice", "Цена продажи"],
                    ["currentPrice", "Тек. цена"], ["quantity", "Кол-во"], ["amount", "Сумма сделки"],
                    ["takeProfit", "Тейк Профит"], ["stopLoss", "Стоп Лосс"],
                    ["pnl", "П/У"], ["ret", "Доходность %"], ["status", "Статус"],
                  ] as [ColKey, string][])
                    .filter(([key]) => visibleCols[key])
                    .map(([key, label], i) => (
                      <th key={i} className={thClass} onClick={["date","company","type","buyPrice","sellPrice","quantity","currentPrice","pnl","ret","status"].includes(key) ? () => handleSort(key as SortKey) : undefined}>
                        <span className="flex items-center">
                          {label}
                          {(["date","company","type","buyPrice","sellPrice","quantity","currentPrice","pnl","ret","status"].includes(key)) && <SortIcon col={key as SortKey} sortKey={sortKey} sortDir={sortDir} />}
                        </span>
                      </th>
                    ))}
                  <th className={thClass}></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={12} className="text-center py-16 text-white/30">Загрузка...</td></tr>
                ) : sorted.length === 0 ? (
                  <tr><td colSpan={12} className="text-center py-16 text-white/30">Нет сделок. Добавьте первую!</td></tr>
                ) : sorted.map(t => {
                  const liveP = getLivePrice(t);
                  const pnl = calcPnl(t, liveP);
                  const ret = calcRet(t, liveP);
                  const amount = parseFloat(t.buyPrice as string) * t.quantity;
                  const companyRecord = companies.find(c => c.ticker === t.ticker);
                  const tShare = tinkoffShares.find(s => s.ticker === t.ticker);
                  const isExpanded = expandedTradeId === t.id;
                  const visibleColCount = Object.values(visibleCols).filter(Boolean).length + 1;

                  const bp = parseFloat(t.buyPrice as string);
                  const tp = t.takeProfit ? parseFloat(t.takeProfit as string) : null;
                  const sl = t.stopLoss ? parseFloat(t.stopLoss as string) : null;
                  const tpProfit = tp ? (tp - bp) * t.quantity : null;
                  const slLoss = sl ? (sl - bp) * t.quantity : null;

                  return [
                    <tr
                      key={t.id}
                      data-testid={`row-trade-${t.id}`}
                      onClick={() => setExpandedTradeId(isExpanded ? null : t.id)}
                      className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group cursor-pointer ${isExpanded ? "bg-white/[0.03]" : ""}`}>
                      {visibleCols.date && <td className={tdClass}>{t.date}</td>}
                      {visibleCols.company && (
                        <td className={tdClass}>
                          <div className="flex items-center gap-2">
                            <CompanyLogo
                              ticker={t.ticker}
                              color={companyRecord?.logoColor || tShare?.logoBaseColor || "#666"}
                              logoName={tShare?.logoName}
                            />
                            <span className="font-medium text-white">{t.company}</span>
                          </div>
                        </td>
                      )}
                      {visibleCols.type && (
                        <td className={tdClass}>
                          <span className={`inline-flex items-center justify-center text-xs font-bold rounded-lg px-2.5 py-1 border ${t.type === "BUY" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                            {t.type}
                          </span>
                        </td>
                      )}
                      {visibleCols.buyPrice && <td className={tdClass}>{fmt(bp)} ₽</td>}
                      {visibleCols.sellPrice && <td className={tdClass}>{t.sellPrice ? `${fmt(parseFloat(t.sellPrice as string))} ₽` : <span className="text-white/20">—</span>}</td>}
                      {visibleCols.currentPrice && (
                        <td className={tdClass}>
                          {liveP != null ? (
                            <span className="text-sky-300 tabular-nums">{fmt(liveP)} ₽</span>
                          ) : t.status === "closed" && t.sellPrice ? (
                            <span className="tabular-nums">{fmt(parseFloat(t.sellPrice as string))} ₽</span>
                          ) : t.currentPrice ? (
                            `${fmt(parseFloat(t.currentPrice as string))} ₽`
                          ) : (
                            <span className="text-white/20">—</span>
                          )}
                        </td>
                      )}
                      {visibleCols.quantity && <td className={tdClass}>{t.quantity}</td>}
                      {visibleCols.amount && <td className={`${tdClass} tabular-nums`}>{fmt(amount)} ₽</td>}
                      {visibleCols.takeProfit && (
                        <td className={tdClass}>
                          {t.takeProfit
                            ? <span className="text-emerald-400">{fmt(parseFloat(t.takeProfit as string))} ₽</span>
                            : <span className="text-white/20">—</span>}
                        </td>
                      )}
                      {visibleCols.stopLoss && (
                        <td className={tdClass}>
                          {t.stopLoss
                            ? <span className="text-red-400">{fmt(parseFloat(t.stopLoss as string))} ₽</span>
                            : <span className="text-white/20">—</span>}
                        </td>
                      )}
                      {visibleCols.pnl && (
                        <td className={`${tdClass} font-bold tabular-nums`}>
                          {pnl === 0 ? <span className="text-white/20">—</span> : <span className={pnl > 0 ? "text-emerald-400" : "text-red-400"}>{pnl > 0 ? "+" : ""}{fmt(pnl)} ₽</span>}
                        </td>
                      )}
                      {visibleCols.ret && (
                        <td className={`${tdClass} font-bold tabular-nums`}>
                          {ret === 0 ? <span className="text-white/20">—</span> : <span className={ret > 0 ? "text-emerald-400" : "text-red-400"}>{ret > 0 ? "+" : ""}{fmt(ret)}%</span>}
                        </td>
                      )}
                      {visibleCols.status && (
                        <td className={tdClass}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (t.status === "open") {
                                if (!t.sellPrice) {
                                  setClosePriceTrade(t);
                                  setClosePriceInput("");
                                  setClosePriceDialogOpen(true);
                                } else {
                                  toggleStatusMutation.mutate({ id: t.id, status: "closed" });
                                }
                              } else {
                                toggleStatusMutation.mutate({ id: t.id, status: "open" });
                              }
                            }}
                            title={t.status === "open" ? "Закрыть сделку" : "Открыть сделку"}
                            data-testid={`button-status-${t.id}`}
                            className={`inline-flex items-center text-xs font-medium rounded-lg px-2.5 py-1 border cursor-pointer transition-opacity hover:opacity-70 ${t.status === "open" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-white/10 text-white border-white/20"}`}>
                            {t.status === "open" ? "Открыта" : "Закрыта"}
                          </button>
                        </td>
                      )}
                      <td className={tdClass}>
                        <div className="flex items-center gap-1">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white" onClick={(e) => { e.stopPropagation(); openEdit(t); }} data-testid={`button-edit-trade-${t.id}`}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-red-400" onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(t.id); }} data-testid={`button-delete-trade-${t.id}`}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ml-1 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </td>
                    </tr>
                    ,isExpanded ? (
                      <tr key={`${t.id}-exp`} className="border-b border-white/[0.04] bg-white/[0.02]">
                        <td colSpan={visibleColCount} className="px-4 py-4">
                          <div className="flex flex-wrap items-start gap-6">
                            <div className="flex flex-col gap-3 flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">Параметры позиции</p>
                              <div className="flex flex-wrap gap-5">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] text-white/40">Средняя цена</span>
                                  <span className="text-sm font-semibold text-white tabular-nums">{fmt(bp)} ₽</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] text-white/40">Кол-во акций</span>
                                  <span className="text-sm font-semibold text-white tabular-nums">{t.quantity} шт.</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] text-white/40">Объём позиции</span>
                                  <span className="text-sm font-semibold text-white tabular-nums">{fmt(amount)} ₽</span>
                                </div>
                                {liveP != null && (
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] text-white/40">Текущая цена</span>
                                    <span className="text-sm font-semibold text-sky-300 tabular-nums">{fmt(liveP)} ₽</span>
                                  </div>
                                )}
                                {tpProfit !== null && (
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] text-white/40 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Потенциал по TP</span>
                                    <span className={`text-sm font-semibold tabular-nums ${tpProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                      {tpProfit >= 0 ? "+" : ""}{fmt(tpProfit)} ₽&nbsp;
                                      <span className="text-xs opacity-70">({tpProfit >= 0 ? "+" : ""}{((tpProfit / amount) * 100).toFixed(2)}%)</span>
                                    </span>
                                  </div>
                                )}
                                {slLoss !== null && (
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] text-white/40 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Риск по SL</span>
                                    <span className={`text-sm font-semibold tabular-nums ${slLoss >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                      {slLoss >= 0 ? "+" : ""}{fmt(slLoss)} ₽&nbsp;
                                      <span className="text-xs opacity-70">({slLoss >= 0 ? "+" : ""}{((slLoss / amount) * 100).toFixed(2)}%)</span>
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {t.status === "open" && (
                              <div className="flex items-end">
                                <Button
                                  size="sm"
                                  data-testid={`button-add-to-position-${t.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setAddToPositionTrade(t);
                                    setAddQty("");
                                    setAddPrice("");
                                    setAddToPositionOpen(true);
                                  }}
                                  className="h-8 px-3 text-xs bg-violet-600 hover:bg-violet-500 text-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-1.5"
                                >
                                  <PlusCircle className="w-3.5 h-3.5" />
                                  Дополнить позицию
                                </Button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : null
                  ];
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      </div>

      {/* Column Settings Dialog */}
      <Dialog open={colSettingsOpen} onOpenChange={setColSettingsOpen}>
        <DialogContent className="bg-[#0d0d0f] border-white/10 text-white rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-violet-400" /> Настройка столбцов
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-1">
            {ALL_COLUMNS.map(col => (
              <button
                key={col.key}
                onClick={() => toggleCol(col.key)}
                data-testid={`toggle-col-${col.key}`}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <span className={`text-sm ${visibleCols[col.key] ? "text-white" : "text-white/30"}`}>{col.label}</span>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${visibleCols[col.key] ? "bg-violet-600 border-violet-600" : "border-white/20"}`}>
                  {visibleCols[col.key] && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
            <Button variant="ghost" onClick={() => {
              const all = Object.fromEntries(ALL_COLUMNS.map(c => [c.key, true])) as Record<ColKey, boolean>;
              setVisibleCols(all);
              localStorage.setItem("tradeColVisibility", JSON.stringify(all));
            }} className="flex-1 border border-white/10 rounded-xl hover:bg-white/5 text-sm text-white/50">
              Показать все
            </Button>
            <Button onClick={() => setColSettingsOpen(false)} className="flex-1 bg-violet-600 hover:bg-violet-500 rounded-xl border-0 focus-visible:ring-0 text-sm">
              Готово
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Portfolio Dialog */}
      <Dialog open={portfolioDialogOpen} onOpenChange={setPortfolioDialogOpen}>
        <DialogContent className="bg-[#0d0d0f] border-white/10 text-white rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Wallet className="w-5 h-5 text-violet-400" /> Размер портфеля
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <Label className="text-xs text-white/50">Сумма портфеля (₽)</Label>
            <Input
              type="number"
              value={portfolioInput}
              onChange={e => setPortfolioInput(e.target.value)}
              placeholder="например 1 000 000"
              className="bg-white/5 border-white/10 rounded-xl h-10 text-sm"
              data-testid="input-portfolio-size"
            />
            {portfolioSize && (
              <div className="space-y-1 pt-1">
                <p className="text-xs text-white/30">Базовый: {Number(portfolioSize).toLocaleString("ru-RU")} ₽</p>
                <p className="text-xs">
                  <span className="text-white/30">Текущий: </span>
                  <span className={portfolioCurrent >= portfolioBase ? "text-emerald-400" : "text-red-400"}>
                    {portfolioCurrent.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
                  </span>
                  <span className={`ml-1 text-white/30`}>
                    ({totalPnl >= 0 ? "+" : ""}{fmt(totalPnl)} ₽)
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="ghost" onClick={() => setPortfolioDialogOpen(false)} className="flex-1 border border-white/10 rounded-xl hover:bg-white/5">Отмена</Button>
            <Button onClick={() => {
              localStorage.setItem("portfolioSize", portfolioInput);
              setPortfolioSize(portfolioInput);
              setPortfolioDialogOpen(false);
            }} className="flex-1 bg-violet-600 hover:bg-violet-500 rounded-xl border-0 focus-visible:ring-0" data-testid="button-save-portfolio">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0d0d0f] border-white/10 text-white rounded-3xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{editId ? "Редактировать сделку" : "Новая сделка"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-white/50">Дата</Label>
              <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="bg-white/5 border-white/10 rounded-xl h-9 text-sm" data-testid="input-trade-date" />
            </div>

            {/* Company select */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-white/50">Компания</Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCompanyPickerOpen(p => !p)}
                  className="w-full bg-white/5 border border-white/10 h-9 rounded-xl text-sm px-3 flex items-center gap-2 text-left hover:border-white/20 transition-colors"
                  data-testid="select-trade-company"
                >
                  {form.ticker ? (
                    <>
                      <CompanyLogo ticker={form.ticker} color={selectedTShare?.logoBaseColor || "#666"} logoName={selectedTShare?.logoName} size="sm" />
                      <span className="truncate flex-1 text-white">{form.company}</span>
                      <span className="font-mono text-[11px] text-violet-400 shrink-0">{form.ticker}</span>
                    </>
                  ) : (
                    <span className="text-white/30">Выберите компанию</span>
                  )}
                </button>
                {companyPickerOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#111113] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-2 border-b border-white/5">
                      <input
                        autoFocus
                        value={companyFormSearch}
                        onChange={e => setCompanyFormSearch(e.target.value)}
                        placeholder="Поиск по тикеру или названию..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/25 outline-none focus:border-violet-500/50"
                      />
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                      {filteredFormShares.slice(0, 100).map(s => (
                        <button
                          key={s.ticker}
                          type="button"
                          onClick={() => { handleCompanySelect(s.ticker); setCompanyPickerOpen(false); setCompanyFormSearch(""); }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-left transition-colors"
                        >
                          <CompanyLogo ticker={s.ticker} color={s.logoBaseColor} logoName={s.logoName} size="sm" />
                          <span className="text-sm flex-1 truncate text-white/80">{s.name}</span>
                          <span className="font-mono text-[11px] text-violet-400 shrink-0">{s.ticker}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ticker (read-only) */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-white/50">Тикер</Label>
              <Input value={form.ticker} disabled
                className="bg-white/[0.03] border-white/5 rounded-xl h-9 text-sm font-mono text-violet-400 cursor-not-allowed opacity-60"
                data-testid="input-trade-ticker" />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-white/50">Тип</Label>
              <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v }))}>
                <SelectTrigger className="bg-white/5 border-white/10 h-9 rounded-xl text-sm" data-testid="select-trade-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Numeric fields */}
            {[
              { label: "Цена покупки", key: "buyPrice", placeholder: "6800" },
              { label: "Цена продажи", key: "sellPrice", placeholder: "7200 (необяз.)" },
              { label: "Количество", key: "quantity", placeholder: "10" },
            ].map(f => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <Label className="text-xs text-white/50">{f.label}</Label>
                <Input type="number" value={(form as any)[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="bg-white/5 border-white/10 rounded-xl h-9 text-sm"
                  data-testid={`input-trade-${f.key}`} />
              </div>
            ))}

            {/* Take Profit with % badge */}
            {(() => {
              const bp = parseFloat(form.buyPrice);
              const tp = parseFloat(form.takeProfit);
              const tpPct = bp > 0 && form.takeProfit ? ((tp - bp) / bp * 100) : null;
              return (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-white/50">Тейк Профит</Label>
                    {tpPct !== null && (
                      <span className={`text-xs font-semibold tabular-nums ${tpPct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {tpPct >= 0 ? "+" : ""}{tpPct.toFixed(2)}%
                      </span>
                    )}
                  </div>
                  <Input type="number" value={form.takeProfit}
                    onChange={e => setForm(p => ({ ...p, takeProfit: e.target.value }))}
                    placeholder="(необяз.)"
                    className="bg-white/5 border-white/10 rounded-xl h-9 text-sm"
                    data-testid="input-trade-takeProfit" />
                </div>
              );
            })()}

            {/* Stop Loss with % badge */}
            {(() => {
              const bp = parseFloat(form.buyPrice);
              const sl = parseFloat(form.stopLoss);
              const slPct = bp > 0 && form.stopLoss ? ((sl - bp) / bp * 100) : null;
              return (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-white/50">Стоп Лосс</Label>
                    {slPct !== null && (
                      <span className={`text-xs font-semibold tabular-nums ${slPct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {slPct >= 0 ? "+" : ""}{slPct.toFixed(2)}%
                      </span>
                    )}
                  </div>
                  <Input type="number" value={form.stopLoss}
                    onChange={e => setForm(p => ({ ...p, stopLoss: e.target.value }))}
                    placeholder="(необяз.)"
                    className="bg-white/5 border-white/10 rounded-xl h-9 text-sm"
                    data-testid="input-trade-stopLoss" />
                </div>
              );
            })()}

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-white/50">Статус</Label>
              <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
                <SelectTrigger className="bg-white/5 border-white/10 h-9 rounded-xl text-sm" data-testid="select-trade-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Открыта</SelectItem>
                  <SelectItem value="closed">Закрыта</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDialogOpen(false)} className="flex-1 border border-white/10 rounded-xl hover:bg-white/5">Отмена</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 bg-violet-600 hover:bg-violet-500 rounded-xl border-0 focus-visible:ring-0" data-testid="button-submit-trade">
              {editId ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add to Position Dialog */}
      <Dialog open={addToPositionOpen} onOpenChange={setAddToPositionOpen}>
        <DialogContent className="bg-[#0d0d0f] border-white/10 text-white rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-violet-400" /> Дополнить позицию
            </DialogTitle>
          </DialogHeader>
          {addToPositionTrade && (() => {
            const curQty = addToPositionTrade.quantity;
            const curPrice = parseFloat(addToPositionTrade.buyPrice as string);
            const newQty = parseInt(addQty) || 0;
            const newPrice = parseFloat(addPrice) || 0;
            const totalQty = curQty + newQty;
            const newAvg = totalQty > 0 ? ((curQty * curPrice) + (newQty * newPrice)) / totalQty : curPrice;
            const hasInput = newQty > 0 && newPrice > 0;
            return (
              <div className="mt-4 space-y-4">
                <div className="bg-white/5 rounded-2xl p-3.5 space-y-2.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">Текущая позиция</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">{addToPositionTrade.company}</span>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[11px] text-white/30">Кол-во</p>
                      <p className="text-sm font-semibold text-white">{curQty} шт.</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-white/30">Средняя цена</p>
                      <p className="text-sm font-semibold text-white">{fmt(curPrice)} ₽</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-white/30">Объём</p>
                      <p className="text-sm font-semibold text-white">{fmt(curQty * curPrice)} ₽</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-white/50">Кол-во (шт.)</Label>
                    <Input
                      type="number"
                      value={addQty}
                      onChange={e => setAddQty(e.target.value)}
                      placeholder="0"
                      className="bg-white/5 border-white/10 rounded-xl h-9 text-sm"
                      data-testid="input-add-qty"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-white/50">Цена (₽)</Label>
                    <Input
                      type="number"
                      value={addPrice}
                      onChange={e => setAddPrice(e.target.value)}
                      placeholder="0"
                      className="bg-white/5 border-white/10 rounded-xl h-9 text-sm"
                      data-testid="input-add-price"
                    />
                  </div>
                </div>
                {hasInput && (
                  <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-3.5 space-y-2">
                    <p className="text-xs text-violet-300 font-semibold uppercase tracking-widest">После усреднения</p>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-[11px] text-white/30">Итого акций</p>
                        <p className="text-sm font-semibold text-white">{totalQty} шт.</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-white/30">Новая средняя</p>
                        <p className="text-sm font-semibold text-violet-300">{fmt(newAvg)} ₽</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-white/30">Новый объём</p>
                        <p className="text-sm font-semibold text-white">{fmt(totalQty * newAvg)} ₽</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-1">
                  <Button variant="ghost" onClick={() => setAddToPositionOpen(false)} className="flex-1 border border-white/10 rounded-xl hover:bg-white/5">Отмена</Button>
                  <Button
                    disabled={!hasInput || updateMutation.isPending}
                    onClick={() => {
                      if (!hasInput) return;
                      updateMutation.mutate({
                        id: addToPositionTrade.id,
                        data: {
                          buyPrice: String(newAvg.toFixed(4)),
                          quantity: totalQty,
                        },
                      }, {
                        onSuccess: () => {
                          setAddToPositionOpen(false);
                          setExpandedTradeId(null);
                        },
                      });
                    }}
                    className="flex-1 bg-violet-600 hover:bg-violet-500 rounded-xl border-0 focus-visible:ring-0"
                    data-testid="button-confirm-add-to-position"
                  >
                    Дополнить
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Close Price Dialog */}
      <Dialog open={closePriceDialogOpen} onOpenChange={setClosePriceDialogOpen}>
        <DialogContent className="bg-[#0d0d0f] border-white/10 text-white rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <X className="w-5 h-5 text-red-400" /> Закрыть позицию
            </DialogTitle>
          </DialogHeader>
          {closePriceTrade && (
            <div className="mt-4 space-y-4">
              <div className="bg-white/5 rounded-2xl p-3.5 space-y-2.5">
                <span className="text-sm text-white/60">{closePriceTrade.company}</span>
                <div className="flex gap-6 pt-1">
                  <div>
                    <p className="text-[11px] text-white/30">Цена входа</p>
                    <p className="text-sm font-semibold text-white">{fmt(parseFloat(closePriceTrade.buyPrice as string))} ₽</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/30">Кол-во</p>
                    <p className="text-sm font-semibold text-white">{closePriceTrade.quantity} шт.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-white/50">Цена закрытия (₽)</Label>
                <Input
                  type="number"
                  value={closePriceInput}
                  onChange={e => setClosePriceInput(e.target.value)}
                  placeholder="Введите цену продажи"
                  className="bg-white/5 border-white/10 rounded-xl h-10 text-sm"
                  data-testid="input-close-price"
                  autoFocus
                />
              </div>
              {closePriceInput && parseFloat(closePriceInput) > 0 && (() => {
                const bp = parseFloat(closePriceTrade.buyPrice as string);
                const cp = parseFloat(closePriceInput);
                const pnl = (cp - bp) * closePriceTrade.quantity;
                const ret = ((cp - bp) / bp) * 100;
                return (
                  <div className={`rounded-2xl p-3.5 border ${pnl >= 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-[11px] text-white/30">П/У</p>
                        <p className={`text-sm font-bold tabular-nums ${pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>{pnl >= 0 ? "+" : ""}{fmt(pnl)} ₽</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-white/30">Доходность</p>
                        <p className={`text-sm font-bold tabular-nums ${ret >= 0 ? "text-emerald-400" : "text-red-400"}`}>{ret >= 0 ? "+" : ""}{ret.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="flex gap-3 pt-1">
                <Button variant="ghost" onClick={() => setClosePriceDialogOpen(false)} className="flex-1 border border-white/10 rounded-xl hover:bg-white/5">Отмена</Button>
                <Button
                  disabled={!closePriceInput || parseFloat(closePriceInput) <= 0 || updateMutation.isPending}
                  onClick={() => {
                    if (!closePriceTrade || !closePriceInput) return;
                    updateMutation.mutate({
                      id: closePriceTrade.id,
                      data: { sellPrice: closePriceInput, status: "closed" },
                    }, {
                      onSuccess: () => setClosePriceDialogOpen(false),
                    });
                  }}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 rounded-xl border-0 focus-visible:ring-0"
                  data-testid="button-confirm-close-price"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
