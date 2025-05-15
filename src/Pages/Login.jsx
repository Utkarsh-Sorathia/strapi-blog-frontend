import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../apollo/Mutation/Login/Login";
import { useAuth } from "../Components/AuthProvider";
import { Toast } from "../Components/Toast";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data?.login?.jwt) {
        Toast.fire({
          icon: "success",
          title: "Logged in successfully",
        });
        console.log(data?.login?.jwt);

        loginUser(data?.login?.jwt);
        navigate("/"); // Redirect to /home after login
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({
        variables: {
          input: {
            identifier,
            password,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email or Username</label>
            <input
              type="text"
              className="form-control"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
