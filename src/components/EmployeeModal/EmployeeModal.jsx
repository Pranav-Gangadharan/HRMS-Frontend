import React from "react";
import Popup from "reactjs-popup";
import EmployeeForm from "./EmployeeForm";
import './employeeModal.css'

const EmployeeModal = ({ isOpen, onRequestClose, onSubmit }) => {
  return (
    <Popup open={isOpen} onClose={onRequestClose} modal>
      <div className="modal-header">
        <button className="close-btn" onClick={onRequestClose}>
          X
        </button>
      </div>
      <div className="modal-body">
        <EmployeeForm onSubmit={onSubmit} onCancel={onRequestClose} />
      </div>
    </Popup>
  );
};

export default EmployeeModal;
