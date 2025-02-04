// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { useLocale } from 'next-intl';

interface MenuItem {
  label: string;
  href: string;
  icon: React.FC;
  children?: MenuItem[];
}

// Custom Icon Components (replace Heroicons)
const HomeIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7a7.003 7.003 0 0110.293 0m0 0l7 7a7.003 7.003 0 01-10.293 0m0 0l-2 2m-2.553-1.342l4.552 4.552a10 10 0 004.312 1.079m-4.312-1.079l4.552 4.552m-1.079-4.312l4.552 4.552m-4.552-4.552l-4.552-4.552"
    ></path>
  </svg>
);

const ShoppingBagIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    ></path>
  </svg>
);

const CogIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 2v2m0 4a2 2 0 100 4m0-4a2 2 0 110 4m0 2v2m-4 6h8m-4-9v5a2 2 0 100-4H8m3 5a2 2 0 100-4H5m-1 14v-5a2 2 0 100-4h6m4 4l-3-3"
    ></path>
  </svg>
);

const ClipboardListIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012 2h2a2 2 0 012-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ></path>
  </svg>
);

const UserIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const KeyIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 7.743L11 9.743a4 4 0 01-5.656 5.656L5.743 15.743a2 2 0 01-2.828-2.828l7.743-7.743A6 6 0 0121 12m-6 2h1.061a1.5 1.5 0 002.121-2.121l-.459-.459m0 0a2 2 0 10-2.828-2.828L17.172 5.172m0 0a6 6 0 01-5.656 5.656L11.743 9.743m-1.81 1.81l-4.553-4.553A2 2 0 013 8.485l4.553 4.553m0 0V20h-7"
    ></path>
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg
    className="w-4 h-4 text-gray-500 transition-transform transform rotate-0 group-hover:rotate-90"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg
    className="w-4 h-4 text-gray-500 transition-transform transform rotate-90 group-hover:rotate-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Products',
    href: '#',
    icon: ShoppingBagIcon,
    children: [
      { label: 'All Products', href: '/products', icon: ShoppingBagIcon },
      { label: 'Add Product', href: '/products/add', icon: ShoppingBagIcon },
    ],
  },
  {
    label: 'Orders',
    href: '/orders',
    icon: ClipboardListIcon,
  },
  {
    label: 'Settings',
    href: '#',
    icon: CogIcon,
    children: [
      { label: 'Profile', href: '/settings/profile', icon: UserIcon },
      { label: 'Account', href: '/settings/account', icon: KeyIcon },
    ],
  },
];

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const locale = useLocale();
  const pathname = usePathname();

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-16';
  const translateX = isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%-4rem)]';

  // Function to construct the localized URL
  const getLocalizedHref = (href: string) => {
      if (href === '#') return href; // Don't localize anchor links

      return `/${locale}${href}`; // Prepend the locale
  };

  // Function to check if the current route is active (with locale check)
  const isActiveRoute = (href: string) => {
    const localizedHref = getLocalizedHref(href);
    return pathname === localizedHref;
  }

  return (
    <div className="relative">
      <div
        className={`bg-gray-900 text-white min-h-screen py-4 px-2  transition-transform duration-300 ${sidebarWidth} ${translateX} md:translate-x-0 absolute md:relative z-0 shadow-lg`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          {isSidebarOpen && (
            <h1 className="text-xl font-semibold text-gray-100 tracking-wider">My App</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded focus:outline-none transition-colors duration-200"
          >
            <svg
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
                d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <div>
                    <button
                      className="group flex items-center justify-between w-full py-2 px-4 rounded hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                      onClick={() => toggleSubMenu(index)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon />
                        {isSidebarOpen && (
                          <span className="text-sm font-medium text-gray-300">{item.label}</span>
                        )}
                      </div>
                      {isSidebarOpen && (openSubMenu === index ? <ChevronDownIcon /> : <ChevronRightIcon />)}
                    </button>
                    {openSubMenu === index && (
                      <ul className="pl-6 mt-1 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              href={getLocalizedHref(child.href)}
                              className={`group block py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-200 ${
                                isActiveRoute(child.href) ? 'bg-gray-700 text-white' : 'text-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <child.icon />
                                {isSidebarOpen && (
                                  <span className="text-sm font-medium group-hover:text-white">{child.label}</span>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={getLocalizedHref(item.href)}
                    className={`group flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-800 focus:outline-none transition-colors duration-200 ${
                      isActiveRoute(item.href)
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300'
                    }`}
                  >
                    <item.icon />
                    {isSidebarOpen && (
                      <span className="text-sm font-medium group-hover:text-white">{item.label}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;