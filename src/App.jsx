import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Routes from "./Routers/Routers";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Components/AuthProvider";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme");
      if (newTheme && newTheme !== theme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [theme]);

  return (
    <AuthProvider>
      <div data-bs-theme={theme}>
        <Navbar />

        <div style={{ minHeight: 100 + "vh" }}>
          <Routes />
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
