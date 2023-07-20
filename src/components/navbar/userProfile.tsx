import React, { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { UserAuth } from '../../context/authContext';
import { onValue, ref, set } from "firebase/database";
import { db } from '../../config/firebase'; // Import the db instance from the firebase.ts file

const UserProfile = () => {
  const { user } = UserAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (user) {
      // Fetch user profile data from Firebase Realtime Database
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      onValue(userDatabaseRef, (snapshot) => {
        if (snapshot.exists()) {
          const profileData = snapshot.val();
          setFirstName(profileData.firstName || '');
          setLastName(profileData.lastName || '');
          setGender(profileData.gender || '');
        }
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: null
      });

      const userDatabaseRef = ref(db, `users/${user.uid}`);
      await set(userDatabaseRef, {
        firstName,
        lastName,
        gender
      });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        Welcome {firstName + " " + lastName}
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default UserProfile;
