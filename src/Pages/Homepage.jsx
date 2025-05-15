import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { convertToIST } from "../utils/dateFormate";
import { BLOGS } from "../apollo/Queries/Blog/Blogs";

export default function Homepage() {
  const [locale, setLocale] = useState(
    localStorage.getItem("selectedLocale") || "en"
  );

  const { loading, error, data, refetch } = useQuery(BLOGS, {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog List</h1>

      {data.blogs.length === 0 ? (
        <p className="text-center">No blogs available</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {data.blogs.map((blog) => (
            <div key={blog.documentId} className="col">
              <div className="card h-100 shadow-lg">
                {/* Image Section */}
                {blog.Photo && blog.Photo[0]?.url ? (
                  <img
                    src={
                      blog.Photo[0].url.includes("https://res.cloudinary.com")
                        ? blog.Photo[0].url
                        : `http://localhost:1337${blog.Photo[0].url}`
                    }
                    className="card-img-top h-50 rounded-top"
                    alt={blog.Title}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x200" // Fallback image
                    className="card-img-top h-50 rounded-top"
                    alt="Default"
                    style={{ objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <h4 className="card-title mb-0">{blog.Title}</h4>
                  <p className="card-text text-secondary mt-1 mx-0">
                    {blog.Body.substring(0, 50)}...
                    <Link
                      to={`/blog/${blog.documentId}`}
                      className="btn btn-link text-primary"
                    >
                      Read more...
                    </Link>
                  </p>

                  {/* Author & Date Section */}
                  <div className="d-flex align-items-center mt-3">
                    {/* Avatar */}
                    <img
                      src={`https://ui-avatars.com/api/?name=${blog.Author}&background=random`}
                      alt="Author Avatar"
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />

                    <div>
                      <p className="mb-0 fw-bold">{blog.Author}</p>
                      <p className="mb-0 text-muted small">
                        {convertToIST(blog.createdAt).split(" ")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
