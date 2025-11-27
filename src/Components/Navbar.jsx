'use client';
import { AuthContext } from '@/context/AuthContextProvider';
import Link from 'next/link';
import { useState, useContext } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, signOutAuthUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutAuthUser()
      .then(res => console.log(res))
      .catch(error => console.log(error));
    setUserMenu(false);
  };

  return (
    <nav className="bg-base-100 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          paw<span className="text-orange-500">Mart</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li>
            <Link className="hover:text-orange-500" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500" href="/pets">
              Pets & Supplies
            </Link>
          </li>
        </ul>

        {/* Desktop Auth Buttons / User Dropdown */}
        <div className="hidden lg:flex items-center space-x-3 relative">
          {!user ? (
            <>
              <Link href="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 
               bg-white dark:bg-slate-800 text-slate-950 dark:text-white 
               hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                {user.displayName || 'User'}
                <svg
                  className={`h-4 w-4 transition-transform ${
                    userMenu ? 'rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {userMenu && (
                <ul
                  className="absolute right-0 mt-2 rounded-md w-48 py-2 space-y-2 z-50 
                   bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                   shadow-lg"
                >
                  <li>
                    <Link
                      href="/addListing"
                      className="block px-4 py-2 text-slate-950 dark:text-white hover:bg-orange-100 dark:hover:bg-orange-600 transition"
                      onClick={() => setUserMenu(false)}
                    >
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/myListing"
                      className="block px-4 py-2 text-slate-950 dark:text-white hover:bg-orange-100 dark:hover:bg-orange-600 transition"
                      onClick={() => setUserMenu(false)}
                    >
                      Manage Products
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-slate-950 dark:text-white hover:bg-orange-100 dark:hover:bg-orange-600 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <ul className="flex flex-col mt-4 space-y-3 lg:hidden font-medium">
          <li>
            <Link className="hover:text-orange-500" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500" href="/pets">
              Pets & Supplies
            </Link>
          </li>

          {!user ? (
            <>
              <Link href="/login" className="btn btn-outline btn-sm w-full">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm w-full">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/addListing"
                className="hover:text-orange-500 w-full block"
              >
                Add Product
              </Link>
              <Link
                href="/myListing"
                className="hover:text-orange-500 w-full block"
              >
                Manage Products
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm w-full"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
