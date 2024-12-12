import "./styles.css";

const RegisterCard = ({ country }: { country: string }) => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="login-title">Personal info</h1>
        <p className="login-subtitle">
          Welcome to <span>Customer UI App</span>
        </p>
        <p className="login-subtitle">
          {country === "DE"
            ? "This is the website for Germany"
            : country === "CH"
              ? "This is the website for Switzerland"
              : country === "AT"
                ? "This is the website for Austria"
                : country === "UK"
                  ? "This is the website for United Kingdom"
                  : "Welcome!"}
        </p>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Gia Huy"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio <span className="text-danger">*</span>
            </label>
            <textarea
              id="bio"
              placeholder="Summary your work experience"
              className="form-input"
              rows={3}
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
