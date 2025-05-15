import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ME_QUERY } from "../apollo/Queries/me/me";

const Profile = () => {
  const { data, loading, error, refetch } = useQuery(ME_QUERY);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;
  return (
    <>
      <div className="container mt-5 card p-4 w-50 shadow">
        <h2>Profile Information</h2>
        <div>
          <strong>Username:</strong> {data.me.username}
        </div>
        <div>
          <strong>Email:</strong> {data.me.email}
        </div>
        
      </div>
    </>
  );
};

export default Profile;
