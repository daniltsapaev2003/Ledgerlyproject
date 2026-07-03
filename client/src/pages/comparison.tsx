import { useLocation } from "wouter";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import lkohLogo from "@assets/lkoh_1772868220319.png";
import gazpLogo from "@assets/gazp_1772864925931.png";
import rosnLogo from "@assets/RU000A0J2Q06x640_1773413813553.png";
import sngsLogo from "@assets/RU0008926258x640_1773413813555.png";

interface CompanyData {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  initials?: string;
  initialsColor: string;
  ratios: {
    evEbitda: number;
    ps: number;
    pe: number;
    pbv: number;
  };
}

const companies: CompanyData[] = [
  {
    id: "lkoh",
    name: 'ПАО "НК Лукойл"',
    shortName: "Лукойл",
    logo: lkohLogo,
    initialsColor: "#e63329",
    ratios: { evEbitda: 2.45, ps: 0.45, pe: 6.54, pbv: 0.64 },
  },
  {
    id: "rosn",
    name: 'ПАО "НК Роснефть"',
    shortName: "Роснефть",
    logo: rosnLogo,
    initialsColor: "#f5c518",
    ratios: { evEbitda: 4.12, ps: 0.52, pe: 5.28, pbv: 0.78 },
  },
  {
    id: "sibn",
    name: 'АО "Газпром нефть"',
    shortName: "Газпром нефть",
    logo: gazpLogo,
    initialsColor: "#3b82f6",
    ratios: { evEbitda: 3.62, ps: 0.81, pe: 4.91, pbv: 0.93 },
  },
  {
    id: "sngs",
    name: "Сургутнефтегаз",
    shortName: "Сургут",
    logo: sngsLogo,
    initialsColor: "#10b981",
    ratios: { evEbitda: 1.18, ps: 0.29, pe: 3.14, pbv: 0.29 },
  },
];

const indicators: { key: keyof CompanyData["ratios"]; label: string; lowerIsBetter: boolean }[] = [
  { key: "evEbitda", label: "EV / EBITDA (12M)", lowerIsBetter: true },
  { key: "ps",       label: "P / S (12M)",       lowerIsBetter: true },
  { key: "pe",       label: "P / E (12M)",        lowerIsBetter: true },
  { key: "pbv",      label: "P / BV",             lowerIsBetter: true },
];

function getRanks(values: number[], lowerIsBetter: boolean): number[] {
  const sorted = [...values].sort((a, b) => lowerIsBetter ? a - b : b - a);
  return values.map((v) => sorted.indexOf(v));
}

function ValueCell({ rank, value }: { rank: number; value: number }) {
  const color =
    rank === 0
      ? "text-emerald-400"
      : rank === 1
      ? "text-orange-400"
      : "text-white/80";
  const bg =
    rank === 0
      ? "bg-emerald-500/[0.07] border-emerald-500/20"
      : rank === 1
      ? "bg-orange-500/[0.07] border-orange-500/20"
      : "bg-transparent border-white/5";

  return (
    <td className={`px-6 py-5 text-center border-b border-white/5`}>
      <div
        className={`inline-flex items-center justify-center rounded-xl px-4 py-2 border text-lg font-bold tabular-nums tracking-tight ${color} ${bg} transition-all duration-200`}
      >
        {value.toFixed(2)}
      </div>
    </td>
  );
}

export default function Comparison() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0d0d0f] px-8 py-5 flex items-center gap-5">
        <Button
          variant="ghost"
          size="sm"
          className="text-white/50 hover:text-white hover:bg-white/5 rounded-xl gap-2"
          onClick={() => setLocation("/dashboard")}
          data-testid="button-back-dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Button>
        <div className="h-5 w-px bg-white/10" />
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-violet-400" />
          <h1 className="text-lg font-bold tracking-tight">Сравнение компаний отрасли</h1>
        </div>
        <div className="ml-auto">
          <span className="text-xs text-white/30 font-medium tracking-widest uppercase">Нефтяной сектор · Россия</span>
        </div>
      </header>

      {/* Main content */}
      <main className="px-8 py-10">
        <div className="mb-8">
          <p className="text-sm text-white/40 leading-relaxed">
            Сравнение ключевых мультипликаторов компаний нефтяного сектора.{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" /> лучший показатель
            </span>{" "}
            &nbsp;
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-400" /> второй лучший
            </span>
          </p>
        </div>

        {/* Table wrapper */}
        <div className="rounded-3xl border border-white/5 overflow-hidden shadow-2xl bg-[#0d0d0f]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Head */}
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-6 text-left w-56">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/30">Показатель</span>
                  </th>
                  {companies.map((c) => (
                    <th key={c.id} className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center gap-3">
                        {c.logo ? (
                          <img
                            src={c.logo}
                            alt={c.shortName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: c.initialsColor + "33", border: `1.5px solid ${c.initialsColor}55` }}
                          >
                            <span style={{ color: c.initialsColor }}>{c.initials}</span>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white leading-tight whitespace-nowrap">{c.name}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {indicators.map((ind, rowIdx) => {
                  const values = companies.map((c) => c.ratios[ind.key]);
                  const ranks = getRanks(values, ind.lowerIsBetter);
                  return (
                    <tr
                      key={ind.key}
                      className={`group transition-colors duration-150 hover:bg-white/[0.03] ${rowIdx < indicators.length - 1 ? "" : ""}`}
                    >
                      <td className="px-6 py-5 border-b border-white/5">
                        <span className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-150 tracking-wide">
                          {ind.label}
                        </span>
                      </td>
                      {companies.map((c, ci) => (
                        <ValueCell key={c.id} rank={ranks[ci]} value={c.ratios[ind.key]} />
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/20 text-right">Данные носят ознакомительный характер. Не является инвестиционной рекомендацией.</p>
      </main>
    </div>
  );
}
