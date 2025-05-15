import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BLOG } from "../apollo/Queries/Blog/Blog";
import { UPDATE_BLOG } from "../apollo/Mutation/UpdateBlog/UpadteBlog";

const UpdateBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL params
  const navigate = useNavigate(); // useNavigate for navigation
  const { loading, error, data, refetch } = useQuery(BLOG, {
    variables: {
      documentId: id,
      locale: localStorage.getItem("selectedLocale") || "en",
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [updateBlog, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_BLOG);

  const [formData, setFormData] = useState({
    Title: "",
    Body: "",
    Author: "",
  });

  useEffect(() => {
    if (data && data.blog) {
      setFormData({
        Title: data.blog.Title,
        Body: data.blog.Body,
        Author: data.blog.Author,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog({
        variables: {
          documentId: id,
          data: formData,
        },
      });
      navigate(`/blog/${id}`); // Redirect to the updated blog page using navigate
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching blog data!</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg p-4">
            <div className="card-body">
              <Link
                to="/create"
                className="btn btn-outline-secondary btn-lg mb-4"
              >
                Back
              </Link>
              <h2 className="text-center mb-4">Update Blog</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    id="Title"
                    name="Title"
                    value={formData.Title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Author">Author</label>
                  <input
                    type="text"
                    id="Author"
                    name="Author"
                    value={formData.Author}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter author's name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Body">Body</label>
                  <textarea
                    id="Body"
                    name="Body"
                    value={formData.Body}
                    onChange={handleChange}
                    className="form-control"
                    rows="6"
                    placeholder="Write your blog content here"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={mutationLoading}
                >
                  {mutationLoading ? "Updating..." : "Update Blog"}
                </button>
              </form>
              {mutationError && (
                <div className="alert alert-danger mt-3">
                  Error updating the blog: {mutationError.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
