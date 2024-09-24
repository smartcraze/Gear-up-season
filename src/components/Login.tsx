'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation

function Login() {
  // State for capturing input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role
  const router = useRouter();  // Initialize useRouter hook

  // Event handler for form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Hardcoded credentials
    const correctUsername = 'admin';
    const correctPassword = 'password123';

    // Check if the credentials match
    if (username === correctUsername && password === correctPassword) {
      console.log("Login successful with:", { username, password, role });

      // Set some auth data (you can store in cookies, localStorage, etc.)
      localStorage.setItem('isAuthenticated', 'true'); // Example of setting auth state

      // Redirect to the /home route after login
      router.push('/');
    } else {
      console.log("Invalid credentials");
      alert("Invalid username or password"); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 to-indigo-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Authorities Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="mt-1 text-black w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 w-full text-black px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="vendor">distributor 1</option>
              <option value="vendor">distributor 2</option>
              <option value="vendor">distributor 3</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-600">Keep me logged in</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={handleSubmit} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div> 
      </div>
    </div>
  );
}

export default Login;
