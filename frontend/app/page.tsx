import dynamic from "next/dynamic";
import { getSummaryStats } from "@/lib/data";

const JobsEnrollmentChart = dynamic(
  () => import("@/components/JobsEnrollmentChart"),
  { ssr: false }
);

const CompletionsTable = dynamic(
  () => import("@/components/CompletionsTable"),
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
        <CompletionsTable />
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
