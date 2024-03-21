import React, { useState } from "react";
import axios from "axios";
import "./Card.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEmployeeContext } from "../../context/EmployeeContext";

const Card = ({
  _id,
  number,
  name,
  icon,
  employeeUrl,
  userName,
  designation,
  email,
}) => {
  const { deleteEmployee, fetchEmployees, addOrUpdateEmployee } =
    useEmployeeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedEmployeeData, setEditedEmployeeData] = useState({
    _id: _id,
    phoneNumber: number,
    userName: userName,
    employeeUrl: employeeUrl,
    designation: designation,
    email: email,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(_id);
      console.log("Delete action successful");
    } catch (error) {
      console.error("Delete action failed:", error);
      // Handle error if needed
    }
  };

  const handleSaveEdit = async () => {
    try {
      await addOrUpdateEmployee(editedEmployeeData);
      setIsEditModalOpen(false);
      await fetchEmployees();
      console.log("Edit action successful");
    } catch (error) {
      console.error("Edit action failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployeeData({
      ...editedEmployeeData,
      [name]: value,
    });
  };

  return (
    <div>
      {icon ? (
        <div className="cardSection">
          <div className="wrapper flex">
            <div className="icon">{icon}</div>
            <div className="cardDetails">
              <h2>{number}</h2>
              <h4>{name}</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="cardSection">
          <div className="empWrapper flex">
            <img src={employeeUrl} alt="pic" className="Image" />

            <div className="cardDetails">
              <h2>{userName}</h2>
              <h4>{designation}</h4>
            </div>

            <div className="menu" onClick={toggleMenu}>
              <HiOutlineDotsVertical className="optionIcon" />
              {isMenuOpen && (
                <div className="options">
                  <div onClick={handleEdit}>Edit</div>
                  <div onClick={handleDelete}>Delete</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditModalOpen(false)}>
              &times;
            </span>
            <div className="edit-form">
              <label>
                Name:
                <input
                  type="text"
                  name="userName"
                  value={editedEmployeeData.userName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editedEmployeeData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Designation:
                <input
                  type="text"
                  name="designation"
                  value={editedEmployeeData.designation}
                  onChange={handleChange}
                />
              </label>
              <label>
                PhoneNumber:
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedEmployeeData.phoneNumber}
                  onChange={handleChange}
                />
              </label>
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
