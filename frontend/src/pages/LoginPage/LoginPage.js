import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <main className="login-content">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autocomplete="off"
              required="required"/>
            <span>Username</span>
            <i></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autocomplete="off"
              required="required"/>
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="#">Fogot Password</a>
            <Link to='/register' className="sign-up">Signup</Link>
          </div>
          <input type="submit" value='Login'/>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;