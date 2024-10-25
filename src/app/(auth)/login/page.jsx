"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/buttons/Button";
import Loading from "../../loading";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useAuth } from "../../hooks/useAuth";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loadingRedirect = useAuthRedirect();
  const { checkAuth, loading, error, setError } = useAuth();

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const success = await checkAuth(username, password);
    if (success) {
      router.push("/home");
    }
  }

  if (loadingRedirect || loading) {
    return <Loading />;
  }

  return (
    <div className="login-page__wrapper">
      <h1 className="section-header">Login form</h1>

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
          <Button type="submit" className=" login-button" name="Sign in" />
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
  );
}
