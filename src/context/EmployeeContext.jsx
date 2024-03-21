import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeContext = createContext();

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  };

  // Function to add/update an employee
  const addOrUpdateEmployee = async (employeeData) => {
    try {
      if (employeeData._id) {
        await axios.put(
          `http://localhost:4000/api/employees/${employeeData._id}`,
          employeeData
        );
        toast.success("Employee updated successfully!");
      } else {
      await axios.post("http://localhost:4000/api/employees", employeeData);
      toast.success("Employee added successfully!");
      }
      fetchEmployees(); // Refresh employee list after update
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add/update employee. Please try again.");
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:4000/api/employees/${employeeId}`);
      toast.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again.");
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        fetchEmployees,
        addOrUpdateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
