import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Cambiar el fondo del body según el modo
    document.body.style.backgroundColor = darkMode ? "#222" : "#fff";
    document.body.style.color = darkMode ? "#eee" : "#000";
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          Paginas amarillas
        </Link>

        <div className="d-flex align-items-center ms-auto gap-2">
        

          {/* Botones para cambiar el tema */}
          <button 
            className={`btn btn-sm ${darkMode ? "btn-secondary" : "btn-light"}`} 
            onClick={() => setDarkMode(false)}
            title="Fondo Claro"
          >
            Claro
          </button>
          <button 
            className={`btn btn-sm ${darkMode ? "btn-dark" : "btn-secondary"}`} 
            onClick={() => setDarkMode(true)}
            title="Fondo Oscuro"
          >
            Oscuro
          </button>
        </div>
      </div>
    </nav>
  );
};