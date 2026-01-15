'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

import paw from '../../assets/paw.png';
import paw2 from '../../assets/paw2.png';
import loginBg from '../../assets/listingsFormBg.webp';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { AuthContext } from '@/context/AuthContextProvider';

const Login = () => {
  const { signInAuthUser, googleLogin, setUser, isLoading } =
    useContext(AuthContext);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen h-full bg-[#0c062e]">
        <main className="flex-1 min-h-[80vh] h-full flex justify-center items-center">
          <h3>Loading...</h3>
        </main>
      </div>
    );
  }

  const handleSignInAuthUser = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInAuthUser(email, password)
      .then(result => {
        setUser(result.user);
        toast.success('Login successfully');
        e.target.reset();
        router.push('/');
      })
      .catch(err => {
        let message = '';
        if (err.code === 'auth/user-disabled') message = 'Account disabled.';
        else if (err.code === 'auth/user-not-found')
          message = 'No account found. Please register.';
        else if (err.code === 'auth/wrong-password')
          message = 'Incorrect password.';
        else message = 'Something went wrong. Please try again.';
        toast.error(message);
      });
  };

  const handleGoogleAuthUser = () => {
    googleLogin()
      .then(result => {
        setUser(result.user);
        toast.success('Google SignIn successfully');
        router.push('/');
      })
      .catch(error => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      {/* Form Container */}
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-10 max-w-md w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="text-base font-bold text-[#fb7b53] relative inline-block">
            Login Now
            <Image
              src={paw2}
              alt="paw"
              width={24}
              height={24}
              className="absolute -top-3 -right-5"
            />
          </h3>
          <h2 className="text-3xl font-bold text-slate-950 mt-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mt-2">
            Please login to access your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignInAuthUser} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#fb7b53] text-white font-medium px-6 py-3 rounded-lg hover:bg-orange-500 transition-all"
          >
            Login
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleAuthUser}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 text-slate-950 hover:bg-gray-100 transition-all"
          >
            <FcGoogle size={24} /> Login with Google
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-600 text-sm mt-6 text-center">
          Dont have an account?{' '}
          <Link
            href="/register"
            className="text-[#fb7b53] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>

        {/* Paw Decoration */}
        <div className="absolute bottom-4 right-4 opacity-40 w-8 h-8">
          <Image src={paw} alt="paw" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
