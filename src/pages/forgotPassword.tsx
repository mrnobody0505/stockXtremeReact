import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/authContext';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { isEmailRegistered } = UserAuth();


  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    const emailExist = await isEmailRegistered(email);
    console.log(emailExist);
    if (emailExist) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage('Link to reset password has been sent to your email. Please check your inbox.');
        setIsSent(true);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    } else {
      setSuccessMessage("Email not found, try again");
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
        {isSent ? <Link to="/">Redirect to Login page</Link> : <button type="submit">Reset Password</button>}
      </form>
    </div>
  );
};