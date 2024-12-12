import Button from "./button.js";
import "./styles.css";

const LoginCard = () => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Welcome to <span>Operations UI App</span>
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
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
