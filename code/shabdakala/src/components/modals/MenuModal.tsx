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
        className="px-4 py-2 text-white rounded"
        onClick={toggleDropdown}
      >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
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
        <div className="absolute mt-2 w-56 dark:bg-slate-800 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li>
              <a
                href="http://www.shabdak.com"
                className="block dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                role="menuitem"
              >
               नवे शब्दक
              </a>
            </li>
            <li>
              <a
                href="http://hindi.shabdak.com"
                className="block dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                role="menuitem"
              >
                शब्दक - हिन्दी
              </a>
            </li>
            <li>
              <a
                href="http://shabdak1.shabdak.com"
                className="block dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                role="menuitem"
              >
                सदाबहार शब्दक-१
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
