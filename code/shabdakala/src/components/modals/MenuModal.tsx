import React, { useState, FC } from 'react';

const DropdownComponent: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={toggleDropdown}
      >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 mr-4 cursor-pointer dark:stroke-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
    </button>

      {isDropdownOpen && (
        <div className="absolute mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                role="menuitem"
              >
                Option 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                role="menuitem"
              >
                Option 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                role="menuitem"
              >
                Option 3
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
