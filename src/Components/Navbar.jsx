import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Locales from "./Locales";
import Theme from "./Theme";

const Navbar = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    // window.location.href = "/login";
    navigate("/login");
  };
  return (
    <>
      {jwt ? (
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link className="navbar-brand fs-3 mx-3" to="/">
                BlogSphere
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item mx-3 mt-1 fs-5">
                    <Link
                      to="/"
                      className="text-decoration-none mx-3 text-dark"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mx-3 mt-1 fs-5">
                    <Link
                      to="/create"
                      className="text-decoration-none mx-3 text-dark"
                    >
                      Create Blog
                    </Link>
                  </li>
                  {/* <li className="nav-item mx-3 mt-1 fs-5">
                <Link
                  to="/media"
                  className="text-decoration-none mx-3 text-dark"
                >
                  Media
                </Link>
              </li> */}
                  <li className="nav-item mx-3 mt-1 fs-5">
                    <Link
                      to="/contact-us"
                      className="text-decoration-none mx-3 text-dark"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="me-5">
                  <Locales />
                </div>
                <div className="me-5">
                  <Theme />
                </div>
                <div className="me-5">
                  <div className="dropdown me-5">
                    <button
                      className="btn dropdown-toggle fs-5"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-fill"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link className="navbar-brand fs-3 mx-3" to="/login">
                BlogSphere
              </Link>
              <button
                className="navbar-toggler bg-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
                <div className="ml-auto">
                  <Link to="/login" className="btn btn-primary mx-2 mb-2 mt-1">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary mx-2 mb-2 mt-1"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
