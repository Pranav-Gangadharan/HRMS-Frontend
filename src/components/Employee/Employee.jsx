// Employee.js
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./employee.css";
import { useEmployeeContext } from "../../context/EmployeeContext";
import EmployeeModal from "../EmployeeModal/EmployeeModal";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/userSlice";

const Employee = () => {
  const { employees, loading, fetchEmployees } = useEmployeeContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user?.user?.user?.role);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    dispatch(Logout());
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="employeeSection">
      <div className="employeeHeader">
        <h2 className="employeeTitle">All Employees</h2>
        {userRole === "admin" && ( // Conditionally render based on user role
          <button className="addEmployeeButton" onClick={openModal}>
            Add Employee
          </button>
        )}
        {userRole !== "admin" && ( // Conditionally render logout button
          <button className="logoutButton" onClick={logout}>
            Logout
          </button>
        )}
      </div>
      <EmployeeModal isOpen={isModalOpen} onRequestClose={closeModal} />
      <div className="employeeWrapper flex">
        {loading ? (
          <p>Loading...</p>
        ) : (
          employees.map((item) => (
            <div key={item._id} className="employeeCard">
              <Card
                _id={item._id}
                employeeUrl={item?.profilePicture}
                userName={item?.userName}
                designation={item?.designation}
                number={item?.phoneNumber}
                email={item?.email}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Employee;
