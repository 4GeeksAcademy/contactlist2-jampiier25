import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addContact, updateContact } from "../actions/contacts";

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar contacto si es edición
  const editingContact = id
    ? store.contacts.find((c) => c.id === parseInt(id))
    : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || "",
        email: editingContact.email || "",
        phone: editingContact.phone || "",
        address: editingContact.address || ""
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateContact(dispatch, id, formData);
    } else {
      await addContact(dispatch, formData);
    }
    navigate("/contact"); // Regresar a la lista de contactos
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
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "30px 40px",
          borderRadius: "8px",
          boxShadow: "0 0 15px rgba(0,0,0,0.15)",
          width: "400px",
          borderLeft: "6px solid #b58900",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
          {id ? "✏️ Editar Contacto" : "➕ Agregar Contacto"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginBottom: "15px", padding: "8px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginBottom: "15px", padding: "8px" }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ marginBottom: "15px", padding: "8px" }}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ marginBottom: "25px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#b58900",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {id ? "Actualizar Contacto" : "Guardar Contacto"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Volver
        </button>
      </form>
    </div>
  );
};

export default AddContact;