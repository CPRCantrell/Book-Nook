import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import './RegisterPage.css'

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <main className="register-content">
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
                required="required"></input>
              <span>Username</span>
              <i></i>
            </div>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:{" "}
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button>Register!</button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;