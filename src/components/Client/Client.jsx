import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./client.css";
import { useClientContext } from "../../context/ClientContext";
import ClientForm from "./ClientForm";

const Client = () => {
  const { clients, loading } = useClientContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddClient = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Client ID",
      selector: (row) => row.clientId,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className="client">
      <div className="clientHeader">
        <div>
          <input type="text" className="inputText" />
          <button className="btn">Search</button>
        </div>
        <button className="addClientButton" onClick={handleAddClient}>
          Add Client
        </button>
      </div>
      <DataTable
        columns={columns}
        data={clients}
        customStyles={customStyles}
        selectableRows
        fixedHeader
        pagination
        progressPending={loading}
        noDataComponent="No clients found"
      />
      <ClientForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
};

export default Client;
