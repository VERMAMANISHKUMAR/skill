import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import '../Style Folder/SingUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false); // State for success message

  const navigate = useNavigate();  // Hook for navigating to another page

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple password match validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate a successful signup (replace this with actual signup logic)
    console.log({ email, password });

    setError(null); // Clear any previous errors
    setSubmitted(true); // Mark form as successfully submitted

    // Simulate redirect to sign-in after a brief delay (2 seconds)
    setTimeout(() => {
      navigate('/signin');  // Redirect to sign-in page
    }, 2000);
  };

  return (
    <div className="sign-up-container">
      {/* Success Message */}
      {submitted ? (
        <div className="success-message">
          <h2>Sign Up Successful!</h2>
          <p>You will be redirected to the Sign In page shortly.</p>
        </div>
      ) : (
        <>
        <div className='sign-header'><h2>Sign Up</h2></div>
          
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
          {/* <div className='input-box'>
              <label>Full Name</label>
              <input
                type="name"
                value={Text}
                placeholder='Enter your full name'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}
            <div className='input-box'>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                placeholder='Enter email address'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input-box'>
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='input-box'>
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </>
      )}
    </div>
  );
};

export default SignUp;
