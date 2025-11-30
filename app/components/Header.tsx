"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";

// Mock store for now
const useCartStore = () => ({
  pendingOrders: 0,
  clearNotifications: () => {},
});

const menuData = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const { pendingOrders, clearNotifications } = useCartStore();
  const location = useLocation();

  const handleOrderClick = () => {
    clearNotifications();
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center">
              <img
                width={28}
                height={28}
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-7 w-auto sm:h-8"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuData.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname === item.href
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Cart Link - Desktop */}
            <Link
              to="/cart"
              onClick={handleOrderClick}
              className="relative flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span>Order</span>
              {pendingOrders > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingOrders}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden border-t border-gray-200">
        <div className="space-y-1 pb-3 pt-2 px-2">
          {menuData.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={`block py-3 px-3 text-base font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.name}
            </DisclosureButton>
          ))}

          {/* Cart Link - Mobile */}
          <DisclosureButton
            as={Link}
            to="/cart"
            onClick={handleOrderClick}
            className="relative flex items-center space-x-3 py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Cart</span>
            {pendingOrders > 0 && (
              <span className="absolute top-2 left-8 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {pendingOrders}
              </span>
            )}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
