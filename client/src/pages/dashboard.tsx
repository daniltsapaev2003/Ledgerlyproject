import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  LogOut,
  NotebookPen,
  Search, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Minus,
  AlertCircle,
  Loader2,
  RefreshCw,
  BarChart3
} from "lucide-react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Company, KeyRatios, Forecast } from "@shared/schema";

import ledgerlyLogo from "@assets/bbf879acd9f44e0c79ce814e1cdd671d_20a609f8-5788-40ac-8b88-139c3_1772868503926.png";
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
  T: tLogo, MTSS: mtsLogo, GMKN: gmknLogo, RTKM: rstiLogo,
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

interface TinkoffShare {
  ticker: string;
  name: string;
  logoName: string;
  logoBaseColor: string;
}

function logoUrl(logoName: string) {
  const base = logoName.replace(/\.png$/i, "");
  return `https://invest-static.cdn-tinkoff.ru/logos/invest/${base}x160.png`;
}

function CompanyLogo({ ticker, logoName, color, size = "md" }: {
  ticker: string; logoName?: string; color?: string; size?: "sm" | "md" | "lg";
}) {
  const [localErr, setLocalErr] = useState(false);
  const [cdnErr, setCdnErr] = useState(false);
  const dim = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20" : "w-12 h-12";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-2xl" : "text-sm";
  const localSrc = logoMap[ticker];

  if (localSrc && !localErr) {
    return (
      <div className={`${dim} rounded-full overflow-hidden shrink-0 bg-white/5`}>
        <img src={localSrc} alt={ticker} className="w-full h-full object-cover" onError={() => setLocalErr(true)} />
      </div>
    );
  }
  if (logoName && !cdnErr) {
    return (
      <div className={`${dim} rounded-full overflow-hidden shrink-0 bg-white/5`}>
        <img src={logoUrl(logoName)} alt={ticker} className="w-full h-full object-cover" onError={() => setCdnErr(true)} />
      </div>
    );
  }
  return (
    <div
      className={`${dim} rounded-full shrink-0 flex items-center justify-center font-bold ${textSize}`}
      style={{ backgroundColor: (color || "#666") + "33", color: color || "#999" }}
    >
      {ticker.slice(0, 2)}
    </div>
  );
}

export default function Dashboard() {
  const { data: user } = useUser();
  const logoutMutation = useLogout();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const { data: tinkoffShares = [] } = useQuery<TinkoffShare[]>({
    queryKey: ["/api/tinkoff/shares"],
  });

  const dbTickers = useMemo(() => new Set(companies.map(c => c.ticker)), [companies]);

  const sidebarShares = useMemo(() => {
    if (tinkoffShares.length === 0) return [];
    const q = searchQuery.toLowerCase().trim();
    const list = q
      ? tinkoffShares.filter(s =>
          s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
        )
      : tinkoffShares;
    return list;
  }, [tinkoffShares, searchQuery]);

  useEffect(() => {
    if (!selectedTicker && companies.length > 0) {
      setSelectedTicker(companies[0].ticker);
    }
  }, [companies, selectedTicker]);

  const activeShare = useMemo(
    () => tinkoffShares.find(s => s.ticker === selectedTicker) || null,
    [tinkoffShares, selectedTicker]
  );

  const hasDbData = selectedTicker ? dbTickers.has(selectedTicker) : false;

  const { 
    data: companyData, 
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails
  } = useQuery<{
    company: Company;
    ratios: KeyRatios;
    forecasts: Forecast[];
  }>({
    queryKey: ["/api/companies", selectedTicker],
    enabled: hasDbData && !!selectedTicker,
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/login");
  };

  if (isLoadingCompanies && !selectedTicker) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white overflow-hidden font-sans">
      <aside className="w-80 border-r border-white/5 flex flex-col bg-[#0d0d0f] z-20 shrink-0 overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <div className="flex justify-center mb-5">
            <img src={ledgerlyLogo} alt="Ledgerly" className="h-14 w-auto" />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input 
              placeholder="Тикер или название…"
              className="bg-white/5 border-white/10 pl-10 h-10 rounded-xl focus:ring-primary/50 text-sm placeholder:text-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-sidebar-search"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 py-2">
          <div className="px-2 overflow-x-hidden">
          {tinkoffShares.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-white/20">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Загрузка инструментов…</span>
            </div>
          ) : sidebarShares.length === 0 ? (
            <p className="text-center text-sm text-white/20 py-8">Ничего не найдено</p>
          ) : (
            <div className="space-y-0.5">
              {sidebarShares.map((share) => {
                const isActive = selectedTicker === share.ticker;
                return (
                  <button
                    key={share.ticker}
                    data-testid={`sidebar-company-${share.ticker}`}
                    onClick={() => setSelectedTicker(share.ticker)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                      isActive ? "bg-primary/20" : "hover:bg-white/5"
                    }`}
                  >
                    <CompanyLogo ticker={share.ticker} logoName={share.logoName} color={share.logoBaseColor} size="sm" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className={`font-bold text-sm tracking-wide ${isActive ? "text-white" : "text-white/80"}`}>
                        {share.ticker}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <span className="text-sm font-medium truncate text-white/70">{user?.firstName} {user?.lastName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/calculator")}
                className="h-7 w-7 text-white/30 hover:text-white hover:bg-white/5"
                data-testid="button-calculator"
                title="Журнал сделок"
              >
                <NotebookPen className="w-3.5 h-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="h-7 w-7 text-white/30 hover:text-white hover:bg-white/5"
                title="Выйти"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative bg-[#0a0a0c]">
        <AnimatePresence mode="wait">
          {!selectedTicker ? null
          : !hasDbData ? (
            <motion.div
              key={`no-data-${selectedTicker}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col items-center justify-center p-8 text-center"
            >
              {activeShare && (
                <CompanyLogo ticker={activeShare.ticker} logoName={activeShare.logoName} color={activeShare.logoBaseColor} size="lg" />
              )}
              <h2 className="text-2xl font-bold mt-6 mb-2">{activeShare?.name || selectedTicker}</h2>
              <p className="text-sm font-bold text-white/30 tracking-widest uppercase mb-6">{selectedTicker}</p>
              <div className="flex items-center gap-2 text-white/20 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <BarChart3 className="w-5 h-5 shrink-0" />
                <p className="text-sm">Аналитические данные для этого инструмента пока недоступны</p>
              </div>
            </motion.div>
          ) : isLoadingDetails ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 space-y-8"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-2xl bg-white/5" />
                <Skeleton className="h-8 w-64 bg-white/5" />
              </div>
              <Skeleton className="h-24 w-full bg-white/5 rounded-2xl" />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Skeleton className="h-[400px] bg-white/5 rounded-3xl" />
                <Skeleton className="h-[400px] bg-white/5 rounded-3xl" />
              </div>
            </motion.div>
          ) : detailsError ? (
            <motion.div 
              key="error"
              className="h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <AlertCircle className="w-12 h-12 text-destructive mb-4" />
              <h2 className="text-2xl font-bold mb-2">Failed to load data</h2>
              <p className="text-muted-foreground mb-6">There was an issue fetching the company information.</p>
              <Button onClick={() => refetchDetails()} className="rounded-xl">
                <RefreshCw className="w-4 h-4 mr-2" /> Retry
              </Button>
            </motion.div>
          ) : companyData ? (
            <motion.div 
              key={selectedTicker}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 max-w-6xl mx-auto"
            >
              <header className="flex flex-col gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <CompanyLogo
                    ticker={companyData.company.ticker}
                    logoName={activeShare?.logoName}
                    color={activeShare?.logoBaseColor || companyData.company.logoColor || undefined}
                    size="lg"
                  />
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      {companyData.company.name}
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg mt-1">{companyData.company.sector}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {companyData.company.description}
                  </p>
                </div>
              </header>

              <div className="space-y-8">
                <Card className="bg-[#0d0d0f] border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  <CardHeader className="border-b border-white/5 p-6">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <ArrowUpRight className="w-5 h-5 text-primary" /> Key Ratios
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                      <div className="bg-[#0d0d0f] p-6 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Dividends</h4>
                        <RatioRow label="Payout ratio" value={companyData.ratios?.payoutRatio} />
                        <RatioRow label="Dividend yield" value={companyData.ratios?.dividendYield} />
                        <RatioRow label="Average div yield" value={companyData.ratios?.avgDivYield} />
                      </div>
                      <div className="bg-[#0d0d0f] p-6 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Profitability & Debt</h4>
                        <RatioRow label="ROA (12M)" value={companyData.ratios?.roa} />
                        <RatioRow label="ROE (12M)" value={companyData.ratios?.roe} />
                        <RatioRow label="Net debt / EBITDA" value={companyData.ratios?.netDebtEbitda} />
                        <RatioRow label="Net debt / Capital" value={companyData.ratios?.netDebtCapital} />
                      </div>
                      <div className="bg-[#0d0d0f] p-6 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Cost Estimation</h4>
                        <RatioRow label="EV / EBITDA (12M)" value={companyData.ratios?.evEbitda} />
                        <RatioRow label="P/S (12M)" value={companyData.ratios?.ps} />
                        <RatioRow label="P/E (12M)" value={companyData.ratios?.pe} />
                        <RatioRow label="P/BV" value={companyData.ratios?.pbv} />
                      </div>
                      <div className="bg-[#0d0d0f] p-6 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Business Growth</h4>
                        <RatioRow label="Revenue growth" value={companyData.ratios?.revenueGrowth} isTrend />
                        <RatioRow label="EBITDA growth" value={companyData.ratios?.ebitdaGrowth} isTrend />
                        <RatioRow label="Net profit growth" value={companyData.ratios?.netProfitGrowth} isTrend />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d0d0f] border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  <CardHeader className="border-b border-white/5 p-6">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" /> Analysts' Forecasts
                    </CardTitle>
                  </CardHeader>
                  <div className="p-4 space-y-3">
                    {companyData.forecasts.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-8">No forecasts available</p>
                    ) : (
                      companyData.forecasts.map((forecast, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-3 items-center rounded-2xl px-5 py-4 bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/10 transition-all duration-200 shadow-sm"
                        >
                          <span className="text-sm font-medium text-white/70 leading-tight">{forecast.analystName}</span>
                          <div className="flex justify-center">
                            <span
                              className={`inline-flex items-center justify-center font-bold text-xs tracking-widest rounded-lg px-3 py-1.5 min-w-[56px] ${
                                forecast.recommendation === "BUY"
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                                  : forecast.recommendation === "SELL"
                                  ? "bg-red-500/15 text-red-400 border border-red-500/25"
                                  : "bg-orange-500/15 text-orange-400 border border-orange-500/25"
                              }`}
                            >
                              {forecast.recommendation}
                            </span>
                          </div>
                          <span className="text-base font-bold text-white text-right tracking-tight tabular-nums">{forecast.targetPrice}</span>
                        </div>
                      ))
                    )}
                  </div>
                </Card>

                <Button
                  className="w-full bg-violet-600/50 hover:bg-violet-600/70 text-white font-semibold rounded-2xl h-11 transition-all duration-200 shadow-lg shadow-violet-900/20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={() => setLocation("/comparison")}
                  data-testid="button-sector-comparison"
                >
                  Comparison of companies in the industry
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

function RatioRow({ label, value, isTrend }: { label: string; value: string | null | undefined; isTrend?: boolean }) {
  const trendIcon = isTrend && value ? (
    value.startsWith('-') ? <ArrowDownRight className="w-3 h-3 text-red-400" /> : 
    value === "0%" ? <Minus className="w-3 h-3 text-muted-foreground" /> :
    <ArrowUpRight className="w-3 h-3 text-green-400" />
  ) : null;

  return (
    <div className="flex items-center justify-between group">
      <span className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">{label}</span>
      <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
        {trendIcon}
        <span className={isTrend && value ? (value.startsWith('-') ? "text-red-400" : value === "0%" ? "" : "text-green-400") : ""}>
          {value || "—"}
        </span>
      </div>
    </div>
  );
}
