import React, { useState } from "react";
import "./clientForm.css";
import Popup from "reactjs-popup";
import { useClientContext } from "../../context/ClientContext";

const ClientForm = ({ isOpen, onRequestClose }) => {
  const { addOrUpdateClient } = useClientContext();

  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    mobile: "",
    email: "",
    status: "",
    phoneNumber: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrUpdateClient(formData);
      onRequestClose();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <Popup open={isOpen} onClose={onRequestClose} modal>
      <div className="modal-header">
        <button className="close-btn" onClick={onRequestClose}>
          X
        </button>
      </div>
      <div className="modal-body">
        <h2>Add Client</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Employee Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Client ID:
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default ClientForm;
