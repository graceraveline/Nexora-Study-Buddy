import React from "react";

export default function Header({ currentUser }) {
  return (
    <header className="header">
      <div className="header__mark">Study Buddy</div>
      <div className="header__user">
        <span className="header__dot" />
        {currentUser}
      </div>
    </header>
  );
}