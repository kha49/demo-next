// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { useLocale } from 'next-intl';
import {ArrowBack, Filter, FilterAlt} from '@mui/icons-material';

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-16';
  // const translateX = isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%-4rem)]';

  const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-0';
  const translateX = isSidebarOpen ? 'translate-x-0' : 'translate-x-[-100%]';
  return (
    <div className="relative">
      <div
        className={`bg-gray-200 text-white min-h-screen py-4  transition-transform duration-300 ${sidebarWidth} ${translateX} md:translate-x-0 absolute md:relative z-20 shadow-lg`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          {isSidebarOpen && (
            <h1 className="text-xl font-semibold text-gray-900 tracking-wider">Filters</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded focus:outline-none transition-colors duration-200"
          >
            {/* <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M3 4h18M3 12h18M3 20h18'}
              ></path>
            </svg> */}
            {isSidebarOpen? <ArrowBack /> : <FilterAlt sx={{backgroundColor:'green'}}/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;