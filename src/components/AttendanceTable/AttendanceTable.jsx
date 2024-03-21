import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceTable.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          "https://hrms-backend-cu4x.onrender.com/api/attendance"
        );
        setAttendance(response.data);
        setFilteredAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [attendance]);

  useEffect(() => {
    if (!filterCriteria) {
      setFilteredAttendance(attendance);
    } else {
      const filteredRecords = attendance.filter((record) =>
        record.employeeId.username
          .toLowerCase()
          .includes(filterCriteria.toLowerCase())
      );
      setFilteredAttendance(filteredRecords);
    }
  }, [filterCriteria, attendance]);

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAttendance);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "attendance_report.xlsx"
    );
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>
      <div className="report-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by employee name"
            value={filterCriteria}
            onChange={handleFilterChange}
          />
        </div>
        <button onClick={exportToExcel} className="export-button">
          Download Excel
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Punch In Time</th>
            <th>Punch Out Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((record) => (
            <tr key={record._id}>
              <td>{record?.employeeId?.username}</td>
              <td>{new Date(record.punchInTime).toLocaleString()}</td>
              <td>
                {record.punchOutTime
                  ? new Date(record.punchOutTime).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
