"use client";
import "./LoginForm.css";
import Button from "../../components/Button";
import LoginUser from "./LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Input change handlers
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    LoginUser(username, password);

    if (localStorage.getItem("accessToken")) {
      window.location.href = "/store";
    }
  }
  return (
    <div className="login-page__wrapper">
      <h1 className="section-header">Login Form</h1>
      <div className="login-form-wrapper">
        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-input__label" htmlFor="username">
            <p className="login-label__txt">Username:</p>
            <input
              value={username}
              className="login-input"
              type="text"
              id="username"
              onChange={handleUsernameChange}
            />
          </label>
          <label className="login-input__label" htmlFor="password">
            <p className="login-label__txt">Password:</p>
            <input
              value={password}
              className="login-input"
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
          </label>
          <Button type="submit" className="btn login-button" name="Sign in" />
        </form>
        <div className="login-footer">
          <p className="login-footer-txt">
            Forgot <span className="highlight">Username / Password</span>?
          </p>
          <p className="login-footer-txt">
            Don't have an account? <span className="highlight">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
