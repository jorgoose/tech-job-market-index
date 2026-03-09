"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { getMergedChartData } from "@/lib/data";

const JOB_COLOR = "#E63946";
const JOB_SMOOTH_COLOR = "#A4161A";
const ENROLL_COLOR = "#457B9D";

/** 2019 calendar-year average for the Information sector (JTU5100JOL). */
const PRE_PANDEMIC_AVG = 141;

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  // Deduplicate — Area and Line share the same dataKey
  const seen = new Set<string>();
  const unique = payload.filter((p) => {
    if (seen.has(p.dataKey)) return false;
    seen.add(p.dataKey);
    return p.value != null;
  });
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 sm:p-3 text-xs sm:text-sm max-w-[220px] sm:max-w-none">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {unique.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name.includes("Degrees")
            ? "CS Degrees"
            : entry.dataKey === "jobOpeningsSmoothed"
              ? "Job Openings (3-mo avg)"
              : "Job Openings"}
          :{" "}
          <span className="font-mono font-semibold">
            {entry.value?.toLocaleString()}
            {entry.name.includes("Degrees") ? "" : "K"}
          </span>
        </p>
      ))}
    </div>
  );
}

export default function JobsEnrollmentChart() {
  const data = getMergedChartData();
  const isMobile = useIsMobile();
  const [smoothed, setSmoothed] = useState(false);

  return (
    <div>
      {/* Smoothing toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setSmoothed((s) => !s)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            smoothed ? "bg-red-600" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={smoothed}
          aria-label="Toggle 3-month moving average"
        >
          <span
            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
              smoothed ? "translate-x-[18px]" : "translate-x-[3px]"
            }`}
          />
        </button>
        <span className="text-sm text-gray-500">
          3-month moving average
        </span>
      </div>

      <div className="w-full h-[350px] sm:h-[450px] md:h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={
              isMobile
                ? { top: 5, right: 5, left: -15, bottom: 5 }
                : { top: 10, right: 60, left: 20, bottom: 10 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: isMobile ? 9 : 11 }}
              interval={isMobile ? 11 : 5}
              angle={isMobile ? -45 : -30}
              textAnchor="end"
              height={isMobile ? 45 : 60}
            />

            {/* Left Y-axis: Job Openings (thousands) */}
            <YAxis
              yAxisId="jobs"
              orientation="left"
              domain={[0, 320]}
              tick={{ fill: JOB_COLOR, fontSize: isMobile ? 9 : 11 }}
              tickFormatter={(v: number) => `${v}K`}
              width={isMobile ? 35 : 60}
              label={
                isMobile
                  ? undefined
                  : {
                      value: "Job Openings — Info Sector (Thousands, NSA)",
                      angle: -90,
                      position: "insideLeft",
                      offset: -5,
                      fill: JOB_COLOR,
                      fontSize: 12,
                      fontWeight: 600,
                    }
              }
            />

            {/* Right Y-axis: Enrollment */}
            <YAxis
              yAxisId="enrollment"
              orientation="right"
              tick={{ fill: ENROLL_COLOR, fontSize: isMobile ? 9 : 11 }}
              tickFormatter={(v: number) =>
                isMobile ? `${(v / 1000).toFixed(0)}k` : v.toLocaleString()
              }
              width={isMobile ? 30 : 60}
              label={
                isMobile
                  ? undefined
                  : {
                      value: "CS Bachelor's Degrees Conferred (National)",
                      angle: 90,
                      position: "insideRight",
                      offset: -5,
                      fill: ENROLL_COLOR,
                      fontSize: 12,
                      fontWeight: 600,
                    }
              }
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: isMobile ? 4 : 12,
                fontSize: isMobile ? 11 : 14,
              }}
              iconType="plainline"
              formatter={(value: string) =>
                isMobile
                  ? value.includes("Degrees")
                    ? "CS Degrees"
                    : "Job Openings"
                  : value
              }
            />

            {/* 2019 pre-pandemic average */}
            <ReferenceLine
              yAxisId="jobs"
              y={PRE_PANDEMIC_AVG}
              stroke={JOB_COLOR}
              strokeDasharray="6 4"
              opacity={0.35}
              label={
                isMobile
                  ? undefined
                  : {
                      value: "2019 avg (pre-pandemic)",
                      position: "insideTopLeft",
                      fill: JOB_COLOR,
                      fontSize: 10,
                      opacity: 0.6,
                    }
              }
            />

            {/* Enrollment area + line */}
            <Area
              yAxisId="enrollment"
              type="monotone"
              dataKey="enrollment"
              name="CS Bachelor's Degrees (National)"
              fill={ENROLL_COLOR}
              fillOpacity={0.08}
              stroke="none"
            />
            <Line
              yAxisId="enrollment"
              type="monotone"
              dataKey="enrollment"
              name="CS Bachelor's Degrees (National)"
              stroke={ENROLL_COLOR}
              strokeWidth={isMobile ? 2 : 2.5}
              dot={false}
              legendType="none"
            />

            {/* Job openings — raw (faded when smoothed is on) */}
            <Area
              yAxisId="jobs"
              type="monotone"
              dataKey="jobOpenings"
              name="JOLTS Job Openings — Information (NAICS 51)"
              fill={JOB_COLOR}
              fillOpacity={smoothed ? 0.03 : 0.08}
              stroke="none"
            />
            <Line
              yAxisId="jobs"
              type="monotone"
              dataKey="jobOpenings"
              name="JOLTS Job Openings — Information (NAICS 51)"
              stroke={JOB_COLOR}
              strokeWidth={isMobile ? 1.5 : 2}
              strokeOpacity={smoothed ? 0.25 : 1}
              dot={false}
              legendType="none"
            />

            {/* Job openings — 3-month moving average (only when toggled on) */}
            {smoothed && (
              <Line
                yAxisId="jobs"
                type="monotone"
                dataKey="jobOpeningsSmoothed"
                name="JOLTS Job Openings — Information (NAICS 51)"
                stroke={JOB_SMOOTH_COLOR}
                strokeWidth={isMobile ? 2 : 2.5}
                dot={false}
                legendType="none"
                connectNulls
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
