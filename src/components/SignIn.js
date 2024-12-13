import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style Folder/SignIn.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to check if form is submitted
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example sign-in logic, replace this with actual authentication logic
    if (email === 'manish.sviet02@gmail.com' && password === 'patna@2105') {
      setSubmitted(true); // Successful submission
      setErrorMessage(''); // Clear any previous error messages
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="sign-in-container">
      {/* Bootstrap Success Alert */}
      {submitted && (
        <div className="alert alert-success" role="alert">
           Sign In is Successful! Welcome Website, {email}!
          <Link to="/" className="alert-link"> Go to Home</Link>
        </div>
      )}

      {/* Bootstrap Error Alert */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {!submitted && (
        <>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
          <p>Don't have an account? <Link to="/signup"> Sign Up</Link></p>
        </>
      )}
    </div>
  );
};

export default SignIn;
