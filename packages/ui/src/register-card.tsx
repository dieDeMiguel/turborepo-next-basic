import "./styles.css";

const RegisterCard = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Personal info</h1>
        <p className="login-subtitle">Welcome to Customer UI App</p>
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
