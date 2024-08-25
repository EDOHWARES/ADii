import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(AppContext);

  // Function to extract the query parameter (token) from the URL
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  };

  const token = getQueryParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 8) {
        setLoading(false);
        return setMessage('Password cannot be less than 8 digits!');
    };

    const resp = await axios.post(`${serverUrl}/api/user/reset-password/${token}`, {
      email: email,
      password: password,
      token: token,
    });

    try {
        if (resp.data.success) {
            setMessage(resp.data.message);
            setLoading(false);
            navigate('/auth');
          } else {
            setMessage(resp.data.message);
            setLoading(false);
          }
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      <p style={styles.message}>{message ? message : ' '}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#276100ce",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
  },
};

export default ResetPassword;
