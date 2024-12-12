import "./styles.css";

const LoginCard = ({ country }: { country: string }) => {
  console.log("country", country);
  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Welcome to <span>Operations UI App</span>
        </p>
        {/* <p className="login-subtitle">
          This is the website for <span>{country}</span>
        </p> */}
        <p>
          {country === "DE"
            ? "This is the website for Germany"
            : country === "CH"
              ? "This is the website for Switzerland"
              : country === "AT"
                ? "This is the website for Austria"
                : "Welcome!"}
        </p>
        <form>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="aaa@gmail.com"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
