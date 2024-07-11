import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-info">
          <img src={user.picture} alt={user.name} className="profile-img" />
          <div>
            <h2 className="profile-name">{user.name}</h2>
            
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;