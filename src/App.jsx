import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./app.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Body from "./components/Body/Body";
import Employee from "./components/Employee/Employee";
import Client from "./components/Client/Client";
import Attendance from "./components/Attendance/Attendance";
import Projects from "./components/Projects/Projects";
import Reports from "./components/Reports/Reports";
import Payroll from "./components/Payroll/Payroll";
import LoginForm from "./components/Auth/LoginForm";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user?.user?.user);
  const isAuthenticated = user?.token;
  const userRole = user?.role;

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <>
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<LoginForm />} />

                    {userRole === "admin" && (
                      <>
                        <Route path="dashboard" element={<Body />} />
                        <Route path="client" element={<Client />} />
                        <Route path="reports" element={<Reports />} />
                      </>
                    )}
                    <Route path="employee" element={<Employee />} />
                    <Route path="attendance" element={<Attendance  />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="payroll" element={<Payroll />} />
                  </Routes>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
