"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/buttons/Button";
import Loading from "../../loading";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useAuth } from "../../hooks/useAuth";

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
    <div className="login-page__wrapper dark:bg-[#313131] border rounded-2xl p-16 flex flex-col items-center gap-12 max-w-fit transition-all duration-300 hover:shadow-lg cursor-pointer bg-gray-100">
      <h1 className="section-header text-4xl font-semibold">Login form</h1>

      {/* Login form */}
      <div className="login-form-wrapper flex flex-col items-center gap-8">
        <form
          className="login-form flex flex-col items-center gap-8"
          onSubmit={handleSubmit}
        >
          <label
            className="login-input__label flex flex-col gap-4"
            htmlFor="username"
          >
            <p className="login-label__txt text-2xl font-medium">Username:</p>
            <input
              value={username}
              className="login-input border border-gray-300 rounded-lg px-4 py-2 w-[30rem] h-14 font-inherit text-2xl transition-all duration-300 outline-none focus:border-[#ec5e2a]"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label
            className="login-input__label flex flex-col gap-4"
            htmlFor="password"
          >
            <p className="login-label__txt text-2xl font-medium">Password:</p>
            <input
              value={password}
              className="login-input border border-gray-300 rounded-lg px-4 py-2 w-[30rem] h-14 font-inherit text-2xl transition-all duration-300 outline-none focus:border-[#ec5e2a] "
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button
            type="submit"
            className=" login-button font-medium border-2 border-[#ec5e2a] text-white px-4 py-2 text-2xl w-60 bg-[#ec5e2a] bottom-0 hover:bg-white hover:shadow-lg hover:text-gray-900 rounded-lg 
            cursor-pointer transition-all duration-300"
            name="Sign in"
          />
        </form>

        {/* Display error */}
        {error && (
          <p className="error-message text-2xl text-red-500">{error}</p>
        )}
        <div className="login-footer flex flex-col gap-4">
          <p className="login-footer-txt text-xl font-medium">
            Forgot <span className="text-[#ec5e2a]">Username / Password</span>?
          </p>
          <p className="login-footer-txt text-xl">
            Don't have an account?
            <span className="text-[#ec5e2a]">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
