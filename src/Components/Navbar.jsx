'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ১. পেজ লোড হলে এবং প্রতি ১ সেকেন্ড পর পর চেক করা ইউজার লগইন আছে কি না
  useEffect(() => {
    const checkUser = () => {
      const isAuth = document.cookie.includes('auth=true');
      if (isAuth) {
        // মক ইউজার ডাটা সেট করা হচ্ছে
        setUser({
          displayName: 'Admin',
          photoURL: 'https://i.ibb.co.com/kZM1hPc/home3-hero.webp',
          email: 'admin.maha@gmail.com',
        });
      } else {
        setUser(null);
      }
    };

    checkUser(); // সাথে সাথে চেক করবে
    const interval = setInterval(checkUser, 1000); // কুকি চেঞ্জ হলে আপডেট করার জন্য
    return () => clearInterval(interval);
  }, []);

  // ২. লগআউট হ্যান্ডলার (সম্পূর্ণ Mock Logic)
  const handleLogout = () => {
    // কুকি ডিলিট করার নিয়ম (expire date অতীতে সেট করা)
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(null);
    setOpen(false);

    // হোম পেজে পাঠিয়ে হার্ড রিলোড দেওয়া যাতে স্টেট ক্লিয়ার হয়
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-[100] w-full px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          paw<span className="text-orange-500">Mart</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center space-x-8 font-medium text-gray-200">
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

          {/* ইউজার লগইন থাকলে এই লিঙ্কগুলো দেখা যাবে */}
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

          {/* Contact us সবসময় শেষে থাকবে */}
          <li>
            <Link
              className="hover:text-orange-500 transition-colors"
              href="/contact"
            >
              Contact us
            </Link>
          </li>
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <Link
              href="/login"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-full transition-all shadow-md active:scale-95 font-semibold"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-orange-500 object-cover"
                />
                <span className="text-sm text-gray-200 font-medium hidden xl:block">
                  {user.displayName}
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
          {user && (
            <div className="flex items-center gap-3 mb-2 p-3 bg-white/5 rounded-xl">
              <img
                src={user.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full border border-orange-500"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium">
                  {user.displayName}
                </span>
                <span className="text-xs text-gray-400">{user.email}</span>
              </div>
            </div>
          )}

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

          {user && (
            <>
              <Link
                onClick={() => setOpen(false)}
                href="/addListing"
                className="text-lg text-white"
              >
                Add Product
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/myListing"
                className="text-lg text-white"
              >
                Manage Products
              </Link>
            </>
          )}

          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            className="text-lg text-white border-b border-white/5 pb-2"
          >
            Contact us
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-600/20 text-red-500 border border-red-600/30 rounded-xl font-semibold mt-4"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="w-full text-center py-3 bg-orange-600 text-white rounded-xl font-bold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
