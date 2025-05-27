import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchContacts, deleteContact } from "../actions/contacts";

const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts(dispatch);
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este contacto?");
    if (confirmDelete) {
      await deleteContact(dispatch, id);
    }
  };

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
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>📇 Lista de Contactos</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
         <button onClick={() => navigate(-1)} style={{ padding: "8px 12px" }}>
            ← Volver
          </button>
          <button onClick={() => navigate("/addcontact")} style={{ padding: "8px 12px" }}>
            ➕ Agregar Contacto
          </button>
    
        </div>

        {store.error && (
          <p style={{ color: "red", marginBottom: "15px" }}>⚠️ {store.error}</p>
        )}

        {store.loading ? (
          <p style={{ textAlign: "center" }}>Cargando contactos...</p>
        ) : Array.isArray(store.contacts) && store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                borderBottom: "1px dashed #ddd",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: "0 0 6px" }}>{contact.name}</h3>
              <p style={{ margin: "4px 0" }}>
                <strong>Email:</strong> {contact.email}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Teléfono:</strong> {contact.phone}
              </p>
              <p style={{ margin: "4px 0 10px" }}>
                <strong>Dirección:</strong> {contact.address}
              </p>

              <button onClick={() => navigate(`/contact/${contact.id}`)} style={{ marginRight: "8px" }}>
                🔍 Ver Detalle
              </button>
              <button onClick={() => handleDelete(contact.id)}>🗑️ Eliminar</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay contactos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default Contact;