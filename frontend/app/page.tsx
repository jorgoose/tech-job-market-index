import dynamic from "next/dynamic";
import { getSummaryStats } from "@/lib/data";

const JobsEnrollmentChart = dynamic(
  () => import("@/components/JobsEnrollmentChart"),
  { ssr: false }
);

const EnrollmentTable = dynamic(
  () => import("@/components/EnrollmentTable"),
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
          JOLTS job openings in professional &amp; business services vs.
          computer science enrollment at top US universities
        </p>
      </header>

      {/* Chart */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 mb-10">
        <h2 className="text-xl font-semibold mb-1">
          Job Openings vs. CS Enrollment
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          BLS JOLTS Professional &amp; Business Services (FRED JTS540099JOL)
          overlaid with Top 20 US CS Program Enrollment
        </p>
        <JobsEnrollmentChart />
      </section>

      {/* Key Insights */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <InsightCard
          value={`${(stats.peakValue / 1000).toFixed(1)}M`}
          label="Peak Job Openings"
          detail={`${formatDate(stats.peakDate)} — +${Math.round(stats.peakVsPrePandemicPct)}% vs. 2019 avg`}
          color="red"
        />
        <InsightCard
          value={`${(stats.latestValue / 1000).toFixed(1)}M`}
          label="Latest Job Openings"
          detail={`${formatDate(stats.latestDate)} — ${Math.round(stats.latestVsPrePandemicPct)}% vs. 2019 avg`}
          color="red"
        />
        <InsightCard
          value={`+${Math.round(stats.enrollmentGrowthPct)}%`}
          label="Enrollment Growth"
          detail={`Top 20 CS programs, ${stats.enrollmentFirstYear} to ${stats.enrollmentLastYear}`}
          color="blue"
        />
      </section>

      {/* Enrollment Table */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 mb-10">
        <h2 className="text-xl font-semibold mb-1">
          Enrollment by University
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Estimated undergraduate CS enrollment at top 20 US programs
        </p>
        <EnrollmentTable />
      </section>

      {/* Sources */}
      <footer className="text-xs text-gray-400 space-y-1 pb-8">
        <p className="font-semibold text-gray-500">Data Sources</p>
        <p>
          Job Openings:{" "}
          <a
            href="https://fred.stlouisfed.org/series/JTS540099JOL"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            FRED JTS540099JOL
          </a>{" "}
          — BLS JOLTS Job Openings: Professional &amp; Business Services
          (Thousands, SA)
        </p>
        <p>
          Enrollment:{" "}
          <a
            href="https://cra.org/resources/taulbee-survey/"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            CRA Taulbee Survey
          </a>
          {" / "}
          <a
            href="https://nces.ed.gov/ipeds/"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            NCES IPEDS
          </a>{" "}
          — CS enrollment estimates for top 20 US programs
        </p>
        <p>
          Note: JOLTS data is seasonally adjusted. Enrollment data is
          interpolated monthly from fall-semester anchor points.
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
