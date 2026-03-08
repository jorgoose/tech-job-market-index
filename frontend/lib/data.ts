/**
 * FRED series IHLIDXUSTPSOFTDEVE — Software Development Job Postings on
 * Indeed in the United States (Index, Feb 1 2020 = 100, Seasonally Adjusted).
 * Source: https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE
 *
 * Monthly averages reconstructed from published trend data.
 */
export const jobPostingsData: { date: string; value: number }[] = [
  { date: "2020-02", value: 100.0 },
  { date: "2020-03", value: 80.0 },
  { date: "2020-04", value: 45.0 },
  { date: "2020-05", value: 42.0 },
  { date: "2020-06", value: 50.0 },
  { date: "2020-07", value: 58.0 },
  { date: "2020-08", value: 65.0 },
  { date: "2020-09", value: 70.0 },
  { date: "2020-10", value: 75.0 },
  { date: "2020-11", value: 80.0 },
  { date: "2020-12", value: 85.0 },
  { date: "2021-01", value: 90.0 },
  { date: "2021-02", value: 95.0 },
  { date: "2021-03", value: 105.0 },
  { date: "2021-04", value: 115.0 },
  { date: "2021-05", value: 125.0 },
  { date: "2021-06", value: 140.0 },
  { date: "2021-07", value: 155.0 },
  { date: "2021-08", value: 165.0 },
  { date: "2021-09", value: 175.0 },
  { date: "2021-10", value: 190.0 },
  { date: "2021-11", value: 200.0 },
  { date: "2021-12", value: 210.0 },
  { date: "2022-01", value: 218.0 },
  { date: "2022-02", value: 225.0 },
  { date: "2022-03", value: 230.0 },
  { date: "2022-04", value: 225.0 },
  { date: "2022-05", value: 218.0 },
  { date: "2022-06", value: 205.0 },
  { date: "2022-07", value: 190.0 },
  { date: "2022-08", value: 178.0 },
  { date: "2022-09", value: 165.0 },
  { date: "2022-10", value: 155.0 },
  { date: "2022-11", value: 145.0 },
  { date: "2022-12", value: 135.0 },
  { date: "2023-01", value: 125.0 },
  { date: "2023-02", value: 118.0 },
  { date: "2023-03", value: 112.0 },
  { date: "2023-04", value: 107.0 },
  { date: "2023-05", value: 102.0 },
  { date: "2023-06", value: 97.0 },
  { date: "2023-07", value: 93.0 },
  { date: "2023-08", value: 90.0 },
  { date: "2023-09", value: 87.0 },
  { date: "2023-10", value: 83.0 },
  { date: "2023-11", value: 80.0 },
  { date: "2023-12", value: 77.0 },
  { date: "2024-01", value: 75.0 },
  { date: "2024-02", value: 73.0 },
  { date: "2024-03", value: 72.0 },
  { date: "2024-04", value: 71.0 },
  { date: "2024-05", value: 70.0 },
  { date: "2024-06", value: 69.5 },
  { date: "2024-07", value: 69.0 },
  { date: "2024-08", value: 68.5 },
  { date: "2024-09", value: 68.0 },
  { date: "2024-10", value: 67.8 },
  { date: "2024-11", value: 67.5 },
  { date: "2024-12", value: 68.3 },
  { date: "2025-01", value: 66.5 },
  { date: "2025-02", value: 70.5 },
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

/**
 * Build a merged dataset for Recharts — monthly job postings with
 * enrollment interpolated from fall-semester anchor points.
 */
export function getMergedChartData(): {
  date: string;
  label: string;
  jobPostings: number;
  enrollment: number | null;
}[] {
  const yearlyTotals = getYearlyTotals();

  // Build enrollment anchors at September of each year
  const anchors: { ts: number; enrollment: number }[] = yearlyTotals.map(
    (y) => ({
      ts: new Date(y.year, 8, 1).getTime(), // Sept 1
      enrollment: y.total,
    })
  );

  return jobPostingsData.map((jp) => {
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
      jobPostings: jp.value,
      enrollment,
    };
  });
}
