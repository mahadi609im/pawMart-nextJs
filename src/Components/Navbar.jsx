'use client';
import { AuthContext } from '@/context/AuthContextProvider';
import Link from 'next/link';
import { useState, useContext } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOutAuthUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutAuthUser()
      .then(res => console.log(res))
      .catch(error => console.log(error));
    setOpen(false);
  };

  return (
    /* ১. bg-black/70: ব্যাকগ্রাউন্ড ৭০% ট্রান্সপারেন্ট করা হয়েছে।
       ২. backdrop-blur-md: নিচের কন্টেন্টগুলোকে ব্লার দেখাবে।
       ৩. border-b border-white/10: নিচে একটি হালকা বর্ডার দেওয়া হয়েছে।
    */
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

        {/* Desktop Auth */}
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
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-red-600 text-white px-5 py-2 rounded-full transition-all border border-white/20 active:scale-95"
            >
              Logout
            </button>
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

      {/* Mobile Menu (Glassmorphism Effect) */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <Link
            onClick={() => setOpen(false)}
            href="/"
            className="text-lg text-white"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/pets"
            className="text-lg text-white"
          >
            Pets & Supplies
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            className="text-lg text-white"
          >
            Contact us
          </Link>
          <hr className="border-white/10" />
          {user ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                href="/addListing"
                className="text-white"
              >
                Add Product
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/myListing"
                className="text-white"
              >
                Manage Products
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-600/20 text-red-500 border border-red-600/30 rounded-xl font-semibold"
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
