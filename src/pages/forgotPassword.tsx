import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../config/firebase';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isEmailRegistered = async (email: string) => {
    try {
      const userCredential = await fetchSignInMethodsForEmail(auth, email);
      return userCredential.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    const emailExist = isEmailRegistered(email);
    if (!emailExist) {
        setSuccessMessage("Email not found!");
        return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};