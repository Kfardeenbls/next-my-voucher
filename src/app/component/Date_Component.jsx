"use client";

import "./MonthYearDropdown.css";
import { useState, useEffect } from "react";

export default function MonthYearDropdown({ onChange }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - 2 + i);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (selectedMonth && selectedYear && onChange) {
      onChange({ month: selectedMonth, year: selectedYear });
    }
  }, [selectedMonth, selectedYear, onChange]);

  return (
    <div
      className="dropdown-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Please select a month and year</p>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <div className="dropdown-group">
          <label className="dropdown-label">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="dropdown-select"
          >
            <option value="">Select Month</option>
            {months.map((month, idx) => (
              <option key={idx} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-group">
          <label className="dropdown-label">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="dropdown-select"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
