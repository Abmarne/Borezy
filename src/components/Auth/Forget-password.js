import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Logo from '../../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const db = getFirestore();

  const checkEmailInFirestore = async (email) => {
    const branchesRef = collection(db, 'Branches');
    const superadminsRef = collection(db, 'Superadmins');

    // Query the Branches collection
    const branchesQuery = query(branchesRef, where('emailId', '==', email));
    const branchesSnapshot = await getDocs(branchesQuery);

    // Query the Superadmins collection
    const superadminsQuery = query(superadminsRef, where('email', '==', email));
    const superadminsSnapshot = await getDocs(superadminsQuery);

    // Check if email exists in either collection
    return !branchesSnapshot.empty || !superadminsSnapshot.empty;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Check if the email exists in Firestore
      const emailExists = await checkEmailInFirestore(email);

      if (!emailExists) {
        setError('Email not found in our records. Please check the email address and try again.');
        return;
      }

      // Email exists, proceed with sending password reset email
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      <div className="form-container">
        <div className="title">Forgot Password</div>
        <div className="subtitle">
          Enter your email to receive a password reset link
        </div>

        <form onSubmit={handlePasswordReset} className="forgot-password-form">
          <div className="form-group">
            <TextField
              label="Email ID"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
          </div>

          <Button fullWidth variant="contained" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
