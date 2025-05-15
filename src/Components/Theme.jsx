import React, { useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle fs-5"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {theme === "light" ? (
            <i className="bi bi-brightness-high-fill text-warning"></i>
          ) : (
            <i className="bi bi-moon-stars-fill"></i>
          )}
        </button>
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            value={theme}
            onClick={() => {
              handleThemeChange("light");
              window.dispatchEvent(new Event("storage"));
            }}
          >
            <i className="bi bi-brightness-high-fill mx-2"></i>
            Light
          </li>
          <li
            className="dropdown-item"
            value={theme}
            onClick={() => {
              handleThemeChange("dark");
              window.dispatchEvent(new Event("storage"));
            }}
          >
            <i className="bi bi-moon-stars-fill mx-2"></i>
            Dark
          </li>
        </ul>
      </div>
    </>
  );
};

export default Theme;
