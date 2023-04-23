import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
      <div className="reg-form-container">
        <form className="reg-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
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
            <div className="input-box">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                autocomplete="off"
                required="required"/>
              <span>first Name</span>
              <i></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                autocomplete="off"
                required="required"/>
              <span>Last Name</span>
              <i></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autocomplete="off"
                required="required"/>
              <span>Email</span>
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
            <Link to='/register' className="sign-in">Sign-in</Link>
          <input type="submit" value='Create Account'/>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;