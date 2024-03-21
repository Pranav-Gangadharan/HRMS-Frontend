import React, { useEffect, useState } from "react";
import axios from "axios";
import "./loginForm.css";
import Logo from "../../assets/blackStone.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../redux/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user?.user);

  useEffect(() => {
    if (user && user.token) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "employee") {
        navigate("/employee");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hrms-backend-uk0e.onrender.com/api/auth/login",
        { email, password }
      );
      const { token, user } = response.data;

      dispatch(UserLogin({ token, user }));

      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-form">
      <div className="logo-wrapper">
        <img src={Logo} alt="BlackStone" className="logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
