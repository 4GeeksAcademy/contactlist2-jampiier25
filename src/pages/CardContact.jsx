import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardContact = () => {
  const { id } = useParams();
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const foundContact = store.contacts.find(c => c.id === parseInt(id));
      if (foundContact) {
        setContact(foundContact);
      } else {
        navigate("/notfound");
      }
    }
  }, [id, store.contacts, navigate]);

  if (!contact) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Cargando contacto...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          boxShadow: "0 0 15px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          width: "400px",
          padding: "30px 40px",
          position: "relative",
          borderLeft: "6px solid #b58900",
        }}
      ><button
          onClick={() => navigate(-1)}
          
        >
          ← Volver
        </button>
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>{contact.name}</h2>
        <p style={{ margin: "8px 0" }}>
          <strong>Email:</strong> {contact.email}
        </p>
        <p style={{ margin: "8px 0" }}>
          <strong>Teléfono:</strong> {contact.phone}
        </p>
        <p style={{ margin: "8px 0 20px" }}>
          <strong>Dirección:</strong> {contact.address}
        </p>
        <button onClick={() => handleDelete(contact.id)}>🗑️ Eliminar</button>
        <button onClick={() => navigate(`/edit/${contact.id}`)}>✏️ Editar</button>
        
      </div>
    </div>
  );
};

export default CardContact;