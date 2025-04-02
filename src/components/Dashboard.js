import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../features/api/apiSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Always call the hook at the top level
  const {
    data: users,
    error,
    isLoading,
  } = useGetUsersQuery(undefined, {
    skip: !token, // <-- Skip the query if no token
  });

  // ✅ You can conditionally render, but not conditionally call the hook
  if (!token) {
    return (
      <div>
        <h2>Please log in to view your dashboard.</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error occurred while fetching users.
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>User List</h3>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            {user.naam} {user.voornaam}
          </div>
        ))
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default Dashboard;
