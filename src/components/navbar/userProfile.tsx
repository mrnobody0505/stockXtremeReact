import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { updateProfile } from "firebase/auth";
import { UserAuth } from "../../context/authContext";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../config/firebase"; // Import the db instance from the firebase.ts file

const UserProfile = () => {
  const { user } = UserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [active, setActive] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      // Fetch user profile data from Firebase Realtime Database
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      onValue(userDatabaseRef, (snapshot) => {
        if (snapshot.exists()) {
          const profileData = snapshot.val();
          setFirstName(profileData.firstName || "");
          setLastName(profileData.lastName || "");
          setGender(profileData.gender || "");
          setBalance(profileData.balance || " ");
        }
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: null,
      });

      const userDatabaseRef = ref(db, `users/${user.uid}`);
      await set(userDatabaseRef, {
        firstName,
        lastName,
        gender,
        balance,
      });

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>User Profile</h2>
      {!active && <div>
        <p>Welcome {firstName + " " + lastName}</p>
        <p>Your balance is {balance}</p>
      </div>}
      {active && (
        <div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              placeholder={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              placeholder={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              placeholder={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="balance">Balance:</label>
            <input
              type="number"
              id="balance"
              placeholder={balance.toString()}
              onChange={(e) => setBalance(+e.target.value)}
            />
          </div>
        </div>
      )}
      <button
        style={{ marginTop: '10px', background: 'darkblue', color: 'white', fontSize: '16px', padding: '12px 24px', borderRadius: '8px' }}
        onClick={() => {
          setActive(!active);
          if (active) {
            handleUpdateProfile();
          }
        }}
      >
        {active ? 'Save Profile' : 'Update Profile'}
      </button>
    </div>
  );
};

export default UserProfile;
