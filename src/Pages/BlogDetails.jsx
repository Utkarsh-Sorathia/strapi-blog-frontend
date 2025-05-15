import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { BLOG } from "../apollo/Queries/Blog/Blog";
import { convertToIST } from "../utils/dateFormate";
import MarkDown from "react-markdown";

export default function BlogPage() {
  const { id } = useParams(); // Get the blog ID from the URL params
  const [locale, setLocale] = useState(
    localStorage.getItem("selectedLocale") || "en"
  );
  const { loading, error, data, refetch } = useQuery(BLOG, {
    variables: {
      documentId: id,
      locale: locale,
    }, // Pass the ID as a variable
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

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger py-5">Error :</div>;

  return (
    <div className="mt-5 mb-5">
      <div className="row justify-content-center mx-2">
        {data.blog ? (
          <>
            {" "}
            <div className="col-lg-6">
              <div className="text-center">
                {/* Image Section */}
                {data.blog?.Photo[0]?.url && (
                  <img
                    src={`http://localhost:1337${data.blog.Photo[0]?.url}`}
                    alt="Blog"
                    className="img-fluid rounded-top mb-4"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>
              {/* Content Section */}
              <div className="card-body">
                <h3 className="fw-bold mb-3">{data.blog.Title}</h3>
                <p className="text-muted mb-4">
                  By <span className="fw-light">{data.blog.Author}</span>
                </p>

                <p className="lead text-justify">
                  <MarkDown>{data.blog.Body}</MarkDown>
                </p>

                <p className="text-muted">
                  <small>{convertToIST(data.blog.createdAt)}</small>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>No Transalation Found</>
        )}
      </div>
    </div>
  );
}
