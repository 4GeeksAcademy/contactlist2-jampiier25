const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "jampiier25";

// Obtener contactos
export async function fetchContacts(dispatch) {
  dispatch({ type: "set_loading" });
  try {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`);
    if (!res.ok) throw new Error(`Error ${res.status}: al obtener contactos`);
    const data = await res.json();
    if (!Array.isArray(data.contacts)) throw new Error("Formato de contactos inválido");
    dispatch({ type: "set_contacts", payload: data.contacts });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    dispatch({ type: "set_error", payload: err.message });
  }
}

// Agregar contacto
export async function addContact(dispatch, contact) {
  try {
    const contactData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address
    };

    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(`Error ${res.status} al agregar contacto: ${errorBody.message || res.statusText}`);
    }

    await fetchContacts(dispatch);
  } catch (err) {
    console.error("Error adding contact:", err);
  }
}

// Editar contacto
export async function updateContact(dispatch, id, contact) {
  try {
    const contactData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address
    };

    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(`Error ${res.status} al actualizar contacto: ${errorBody.message || res.statusText}`);
    }

    await fetchContacts(dispatch);
  } catch (err) {
    console.error("Error updating contact:", err);
  }
}


// Eliminar contacto
export async function deleteContact(dispatch, id) {
  try {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.msg || `Error ${res.status} al eliminar contacto`);
    }

    await fetchContacts(dispatch);
  } catch (err) {
    console.error("Error deleting contact:", err);
    dispatch({ type: "set_error", payload: err.message });
  }
}