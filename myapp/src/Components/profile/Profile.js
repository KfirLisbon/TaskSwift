import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import './Profile.css';

function ProfilePage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Use Auth0 hook to get user data
  const [userData, setUserData] = useState({
    name: '',
    picture: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);

  // Set user data when authenticated and user object is available
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserData({
        name: user.name,
        picture: user.picture, 
        bio: user.user_metadata?.bio || '',
      });
      setLoading(false);
    }
  }, [isAuthenticated, user]); // Dependencies: update whenever the user data changes

  // Function to update the user profile via Auth0 Management API
  const updateUserProfile = async (updatedData) => {
    try {
      const token = await getAccessTokenSilently({
        audience: `https://dev-3poehk7skgdn1ul6.us.auth0.com/api/v2/`,
        scope: 'update:users',
      });

      const response = await fetch(`https://dev-3poehk7skgdn1ul6.us.auth0.com/api/v2/users/${user.sub}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_metadata: updatedData, // Update the metadata with the new profile data
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User profile updated:', updatedUser);

        // Update the local state with the new profile data
        setUserData(prevData => ({
          ...prevData,
          picture: updatedData.picture,
        }));
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching token or updating profile:', error);
    }
  };

  // Handle form submission and update user profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile({
      bio: userData.bio,
      picture: userData.picture, // Include the picture in the updated data
    });
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Conditional rendering while loading
  if (loading) {
    return (
      <div className='loading-page'>
        <h3>Profile Customization Section</h3>
        <p>To Customize your profile, you got to sign in!<br /> Don't have a user? Sign up!</p>
      </div>
    );
  }

  // Render the profile page once data is loaded
  return (
    <div className='profile-section'>
      <h1>Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field (Cannot be edited directly via Auth0) */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled // Name can't be updated via Auth0 directly
          />
        </div>

        {/* Bio Field */}
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Profile Picture Field */}
        <div>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="picture"
            value={userData.picture}
            onChange={handleChange}
          />
        </div>

        {/* Display Profile Picture if available */}
        {userData.picture && (
          <div className="profile-picture-container">
            <img src={userData.picture} alt="Profile" className="profile-picture" />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfilePage;
