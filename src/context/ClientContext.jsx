import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ClientContext = createContext();

export const useClientContext = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  const addOrUpdateClient = async (clientData) => {
    try {
      if (clientData._id) {
        await axios.put(
          `http://localhost:4000/api/clients/${clientData._id}`,
          clientData
        );
      } else {
        await axios.post("http://localhost:4000/api/clients", clientData);
      }
      // After adding or updating the client, fetch the updated list of clients
      const response = await axios.get("http://localhost:4000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error adding/updating client:", error);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:4000/api/clients/${clientId}`);
      // After deleting the client, fetch the updated list of clients
      const response = await axios.get("http://localhost:4000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <ClientContext.Provider
      value={{ clients, loading, addOrUpdateClient, deleteClient }}
    >
      {children}
    </ClientContext.Provider>
  );
};
