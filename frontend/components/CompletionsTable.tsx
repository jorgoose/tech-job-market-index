"use client";

import { useState } from "react";
import { csCompletionsData } from "@/lib/data";

export default function CompletionsTable() {
  const [showProjections, setShowProjections] = useState(false);

  const rows = showProjections
    ? csCompletionsData
    : csCompletionsData.filter((d) => !d.projected);

  return (
    <div>
      {/* Projection toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowProjections((s) => !s)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            showProjections ? "bg-blue-600" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={showProjections}
          aria-label="Show extended projections through 2027-28"
        >
          <span
            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
              showProjections ? "translate-x-[18px]" : "translate-x-[3px]"
            }`}
          />
        </button>
        <span className="text-sm text-gray-500">
          Show projections through 2027-28
        </span>
      </div>

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
            {rows.map((d, i) => {
              const prev = i > 0 ? rows[i - 1].total : null;
              const yoy = prev ? ((d.total - prev) / prev) * 100 : null;
              return (
                <tr
                  key={d.academicYear}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    d.projected ? "bg-blue-50/40" : ""
                  }`}
                >
                  <td className="py-1.5 px-3 text-gray-800">
                    {d.academicYear}
                    {d.projected && (
                      <span className="text-xs text-blue-400 ml-1">proj.</span>
                    )}
                  </td>
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
            <strong>2023-28:</strong> Taulbee Survey measured −4.3% YoY in bachelor&apos;s degree production at PhD-granting CS departments (2023-24); same rate applied forward for projections.
            CERP Pulse Survey (Fall 2025) corroborates with 62% of computing programs reporting enrollment declines.
          </span>
        </p>
      </div>
    </div>
  );
}
