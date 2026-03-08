import dynamic from "next/dynamic";

const JobsEnrollmentChart = dynamic(
  () => import("@/components/JobsEnrollmentChart"),
  { ssr: false }
);

const EnrollmentTable = dynamic(
  () => import("@/components/EnrollmentTable"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Tech Job Market Index
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Software development job postings vs. computer science enrollment at
          top US universities
        </p>
      </header>

      {/* Chart */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 mb-10">
        <h2 className="text-xl font-semibold mb-1">
          Software Job Postings vs. CS Enrollment
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          FRED IHLIDXUSTPSOFTDEVE (Indeed) overlaid with Top 20 US CS Program
          Enrollment
        </p>
        <JobsEnrollmentChart />
      </section>

      {/* Key Insights */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <InsightCard
          value="230"
          label="Peak Job Postings Index"
          detail="March 2022 — 2.3x the pre-pandemic baseline"
          color="red"
        />
        <InsightCard
          value="70.5"
          label="Current Job Postings Index"
          detail="Feb 2025 — 30% below pre-pandemic levels"
          color="red"
        />
        <InsightCard
          value="+21%"
          label="Enrollment Growth"
          detail="Top 20 CS programs, 2018 to 2023"
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
          Job Postings:{" "}
          <a
            href="https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            FRED IHLIDXUSTPSOFTDEVE
          </a>{" "}
          — Indeed Software Development Job Postings (Index, Feb 2020 = 100, SA)
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
          Note: Job postings index is seasonally adjusted. Enrollment data is
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
