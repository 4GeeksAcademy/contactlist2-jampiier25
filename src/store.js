export const initialStore = () => {
  return {
    message: null,
    contacts: [],     
    loading: false    
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
        loading: false,
        error: null
      };

    case "set_loading":
      return {
        ...store,
        loading: true,
        error: null
      };

    case "set_error":
      return {
        ...store,
        loading: false,
        error: action.payload
      };

    default:
      throw new Error("Unknown action.");
  }
}
