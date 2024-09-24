'use client';
import React from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation

function RedirectButtons() {
  const router = useRouter();  // Initialize useRouter hook

  // Function to handle redirection
  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-800 to-blue-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Choose an Action</h2>
        
        {/* Button 1 */}
        <button 
          onClick={() => handleRedirect('/model1')}
          className="w-full mb-4 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Total prediction model
        </button>

        {/* Button 2 */}
        <button 
          onClick={() => handleRedirect('/model2')}
          className="w-full mb-4 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Domestic Model
        </button>

        {/* Button 3 */}
        <button 
          onClick={() => handleRedirect('/model3')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Commercial Model
        </button>
      </div>
    </div>
  );
}

export default RedirectButtons;
