import React, { useState } from "react";

export default function Header({
  currentUser,
  darkMode,
  onToggleTheme,
  onEditProfile,
  onLogout,
}) {
  const [showProfile, setShowProfile] = useState(false);

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

        <div className="header__profile">
          <button
            type="button"
            className="header__user"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <span className="header__dot" />
            {currentUser}
          </button>

          {showProfile && (
            <div className="header__profile-menu">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  onEditProfile();
                }}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  onLogout();
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}