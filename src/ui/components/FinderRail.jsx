import React from "react";

const QUICK_SUBJECTS = [
  "COMP304E",
  "CALC101",
  "PHYS201",
  "CS204",
  "BIO110",
  "CHEM101",
  "ELEC200",
];

export default function FinderRail({
  query,
  setQuery,
  recentSubjects,
  onPickRecent,
}) {
  return (
    <aside className="rail">
      <div className="rail__section">
        <p className="rail__label">Find your subject</p>

        <input
          className="rail__search"
          type="text"
          placeholder="Type a subject..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="rail__section">
        <p className="rail__label">Browse Subjects</p>

        <ul className="rail__recent">
          {QUICK_SUBJECTS.map((subject) => (
            <li key={subject}>
              <button
                type="button"
                className="rail__recent-item"
                onClick={() => onPickRecent(subject)}
              >
                {subject}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {recentSubjects.length > 0 && (
        <div className="rail__section">
          <p className="rail__label">Recently Searched</p>

          <ul className="rail__recent">
            {recentSubjects.map((subject) => (
              <li key={subject}>
                <button
                  type="button"
                  className="rail__recent-item"
                  onClick={() => onPickRecent(subject)}
                >
                  {subject}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}