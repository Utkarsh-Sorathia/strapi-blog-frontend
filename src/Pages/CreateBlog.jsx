import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BLOGS } from "../apollo/Queries/Blog/Blogs";
import { CREATE_BLOG } from "../apollo/Mutation/CreateBlog/CreateBlog";
// import { DELETE_BLOG } from "../apollo/Mutation/DeleteBlog/DeleteBlog";
import { Link, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [locale, setLocale] = useState(
    localStorage.getItem("selectedLocale") || "en"
  );

  const navigate = useNavigate();

  const {
    loading: fetching,
    error: fetchError,
    data,
    refetch,
  } = useQuery(BLOGS, {
    variables: { locale },
  });

  useEffect(() => {
    refetch();
    const handleStorageChange = () => {
      const newLocale = localStorage.getItem("selectedLocale");
      if (newLocale && newLocale !== locale) {
        setLocale(newLocale);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [locale, refetch]);

  const [createBlog, { loading: creating, error: createError }] = useMutation(
    CREATE_BLOG,
    {
      onCompleted: () => refetch(),
    }
  );

  // const [deleteBlogMutation, { loading: deleting, error: deleteError }] =
  //   useMutation(DELETE_BLOG, {
  //     onCompleted: () => refetch(),
  //   });

  // const deleteBlog = (id, title) => {
  //   const confirmDelete = window.confirm(
  //     `Are you sure you want to delete "${title}" blog?`
  //   );
  //   if (confirmDelete) {
  //     deleteBlogMutation({ variables: { documentId: id } });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog({
        variables: {
          data: { Title: title, Body: body, Author: author },
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Create Blog Form */}
        <div className="col-lg-4">
          <div className="row justify-content-center">
            <h1 className="text-center mb-4">Create Blog</h1>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Body</label>
                    <textarea
                      className="form-control"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={creating}
                    >
                      {creating ? "Creating..." : "Create Blog"}
                    </button>
                  </div>
                </form>
                {createError && (
                  <p className="text-danger mt-3">{createError.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blog List Table */}
        <div className="col-lg-8 mt-2">
          <h1 className="text-center mb-3">Blog List</h1>

          {fetching ? (
            <p>Loading blogs...</p>
          ) : fetchError ? (
            <p className="text-danger">
              Error fetching blogs: {fetchError.message}
            </p>
          ) : data && data.blogs.length === 0 ? (
            <p className="text-center">No Blogs Found</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark text-center">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {data.blogs.map((blog, index) => (
                    <tr key={blog.documentId}>
                      <td className="text-center">{index + 1}</td>
                      <td>{blog.Title}</td>
                      <td className="text-center">
                        {/* <button className="btn btn-danger btn-sm" onClick={() => deleteBlog(blog.documentId, blog.Title)}>
                          Delete
                        </button> */}
                        <Link
                          to={`/update/${blog.documentId}`}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* {deleting && <p>Deleting blog...</p>} */}
          {/* {deleteError && (
            <p className="text-danger">
              Error deleting blog: {deleteError.message}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
