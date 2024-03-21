import React, { useState } from "react";
import "./employeeForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEmployeeContext } from "../../context/EmployeeContext";

const EmployeeForm = ({ onSubmit, onCancel }) => {
  const { addOrUpdateEmployee } = useEmployeeContext();
  const [employeeData, setEmployeeData] = useState({
    profilePicture: null,
    userName: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    joiningDate: "",
    phoneNumber: "",
    salary: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "commuto");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dagksjsks/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      setEmployeeData({
        ...employeeData,
        profilePicture: imageUrl,
      });
      // console.log(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrUpdateEmployee(employeeData);
      toast.success("Employee added successfully!");
      onCancel();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add employee. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Profile Picture:
        <input
          name="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </label>
      <label>
        Employee Name:
        <input
          type="text"
          name="userName"
          value={employeeData.userName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        value={employeeData.password}
        onChange={handleChange}
        required
      />
      <label>
        Designation:
        <input
          type="text"
          name="designation"
          value={employeeData.designation}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="department">Department:</label>
      <select
        id="department"
        name="department"
        value={employeeData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        <option value="IT">IT</option>
        <option value="BPO">BPO</option>
      </select>
      <label>
        Joining Date:
        <input
          type="date"
          name="joiningDate"
          value={employeeData.joiningDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={employeeData.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Salary:
        <input
          type="number"
          name="salary"
          value={employeeData.salary}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="role">Role:</label>
      <select
        id="role"
        name="role"
        value={employeeData.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="employee">Employee</option>
        {/* <option value="admin">Admin</option> */}
      </select>

      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;
