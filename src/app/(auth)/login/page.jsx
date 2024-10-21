import "./LoginPage.css";
import Button from "../../components/Button";
function LoginPage() {
  return (
    <div className="login-page__wrapper">
      <h1 className="section-header">Login Form</h1>
      <div className="login-form-wrapper">
        {/* Login form */}
        <form className="login-form">
          <label className="login-input__label" htmlFor="username">
            <p className="login-label__txt">Username:</p>
            <input className="login-input" type="text" id="username"></input>
          </label>
          <label className="login-input__label" htmlFor="password">
            <p className="login-label__txt">Password:</p>
            <input
              className="login-input"
              type="password"
              id="password"
            ></input>
          </label>
          <Button className="btn login-button" name="SIGN IN" />
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
export default LoginPage;
