import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Discover & Share Amazing Stories</h1>
          <p className="lead">Join our community of writers, thinkers, and explorers.</p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-light btn-lg me-3">Get Started</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Join Us?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>📖 Read Engaging Articles</h4>
                <p>Explore a variety of topics from technology to lifestyle, curated by passionate writers.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>✍️ Write & Publish</h4>
                <p>Share your thoughts and experiences with a community that values your voice.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>🌍 Connect & Grow</h4>
                <p>Engage with like-minded individuals and grow your influence as a writer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="p-4">
                <p className="fw-light">"This blog changed my life! I love the engaging content."</p>
                <h5>- Sarah L.</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <p className="fw-light">"A great platform to share my thoughts and meet amazing people!"</p>
                <h5>- John D.</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <p className="fw-light">"I enjoy reading daily articles that keep me informed and entertained."</p>
                <h5>- Emma R.</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-5">
        <h2>Ready to Join?</h2>
        <p className="lead">Sign up today and start exploring great content!</p>
        <Link to="/register" className="btn btn-primary btn-lg">Join Now</Link>
      </section>

    </div>
  );
};

export default Landing;
