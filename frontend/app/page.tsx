import dynamic from "next/dynamic";
import { getSummaryStats, csCompletionsData } from "@/lib/data";

const JobsEnrollmentChart = dynamic(
  () => import("@/components/JobsEnrollmentChart"),
  { ssr: false }
);

function formatDate(dateStr: string) {
  const [yyyy, mm] = dateStr.split("-").map(Number);
  return new Date(yyyy, mm - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Home() {
  const stats = getSummaryStats();
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* Header */}
      <header className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Tech Job Market Index
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          JOLTS job openings in the Information sector vs. national CS
          bachelor&apos;s degrees conferred
        </p>
      </header>

      {/* Chart */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 mb-10">
        <h2 className="text-xl font-semibold mb-1">
          Job Openings vs. CS Bachelor&apos;s Degrees
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          BLS JOLTS Information Sector ({" "}
          <a href="https://fred.stlouisfed.org/series/JTU5100JOL" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">FRED JTU5100JOL</a>
          ) overlaid with national CS bachelor&apos;s completions ({" "}
          <a href="https://nces.ed.gov/programs/digest/d23/tables/dt23_325.35.asp" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">NCES CIP 11</a>
          )
        </p>
        <JobsEnrollmentChart />
      </section>

      {/* Key Insights */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <InsightCard
          value={`${stats.peakValue}K`}
          label="Peak Job Openings"
          detail={`${formatDate(stats.peakDate)} — +${Math.round(stats.peakVsPrePandemicPct)}% vs. 2019 avg`}
          color="red"
        />
        <InsightCard
          value={`${stats.latestValue}K`}
          label="Latest Job Openings"
          detail={`${formatDate(stats.latestDate)} — ${Math.round(stats.latestVsPrePandemicPct)}% vs. 2019 avg`}
          color="red"
        />
        <InsightCard
          value={`+${Math.round(stats.completionsGrowthPct)}%`}
          label="CS Bachelor's Growth"
          detail={`National bachelor's degrees, ${stats.completionsFirstYear} to ${stats.completionsLastYear}`}
          color="blue"
        />
      </section>

      {/* Completions Table */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 mb-10">
        <h2 className="text-xl font-semibold mb-1">
          CS Bachelor&apos;s Degrees Conferred
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          National totals — CIP 11 (Computer &amp; Information Sciences), bachelor&apos;s level only
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Academic Year</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Bachelor&apos;s Degrees</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">YoY Change</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Source</th>
              </tr>
            </thead>
            <tbody>
              {csCompletionsData.map((d, i) => {
                const prev = i > 0 ? csCompletionsData[i - 1].total : null;
                const yoy = prev ? ((d.total - prev) / prev) * 100 : null;
                return (
                  <tr key={d.academicYear} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-1.5 px-3 text-gray-800">{d.academicYear}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-gray-600">
                      {d.total.toLocaleString()}
                      {d.estimated && <span className="text-xs text-amber-500 ml-1">*</span>}
                    </td>
                    <td className="py-1.5 px-3 text-right font-mono text-gray-600">
                      {yoy !== null ? `${yoy >= 0 ? "+" : ""}${yoy.toFixed(1)}%` : "—"}
                    </td>
                    <td className="py-1.5 px-3 text-xs">
                      <a
                        href={d.sourceUrl}
                        className="underline text-blue-500 hover:text-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={d.methodology ?? d.sourceLabel}
                      >
                        {d.sourceLabel}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3 space-y-1">
            <span className="block">
              * Estimated / projected — click source links above for methodology.
            </span>
            <span className="block">
              <strong>2017-22:</strong> NCES IPEDS Digest of Education Statistics, Table 325.35 (bachelor&apos;s degrees in CIP 11).{" "}
              <strong>2022-23:</strong> National Student Clearinghouse bachelor&apos;s earners report.{" "}
              <strong>2023-26:</strong> Taulbee Survey measured −4.3% YoY in bachelor&apos;s degree production at PhD-granting CS departments (2023-24); same rate applied forward for projections.
              CERP Pulse Survey (Fall 2025) corroborates with 62% of computing programs reporting enrollment declines.
            </span>
          </p>
        </div>
      </section>

      {/* Sources */}
      <footer className="text-xs text-gray-400 space-y-1 pb-8">
        <p className="font-semibold text-gray-500">Data Sources</p>
        <p>
          Job Openings:{" "}
          <a
            href="https://fred.stlouisfed.org/series/JTU5100JOL"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            FRED JTU5100JOL
          </a>{" "}
          — BLS JOLTS Job Openings: Information Sector, NAICS 51
          (Thousands, NSA)
        </p>
        <p>
          CS Degrees:{" "}
          <a
            href="https://nces.ed.gov/programs/digest/d23/tables/dt23_325.35.asp"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            NCES Digest Table 325.35
          </a>
          {" / "}
          <a
            href="https://www.studentclearinghouse.org/nscblog/computer-science-has-highest-increase-in-bachelors-earners/"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            National Student Clearinghouse
          </a>{" "}
          — National CS bachelor&apos;s degrees conferred (CIP 11)
        </p>
        <p>
          Note: JOLTS Information data is not seasonally adjusted — use
          the 3-month moving average toggle on the chart to smooth seasonal
          noise. Completions are interpolated monthly from spring commencement
          anchor points. 2023-26 estimated/projected using Taulbee&apos;s measured
          −4.3% YoY bachelor&apos;s degree production decline at PhD-granting CS depts.
        </p>
      </footer>
    </main>
  );
}

function InsightCard({
  value,
  label,
  detail,
  color,
}: {
  value: string;
  label: string;
  detail: string;
  color: "red" | "blue";
}) {
  const accent = color === "red" ? "text-red-600" : "text-blue-700";
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <p className={`text-3xl font-bold ${accent}`}>{value}</p>
      <p className="font-semibold text-gray-700 mt-1">{label}</p>
      <p className="text-sm text-gray-400 mt-0.5">{detail}</p>
    </div>
  );
}
