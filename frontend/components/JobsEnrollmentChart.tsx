"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getMergedChartData, JOBS_SOURCES, type JobsSource } from "@/lib/data";

const JOB_COLOR = "#E63946";
const JOB_SMOOTH_COLOR = "#A4161A";
const ENROLL_COLOR = "#457B9D";

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
  valueSuffix,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string; dataKey: string }>;
  label?: string;
  valueSuffix?: string;
}) {
  if (!active || !payload?.length) return null;
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
              ? "Jobs (3-mo avg)"
              : "Job Postings"}
          :{" "}
          <span className="font-mono font-semibold">
            {entry.name.includes("Degrees")
              ? entry.value?.toLocaleString()
              : `${entry.value?.toLocaleString()}${valueSuffix}`}
          </span>
        </p>
      ))}
    </div>
  );
}

export default function JobsEnrollmentChart() {
  const isMobile = useIsMobile();
  const [smoothed, setSmoothed] = useState(false);
  const [source, setSource] = useState<JobsSource>("jolts");

  const config = JOBS_SOURCES[source];
  const data = useMemo(() => getMergedChartData(source), [source]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
        {/* Data source selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">Source:</span>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
            <button
              onClick={() => setSource("jolts")}
              className={`px-3 py-1.5 transition-colors ${
                source === "jolts"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              JOLTS Info Sector
            </button>
            <button
              onClick={() => setSource("indeed")}
              className={`px-3 py-1.5 transition-colors border-l border-gray-200 ${
                source === "indeed"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Indeed Software Dev
            </button>
          </div>
        </div>

        {/* Smoothing toggle */}
        <div className="flex items-center gap-2">
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
      </div>

      {/* Source info */}
      <p className="text-xs text-gray-400 mb-3">
        <a
          href={config.fredUrl}
          className="underline hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          FRED {config.fredSeries}
        </a>
        {" — "}
        {config.unit}
        {source === "indeed" && (
          <span className="text-amber-500 ml-1">
            (starts Feb 2020 — no pre-pandemic history)
          </span>
        )}
      </p>

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

            {/* Left Y-axis: Job data */}
            <YAxis
              yAxisId="jobs"
              orientation="left"
              domain={config.yAxisDomain}
              tick={{ fill: JOB_COLOR, fontSize: isMobile ? 9 : 11 }}
              tickFormatter={(v: number) =>
                source === "jolts" ? `${v}K` : v.toFixed(0)
              }
              width={isMobile ? 35 : 60}
              label={
                isMobile
                  ? undefined
                  : {
                      value: `${config.shortLabel} (${config.unit})`,
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

            <Tooltip
              content={<CustomTooltip valueSuffix={config.valueSuffix} />}
            />
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
                    : "Job Postings"
                  : value
              }
            />

            {/* Pre-pandemic reference line */}
            {config.prePandemicRef && (
              <ReferenceLine
                yAxisId="jobs"
                y={config.prePandemicRef}
                stroke={JOB_COLOR}
                strokeDasharray="6 4"
                opacity={0.35}
                label={
                  isMobile
                    ? undefined
                    : {
                        value: config.prePandemicLabel,
                        position: "insideTopLeft",
                        fill: JOB_COLOR,
                        fontSize: 10,
                        opacity: 0.6,
                      }
                }
              />
            )}

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

            {/* Job data — raw (faded when smoothed is on) */}
            <Area
              yAxisId="jobs"
              type="monotone"
              dataKey="jobOpenings"
              name={config.label}
              fill={JOB_COLOR}
              fillOpacity={smoothed ? 0.03 : 0.08}
              stroke="none"
            />
            <Line
              yAxisId="jobs"
              type="monotone"
              dataKey="jobOpenings"
              name={config.label}
              stroke={JOB_COLOR}
              strokeWidth={isMobile ? 1.5 : 2}
              strokeOpacity={smoothed ? 0.25 : 1}
              dot={false}
              legendType="none"
            />

            {/* Job data — 3-month moving average (only when toggled on) */}
            {smoothed && (
              <Line
                yAxisId="jobs"
                type="monotone"
                dataKey="jobOpeningsSmoothed"
                name={config.label}
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
