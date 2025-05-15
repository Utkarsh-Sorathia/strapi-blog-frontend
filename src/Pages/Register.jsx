import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../apollo/Mutation/Register/Register";
import { ROLES } from "../apollo/Queries/Roles/Roles";
import { Toast } from "../Components/Toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const navigate = useNavigate();

  const {
    data: rolesData,
    loading: rolesLoading,
    error: rolesError,
  } = useQuery(ROLES);

  const [createUser, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedRole = isAuthenticated ? "1" : "2";
    try {
      await createUser({
        variables: {
          data: {
            username,
            email,
            password,
            role: selectedRole,
          },
        },
      });
      Toast.fire({
        icon: "success",
        title: "Registered successfully",
      });
      navigate("/login");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        {rolesLoading ? (
          <p>Loading roles...</p>
        ) : rolesError ? (
          <p>Error fetching roles: {rolesError.message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option className="form-option" value="">
                  Select Role
                </option>
                {rolesData?.usersPermissionsRoles?.map((role) => (
                  <option
                    className="form-option"
                    key={role.documentId}
                    value={role.documentId}
                  >
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default Register;
