import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOCALES } from "../apollo/Queries/Locales/Locales"; // Import the LOCALES query from where you defined it

const Locales = () => {
  const [selectedLocale, setSelectedLocale] = useState(
    localStorage.getItem("selectedLocale") || "en"
  );

  const { loading, error, data, refetch } = useQuery(LOCALES);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error loading locales: {error.message}</div>;

  const handleLocaleChange = (localeCode) => {
    setSelectedLocale(localeCode);
    localStorage.setItem("selectedLocale", localeCode);
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
          {/* {data.i18NLocales.find((locale) => locale.code === selectedLocale)
            ?.name || "Select Language..."} */}
          <i className="bi bi-translate"></i>
        </button>
        <ul className="dropdown-menu">
          {data.i18NLocales.map((locale) => (
            <li
              key={locale.code}
              value={locale.code}
              className="dropdown-item"
              onClick={() => {
                handleLocaleChange(locale.code);
                window.dispatchEvent(new Event("storage"));
              }}
            >
              {locale.name}
              {selectedLocale === locale.code && (
                <i className="bi bi-check" style={{ float: "right" }}></i>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Locales;
