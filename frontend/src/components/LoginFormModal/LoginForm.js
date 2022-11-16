import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";
import "./index.css";

const LoginForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setErrors([]);
    return dispatch(login({ credential, password }))
      .then(() => {
        setShowModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map((error, idx) => (
          <li key={`loginError-${idx + 1}`}>{error}</li>
        ))}
      </ul>
      <div className="login-block login-inputs">
        <div className="login-box username">
          <label htmlFor="credential">Username or Email</label>
          <input
            name="credential"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="login-box password">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-block login-button">
        <div className="login-box login-button">
          <button type="submit">Log In</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
