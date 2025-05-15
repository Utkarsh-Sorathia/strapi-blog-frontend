import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT_US } from "../apollo/Mutation/Contact-us/ContactUs";

const ContactUs = () => {
  const [formData, setFormData] = useState({ Fullname: "", Email: "", Message: "" });
  const [createContactUs, { data, loading, error }] = useMutation(CREATE_CONTACT_US);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContactUs({ variables: { data: formData } });
      alert("Message sent successfully!");
      setFormData({ Fullname: "", Email: "", Message: "" });
    } catch (err) {
      alert("Failed to send message.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="card-title text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="Fullname"
                  value={formData.Fullname}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Write your message here"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
            {error && <div className="alert alert-danger mt-3">Error sending message</div>}
            {data && (
              <div className="alert alert-success mt-3">Message sent successfully!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
