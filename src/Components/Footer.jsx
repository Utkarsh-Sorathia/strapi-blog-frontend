import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white text-center py-2">
        <p className="mb-0">© 2024 BlogSphere. All rights reserved.</p>
        <p>
          <Link to="/privacy" className="text-white mx-2">Privacy Policy</Link> | 
          <Link to="/terms" className="text-white mx-2">Terms of Service</Link>
        </p>
      </footer>
    </>
  );
};

export default Footer;
