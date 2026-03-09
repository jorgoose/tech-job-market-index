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
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 sm:p-3 text-xs sm:text-sm max-w-[200px] sm:max-w-none">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name.includes("Enrollment") ? "Enrollment" : "Job Openings"}:{" "}
          <span className="font-mono font-semibold">
            {entry.value?.toLocaleString()}
            {entry.name.includes("Enrollment") ? "" : "K"}
          </span>
        </p>
      ))}
    </div>
  );
}

export default function JobsEnrollmentChart() {
  const data = getMergedChartData();
  const isMobile = useIsMobile();

  return (
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
            domain={[0, 2800]}
            tick={{ fill: JOB_COLOR, fontSize: isMobile ? 9 : 11 }}
            tickFormatter={(v: number) =>
              isMobile ? `${(v / 1000).toFixed(1)}M` : `${v.toLocaleString()}K`
            }
            width={isMobile ? 35 : 60}
            label={
              isMobile
                ? undefined
                : {
                    value: "Job Openings (Thousands, SA)",
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
                    value: "CS Enrollment (Top 20 Universities)",
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
            wrapperStyle={{ paddingTop: isMobile ? 4 : 12, fontSize: isMobile ? 11 : 14 }}
            iconType="plainline"
            formatter={(value: string) =>
              isMobile
                ? value.includes("Enrollment")
                  ? "CS Enrollment"
                  : "Job Openings"
                : value
            }
          />

          {/* 2019 pre-pandemic average */}
          <ReferenceLine
            yAxisId="jobs"
            y={1281}
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
            name="CS Enrollment (Top 20)"
            fill={ENROLL_COLOR}
            fillOpacity={0.08}
            stroke="none"
          />
          <Line
            yAxisId="enrollment"
            type="monotone"
            dataKey="enrollment"
            name="CS Enrollment (Top 20)"
            stroke={ENROLL_COLOR}
            strokeWidth={isMobile ? 2 : 2.5}
            dot={false}
            legendType="none"
          />

          {/* Job openings area + line */}
          <Area
            yAxisId="jobs"
            type="monotone"
            dataKey="jobPostings"
            name="JOLTS Job Openings (Prof. & Business Svcs)"
            fill={JOB_COLOR}
            fillOpacity={0.08}
            stroke="none"
          />
          <Line
            yAxisId="jobs"
            type="monotone"
            dataKey="jobPostings"
            name="JOLTS Job Openings (Prof. & Business Svcs)"
            stroke={JOB_COLOR}
            strokeWidth={isMobile ? 2 : 2.5}
            dot={false}
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
