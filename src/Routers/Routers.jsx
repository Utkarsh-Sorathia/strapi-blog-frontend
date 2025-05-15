import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import BlogDetails from "../Pages/BlogDetails";
import CreateBlog from "../Pages/CreateBlog";
import UpdateBlog from "../Pages/UpdateBlog";
import ContactUs from "../Pages/ContactUs";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../Components/AuthProvider";
import Profile from "../Pages/Profile";

const Routers = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                  <Route path="/create" element={<CreateBlog />} />
                  <Route path="/update/:id" element={<UpdateBlog />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Routers;
