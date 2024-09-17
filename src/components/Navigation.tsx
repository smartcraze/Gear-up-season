'use client';
import React, { useState } from 'react';
import { Home, User, Settings } from 'lucide-react';

function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
        <img className='h-14 w-14' src="/logo.png" alt="" />
        </a>
        <ul className="flex space-x-4 relative">
          <li>
            <a href="/home" className="flex items-center hover:text-gray-300">
              <Home className="mr-1" size={18} />
              Home
            </a>
          </li>

            {isDropdownOpen && (
              <ul className="absolute top-full left-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-lg">
                <li>
                  <a 
                    href="/profile/settings" 
                    className="block px-4 py-2 hover:bg-gray-600 whitespace-nowrap"
                  >
                    Distribution Areas Wise
                  </a>
                </li>
                <li>
                  <a 
                    href="/profile/logout" 
                    className="block px-4 py-2 hover:bg-gray-600 whitespace-nowrap"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          {/* Profile with Dropdown */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center hover:text-gray-300 focus:outline-none"
            >
              <User className="mr-1" size={18} />
              Profile
            </button>

            {/* Dropdown Menu */}
          </li>

          <li>
            <a href="/login" className="flex items-center hover:text-gray-300">
              <Settings className="mr-1" size={18} />
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
