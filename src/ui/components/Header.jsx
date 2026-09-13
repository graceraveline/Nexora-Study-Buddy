import React from "react";

export default function Header({
  currentUser,
  darkMode,
  onToggleTheme,
}) {
  return (
    <header className="header">
      <div className="header__mark">Study Buddy</div>

      <div className="header__right">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="header__user">
          <span className="header__dot" />
          {currentUser}
        </div>
      </div>
    </header>
  );
}