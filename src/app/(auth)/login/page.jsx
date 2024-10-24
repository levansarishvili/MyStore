"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/buttons/Button";
import Loading from "../../loading";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isAuth")); // Parse boolean value
    if (isLoggedIn) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [router]);

  // Function to check if the user credentials are correct
  async function checkAuth(username, password) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60 * 24 * 7,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password. Please try again.");
      }
      const data = await res.json();

      // If login is successful, store authentication status and navigate to home
      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem("accessToken", data.accessToken);

      router.push("/home");
    } catch (error) {
      console.error(error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      checkAuth(username, password);
    } else {
      setError("Please enter both username and password.");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="login-header">
        <img
          className="login-header__logo"
          src="../assets/logo.svg"
          alt="Logo"
        />
      </header>

      <div className="login-page__wrapper">
        <h1 className="section-header">Welcome back</h1>

        {/* Login form */}
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-input__label" htmlFor="username">
              <p className="login-label__txt">Username:</p>
              <input
                value={username}
                className="login-input"
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="login-input__label" htmlFor="password">
              <p className="login-label__txt">Password:</p>
              <input
                value={password}
                className="login-input"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Button type="submit" className="btn login-button" name="Sign in" />
          </form>

          {/* Display error */}
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

      <footer className="login-page-footer">
        <p className="login-page-footer__txt">Georgia, Copyright &copy; 2024</p>
      </footer>
    </>
  );
}
