import React, { useEffect, useState } from "react";
import "./Attendance.css";
import { useSelector } from "react-redux";
import axios from "axios";
import AttendanceTable from "../AttendanceTable/AttendanceTable";
import { toast } from "react-toastify";

const Attendance = () => {
  const [punchIn, setPunchIn] = useState(false);
  const [punchOut, setPunchOut] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const user = useSelector((state) => state.user?.user?.user);
  const employeeId = user?._id;
  const isAdmin = user?.role === "admin";

  const getCurrentTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // Format the date
    const formattedTime = now.toLocaleTimeString(); // Format the time
    return `${formattedDate} - ${formattedTime}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handlePunchIn = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // allowed punch-in interval (9:00 AM to 10:15 AM)
    // if (
    //   (currentHour === 9 && currentMinute >= 0 && currentMinute <= 59) ||
    //   (currentHour === 10 && currentMinute >= 0 && currentMinute <= 14)
    // ) {
    setPunchIn(true);
    try {
      await axios.post(
        "https://hrms-backend-uk0e.onrender.com/api/attendance/punchin",
        {
          employeeId,
        }
      );
      toast.success("Punched in successfully");
    } catch (error) {
      console.error("Punch in failed:", error.response.data.message);
    }
    setPunchOut(false);
    // } else {
    //   toast.error("Punch-in is only allowed between 9:00 AM and 10:15 AM");
    // }
  };

  const handlePunchOut = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // allowed punch-out interval (11:00 AM to 10:00 PM)
    // if (
    //   (currentHour === 11 && currentMinute >= 0 && currentMinute <= 59) ||
    //   (currentHour >= 12 && currentHour <= 22)
    // ) {
    setPunchOut(true);
    try {
      await axios.post(
        "https://hrms-backend-uk0e.onrender.com/api/attendance/punchout",
        {
          employeeId,
        }
      );
      toast.success("Punched out successfully");
    } catch (error) {
      console.error("Punch out failed:", error.response.data.message);
    }
    setPunchIn(false);
    // } else {
    //   toast.error("Punch-out is only allowed between 11:00 AM and 10:00 PM");
    // }
  };

  return (
    <div className="attendance-container">
      <div className="time-container">
        <div className="current-time">{currentTime}</div>
      </div>
      {isAdmin ? null : (
        <>
          <h2>Attendance</h2>
          <div className="buttons-container">
            {punchIn ? (
              <button disabled>Punch In</button>
            ) : (
              <button onClick={handlePunchIn} className="punch-in">
                Punch In
              </button>
            )}
            {punchOut ? (
              <button disabled>Punch Out</button>
            ) : (
              <button onClick={handlePunchOut} className="punch-out">
                Punch Out
              </button>
            )}
          </div>
        </>
      )}

      {isAdmin && (
        <div className="attendance-table">
          <AttendanceTable />
        </div>
      )}
    </div>
  );
};

export default Attendance;
