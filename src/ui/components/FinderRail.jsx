import React from "react";

const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4"];

export default function FinderRail({
  year,
  setYear,
  query,
  setQuery,
  recentSubjects,
  onPickRecent,
}) {
  return (
    <aside className="rail">
      <div className="rail__section">
        <p className="rail__label">Your year</p>
        <div className="rail__pills">
          {YEARS.map((y) => (
            <button
              key={y}
              className={`pill ${year === y ? "pill--active" : ""}`}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="rail__section">
        <p className="rail__label">Find your subject</p>
        <input
          className="rail__search"
          type="text"
          placeholder="e.g. COMP304E"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {recentSubjects.length > 0 && (
        <div className="rail__section">
          <p className="rail__label">Recently studied</p>
          <ul className="rail__recent">
            {recentSubjects.map((s) => (
              <li key={s}>
                <button className="rail__recent-item" onClick={() => onPickRecent(s)}>
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}