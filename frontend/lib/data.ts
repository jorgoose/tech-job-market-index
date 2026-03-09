/**
 * FRED series JTU5100JOL — JOLTS Job Openings: Information Sector
 * (NAICS 51 — software publishers, data processing, telecom, internet services).
 * Thousands, Not Seasonally Adjusted, Monthly.
 * Source: https://fred.stlouisfed.org/series/JTU5100JOL
 *
 * Published by the U.S. Bureau of Labor Statistics.
 */
export const jobOpeningsData: { date: string; value: number }[] = [
  { date: "2018-01", value: 129 },
  { date: "2018-02", value: 127 },
  { date: "2018-03", value: 126 },
  { date: "2018-04", value: 183 },
  { date: "2018-05", value: 124 },
  { date: "2018-06", value: 127 },
  { date: "2018-07", value: 160 },
  { date: "2018-08", value: 152 },
  { date: "2018-09", value: 123 },
  { date: "2018-10", value: 147 },
  { date: "2018-11", value: 127 },
  { date: "2018-12", value: 123 },
  { date: "2019-01", value: 145 },
  { date: "2019-02", value: 136 },
  { date: "2019-03", value: 146 },
  { date: "2019-04", value: 120 },
  { date: "2019-05", value: 124 },
  { date: "2019-06", value: 126 },
  { date: "2019-07", value: 167 },
  { date: "2019-08", value: 134 },
  { date: "2019-09", value: 183 },
  { date: "2019-10", value: 150 },
  { date: "2019-11", value: 132 },
  { date: "2019-12", value: 133 },
  { date: "2020-01", value: 131 },
  { date: "2020-02", value: 135 },
  { date: "2020-03", value: 117 },
  { date: "2020-04", value: 130 },
  { date: "2020-05", value: 74 },
  { date: "2020-06", value: 91 },
  { date: "2020-07", value: 100 },
  { date: "2020-08", value: 83 },
  { date: "2020-09", value: 124 },
  { date: "2020-10", value: 128 },
  { date: "2020-11", value: 97 },
  { date: "2020-12", value: 123 },
  { date: "2021-01", value: 174 },
  { date: "2021-02", value: 112 },
  { date: "2021-03", value: 106 },
  { date: "2021-04", value: 141 },
  { date: "2021-05", value: 137 },
  { date: "2021-06", value: 153 },
  { date: "2021-07", value: 226 },
  { date: "2021-08", value: 203 },
  { date: "2021-09", value: 220 },
  { date: "2021-10", value: 210 },
  { date: "2021-11", value: 194 },
  { date: "2021-12", value: 247 },
  { date: "2022-01", value: 246 },
  { date: "2022-02", value: 262 },
  { date: "2022-03", value: 263 },
  { date: "2022-04", value: 298 },
  { date: "2022-05", value: 224 },
  { date: "2022-06", value: 221 },
  { date: "2022-07", value: 267 },
  { date: "2022-08", value: 187 },
  { date: "2022-09", value: 230 },
  { date: "2022-10", value: 215 },
  { date: "2022-11", value: 198 },
  { date: "2022-12", value: 82 },
  { date: "2023-01", value: 108 },
  { date: "2023-02", value: 156 },
  { date: "2023-03", value: 147 },
  { date: "2023-04", value: 160 },
  { date: "2023-05", value: 144 },
  { date: "2023-06", value: 135 },
  { date: "2023-07", value: 174 },
  { date: "2023-08", value: 141 },
  { date: "2023-09", value: 101 },
  { date: "2023-10", value: 102 },
  { date: "2023-11", value: 131 },
  { date: "2023-12", value: 143 },
  { date: "2024-01", value: 168 },
  { date: "2024-02", value: 139 },
  { date: "2024-03", value: 147 },
  { date: "2024-04", value: 102 },
  { date: "2024-05", value: 118 },
  { date: "2024-06", value: 92 },
  { date: "2024-07", value: 127 },
  { date: "2024-08", value: 131 },
  { date: "2024-09", value: 122 },
  { date: "2024-10", value: 191 },
  { date: "2024-11", value: 109 },
  { date: "2024-12", value: 105 },
  { date: "2025-01", value: 143 },
  { date: "2025-02", value: 136 },
  { date: "2025-03", value: 160 },
  { date: "2025-04", value: 184 },
  { date: "2025-05", value: 165 },
  { date: "2025-06", value: 165 },
  { date: "2025-07", value: 203 },
  { date: "2025-08", value: 169 },
  { date: "2025-09", value: 210 },
  { date: "2025-10", value: 120 },
  { date: "2025-11", value: 75 },
  { date: "2025-12", value: 88 },
];

/**
 * National CS bachelor's degrees conferred (CIP code 11 —
 * Computer and Information Sciences and Support Services).
 *
 * Sources:
 *   2017-18 – 2021-22: NCES Digest of Education Statistics, Table 325.35
 *     https://nces.ed.gov/programs/digest/d23/tables/dt23_325.35.asp
 *   2022-23: National Student Clearinghouse Research Center
 *     https://www.studentclearinghouse.org/nscblog/computer-science-has-highest-increase-in-bachelors-earners/
 *   2023-24: Estimated from 2024 CRA Taulbee Survey (−4.3% at PhD-granting
 *     depts; ~−2.4% national estimate)
 *     https://cra.org/crn/2025/06/cra-update-new-cra-taulbee-survey-findings-show-record-doctoral-production-rising-enrollment-and-shifting-undergraduate-trends/
 *   2024-25 / 2025-26: Projected from declining trend. CERP Pulse Survey
 *     (Oct 2025) reports 62% of computing programs saw enrollment decline.
 *     https://cra.org/crn/2025/10/cerp-pulse-survey-a-snapshot-of-2025-undergraduate-computing-enrollment-patterns/
 *
 * Academic year X–(X+1) is anchored at June of year X+1 (spring commencement).
 */
export const csCompletionsData: { academicYear: string; year: number; total: number; estimated?: boolean }[] = [
  { academicYear: "2017-18", year: 2018, total: 79598 },
  { academicYear: "2018-19", year: 2019, total: 88638 },
  { academicYear: "2019-20", year: 2020, total: 97054 },
  { academicYear: "2020-21", year: 2021, total: 104883 },
  { academicYear: "2021-22", year: 2022, total: 108503 },
  { academicYear: "2022-23", year: 2023, total: 112720 },
  { academicYear: "2023-24", year: 2024, total: 110000, estimated: true },
  { academicYear: "2024-25", year: 2025, total: 108000, estimated: true },
  { academicYear: "2025-26", year: 2026, total: 105000, estimated: true },
];

/** Return yearly CS completions totals (compatible with chart merge). */
export function getYearlyTotals(): { year: number; total: number }[] {
  return csCompletionsData.map((d) => ({ year: d.year, total: d.total }));
}

/** Compute summary statistics from the data arrays. */
export function getSummaryStats() {
  // Pre-pandemic average (2019 calendar year) as baseline
  const prePandemic = jobOpeningsData.filter((d) => d.date.startsWith("2019-"));
  const prePandemicAvg =
    prePandemic.reduce((s, d) => s + d.value, 0) / prePandemic.length;

  // Peak job openings
  const peak = jobOpeningsData.reduce((max, d) =>
    d.value > max.value ? d : max
  );

  // Latest job openings
  const latest = jobOpeningsData[jobOpeningsData.length - 1];

  // CS completions growth
  const first = csCompletionsData[0];
  const last = csCompletionsData[csCompletionsData.length - 1];
  const completionsGrowthPct = ((last.total - first.total) / first.total) * 100;

  return {
    peakValue: peak.value,
    peakDate: peak.date,
    peakVsPrePandemicPct: ((peak.value - prePandemicAvg) / prePandemicAvg) * 100,
    latestValue: latest.value,
    latestDate: latest.date,
    latestVsPrePandemicPct:
      ((latest.value - prePandemicAvg) / prePandemicAvg) * 100,
    prePandemicAvg: Math.round(prePandemicAvg),
    completionsGrowthPct,
    completionsFirstYear: first.academicYear,
    completionsLastYear: last.academicYear,
    latestCompletions: last.total,
  };
}

/**
 * Build a merged dataset for Recharts — monthly job postings with
 * enrollment interpolated from fall-semester anchor points.
 */
export interface ChartDatum {
  date: string;
  label: string;
  jobOpenings: number;
  jobOpeningsSmoothed: number | null;
  enrollment: number | null;
}

/**
 * Build a merged dataset for Recharts — monthly job openings (raw + 3-mo MA)
 * with enrollment interpolated from fall-semester anchor points.
 */
export function getMergedChartData(): ChartDatum[] {
  const yearlyTotals = getYearlyTotals();

  // Anchor completions at June of each year (spring commencement)
  const anchors: { ts: number; enrollment: number }[] = yearlyTotals.map(
    (y) => ({
      ts: new Date(y.year, 5, 1).getTime(), // June 1
      enrollment: y.total,
    })
  );

  const raw = jobOpeningsData.map((jp) => {
    const [yyyy, mm] = jp.date.split("-").map(Number);
    const ts = new Date(yyyy, mm - 1, 1).getTime();

    let enrollment: number | null = null;
    if (ts <= anchors[0].ts) {
      enrollment = anchors[0].enrollment;
    } else if (ts >= anchors[anchors.length - 1].ts) {
      enrollment = anchors[anchors.length - 1].enrollment;
    } else {
      for (let i = 0; i < anchors.length - 1; i++) {
        if (ts >= anchors[i].ts && ts <= anchors[i + 1].ts) {
          const pct =
            (ts - anchors[i].ts) / (anchors[i + 1].ts - anchors[i].ts);
          enrollment = Math.round(
            anchors[i].enrollment +
              pct * (anchors[i + 1].enrollment - anchors[i].enrollment)
          );
          break;
        }
      }
    }

    const d = new Date(yyyy, mm - 1, 1);
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    return {
      date: jp.date,
      label,
      jobOpenings: jp.value,
      jobOpeningsSmoothed: null as number | null,
      enrollment,
    };
  });

  // Compute 3-month centered moving average
  for (let i = 1; i < raw.length - 1; i++) {
    raw[i].jobOpeningsSmoothed = Math.round(
      (raw[i - 1].jobOpenings + raw[i].jobOpenings + raw[i + 1].jobOpenings) / 3
    );
  }

  return raw;
}
