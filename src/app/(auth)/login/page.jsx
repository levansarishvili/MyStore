"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuth");
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

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
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        // Redirect to home page
        const data = await res.json();

        // Add auth status in local storage
        localStorage.setItem("isAuth", "true");
        router.push("/");
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred");
    }
  }

  return (
    <div className="login-page__wrapper">
      <h1 className="section-header">Login Form</h1>

      <div className="login-form-wrapper">
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

        {/* Render error message */}
        {error && <p className="error-message">{error}</p>}
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
