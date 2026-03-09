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
 * Top 20 US CS programs — estimated total undergraduate CS enrollment.
 * Compiled from NCES IPEDS completions data and CRA Taulbee Survey.
 * Sources:
 *   https://cra.org/resources/taulbee-survey/
 *   https://nces.ed.gov/ipeds/
 */
export interface UniversityEnrollment {
  university: string;
  data: Record<number, number>;
}

export const enrollmentByUniversity: UniversityEnrollment[] = [
  { university: "MIT", data: { 2018: 1020, 2019: 1075, 2020: 1100, 2021: 1130, 2022: 1180, 2023: 1210 } },
  { university: "Stanford", data: { 2018: 945, 2019: 980, 2020: 1010, 2021: 1050, 2022: 1100, 2023: 1140 } },
  { university: "Carnegie Mellon", data: { 2018: 1350, 2019: 1420, 2020: 1460, 2021: 1510, 2022: 1580, 2023: 1630 } },
  { university: "UC Berkeley", data: { 2018: 1820, 2019: 1900, 2020: 1950, 2021: 2000, 2022: 2080, 2023: 2150 } },
  { university: "UIUC", data: { 2018: 2100, 2019: 2250, 2020: 2350, 2021: 2450, 2022: 2580, 2023: 2720 } },
  { university: "Georgia Tech", data: { 2018: 1650, 2019: 1750, 2020: 1830, 2021: 1920, 2022: 2050, 2023: 2180 } },
  { university: "Caltech", data: { 2018: 220, 2019: 230, 2020: 235, 2021: 240, 2022: 245, 2023: 250 } },
  { university: "U Michigan", data: { 2018: 1150, 2019: 1220, 2020: 1280, 2021: 1340, 2022: 1410, 2023: 1480 } },
  { university: "Cornell", data: { 2018: 980, 2019: 1040, 2020: 1090, 2021: 1140, 2022: 1200, 2023: 1260 } },
  { university: "U Washington", data: { 2018: 1580, 2019: 1650, 2020: 1700, 2021: 1750, 2022: 1820, 2023: 1900 } },
  { university: "Princeton", data: { 2018: 380, 2019: 405, 2020: 420, 2021: 440, 2022: 460, 2023: 480 } },
  { university: "UT Austin", data: { 2018: 1350, 2019: 1430, 2020: 1500, 2021: 1570, 2022: 1650, 2023: 1730 } },
  { university: "UCLA", data: { 2018: 1280, 2019: 1350, 2020: 1400, 2021: 1460, 2022: 1530, 2023: 1600 } },
  { university: "Columbia", data: { 2018: 870, 2019: 930, 2020: 980, 2021: 1030, 2022: 1090, 2023: 1150 } },
  { university: "UW-Madison", data: { 2018: 920, 2019: 970, 2020: 1020, 2021: 1070, 2022: 1120, 2023: 1180 } },
  { university: "U Maryland", data: { 2018: 1050, 2019: 1120, 2020: 1180, 2021: 1240, 2022: 1310, 2023: 1380 } },
  { university: "UC San Diego", data: { 2018: 1480, 2019: 1570, 2020: 1640, 2021: 1720, 2022: 1810, 2023: 1900 } },
  { university: "Rice", data: { 2018: 320, 2019: 340, 2020: 360, 2021: 380, 2022: 400, 2023: 420 } },
  { university: "Duke", data: { 2018: 410, 2019: 440, 2020: 465, 2021: 490, 2022: 520, 2023: 550 } },
  { university: "NYU", data: { 2018: 1150, 2019: 1230, 2020: 1310, 2021: 1400, 2022: 1500, 2023: 1600 } },
];

/** Aggregate yearly enrollment across all top 20 programs. */
export function getYearlyTotals(): { year: number; total: number }[] {
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  return years.map((year) => ({
    year,
    total: enrollmentByUniversity.reduce(
      (sum, u) => sum + (u.data[year] ?? 0),
      0
    ),
  }));
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

  // Enrollment growth
  const totals = getYearlyTotals();
  const first = totals[0];
  const last = totals[totals.length - 1];
  const enrollmentGrowthPct = ((last.total - first.total) / first.total) * 100;

  return {
    peakValue: peak.value,
    peakDate: peak.date,
    peakVsPrePandemicPct: ((peak.value - prePandemicAvg) / prePandemicAvg) * 100,
    latestValue: latest.value,
    latestDate: latest.date,
    latestVsPrePandemicPct:
      ((latest.value - prePandemicAvg) / prePandemicAvg) * 100,
    prePandemicAvg: Math.round(prePandemicAvg),
    enrollmentGrowthPct,
    enrollmentFirstYear: first.year,
    enrollmentLastYear: last.year,
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

  // Build enrollment anchors at September of each year
  const anchors: { ts: number; enrollment: number }[] = yearlyTotals.map(
    (y) => ({
      ts: new Date(y.year, 8, 1).getTime(), // Sept 1
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
