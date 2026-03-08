"use client";

import { enrollmentByUniversity, getYearlyTotals } from "@/lib/data";

const years = [2018, 2019, 2020, 2021, 2022, 2023];
const totals = getYearlyTotals();

export default function EnrollmentTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-2 px-3 font-semibold text-gray-700">
              University
            </th>
            {years.map((y) => (
              <th
                key={y}
                className="text-right py-2 px-3 font-semibold text-gray-700"
              >
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enrollmentByUniversity.map((u) => (
            <tr
              key={u.university}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-1.5 px-3 text-gray-800">{u.university}</td>
              {years.map((y) => (
                <td key={y} className="py-1.5 px-3 text-right font-mono text-gray-600">
                  {u.data[y]?.toLocaleString() ?? "—"}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t-2 border-gray-400 font-semibold bg-gray-50">
            <td className="py-2 px-3 text-gray-900">Total (Top 20)</td>
            {totals.map((t) => (
              <td
                key={t.year}
                className="py-2 px-3 text-right font-mono text-gray-900"
              >
                {t.total.toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
