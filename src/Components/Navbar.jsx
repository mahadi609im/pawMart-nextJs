'use client';
import { AuthContext } from '@/context/AuthContextProvider';
import Link from 'next/link';
import { useState, useContext } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOutAuthUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutAuthUser()
      .then(() => {
        // ১. কুকি ডিলিট করা
        document.cookie =
          'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log('Logged out and cookie cleared');

        // ২. হোম পেজে রিডাইরেক্ট করা
        window.location.href = '/';
      })
      .catch(error => console.log(error));
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[100] w-full px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          paw<span className="text-orange-500">Mart</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-200">
          <li>
            <Link className="hover:text-orange-500 transition-colors" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors"
              href="/pets"
            >
              Pets & Supplies
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors"
              href="/contact"
            >
              Contact us
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link
                  className="hover:text-orange-500 transition-colors"
                  href="/addListing"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-500 transition-colors"
                  href="/myListing"
                >
                  Manage Products
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-white hover:text-orange-500 transition px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full transition-all shadow-md active:scale-95"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* User Info (ছবি এবং নাম দেখানো) */}
              <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/3S3m6vC/admin.png'}
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-orange-500 object-cover"
                />
                <span className="text-sm text-gray-200 font-medium hidden xl:block">
                  {user?.displayName || 'User'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-red-600 text-white px-5 py-2 rounded-full transition-all border border-white/20 active:scale-95 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
          onClick={() => setOpen(!open)}
        >
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
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          {/* Mobile User Info */}
          {user && (
            <div className="flex items-center gap-3 mb-2 p-3 bg-white/5 rounded-xl">
              <img
                src={user?.photoURL || 'https://i.ibb.co/3S3m6vC/admin.png'}
                alt="profile"
                className="w-10 h-10 rounded-full border border-orange-500"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium">
                  {user?.displayName}
                </span>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
            </div>
          )}

          <Link
            onClick={() => setOpen(false)}
            href="/"
            className="text-lg text-white hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/pets"
            className="text-lg text-white hover:text-orange-500"
          >
            Pets & Supplies
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            className="text-lg text-white hover:text-orange-500"
          >
            Contact us
          </Link>

          <hr className="border-white/10" />

          {user ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                href="/addListing"
                className="text-white hover:text-orange-500"
              >
                Add Product
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/myListing"
                className="text-white hover:text-orange-500"
              >
                Manage Products
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-600/20 text-red-500 border border-red-600/30 rounded-xl font-semibold mt-4"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full text-center py-3 bg-white/5 text-white rounded-xl border border-white/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="w-full text-center py-3 bg-orange-600 text-white rounded-xl font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
