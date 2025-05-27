import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "2px solid #333",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{ marginBottom: "20px" }}>📒 Mi Agenda de Contactos</h1>
      <button
        onClick={() => navigate("/contact")}
        style={{
          padding: "12px 24px",
          marginBottom: "15px",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Mostrar Contactos
      </button>
      <button
        onClick={() => navigate("/addcontact")}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Añadir Contacto
      </button>
    </div>
  );
};

export default Home;