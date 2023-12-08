import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      alert("Username or email and password are required");
      return
    }
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      // const responseuser = await response.clone();
      const data = await response.json();

      if (!response.ok) {
        console.error('Network response was not ok:', response.status);
        // Handle specific error scenarios
        if (response.status === 400) {
          // Bad Request - Invalid data or duplicate email
          alert(data.message);
        } else if (response.status === 401) {
          // Unauthorized - Invalid credentials
          console.error('Error details:', data);
          alert("Invalid credentials");
        } else {
          // Other errors
          alert('An error occurred during signup');
        }
      } else {
        const usernameFromResponse = usernameOrEmail;
        navigate('/dashboard', { state: { username: usernameFromResponse } });
      }
    } catch (error) {
      console.error('Error during login:', error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h1>
        </div>
        <form className="mt-8 space-y-6">
          <input
            type="text"
            autoComplete="off"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <Link to="/signup" className="text-sm text-indigo-600">
            Don't have an account? Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
