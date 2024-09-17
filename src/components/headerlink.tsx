import React from 'react';

function HeaderLink() {
  return (
    <div className="bg-blue-600 p-2">
      <ul className="flex space-x-6">
        <li>
          <a href="#" className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300">
            link1
          </a>
        </li>
        <li>
          <a href="#" className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300">
            link2
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HeaderLink;
