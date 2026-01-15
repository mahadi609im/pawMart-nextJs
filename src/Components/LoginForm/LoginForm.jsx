'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // --- ১. Auto-fill Function ---
  const handleAutoFill = () => {
    const emailField = document.querySelector('input[name="email"]');
    const passwordField = document.querySelector('input[name="password"]');
    if (emailField && passwordField) {
      emailField.value = 'admin.maha@gmail.com';
      passwordField.value = '123456';
    }
  };

  // --- ২. Login Handler (Direct Mock Logic) ---
  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'admin.maha@gmail.com' && password === '123456') {
      document.cookie = 'auth=true; path=/; max-age=86400';

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back, Admin!',
        timer: 1000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = '/pets';
      }, 1000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password.',
        confirmButtonColor: '#fb7b53',
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fb7b53]"></div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none placeholder-gray-500"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none placeholder-gray-500"
        />

        <button
          type="submit"
          className="bg-[#fb7b53] text-white font-medium px-6 py-3 rounded-lg hover:bg-orange-500 transition-all active:scale-95 shadow-md"
        >
          Login
        </button>

        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-xs text-gray-400 uppercase">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="flex items-center justify-center gap-2 border-2 border-[#fb7b53] border-dashed rounded-lg p-3 text-[#fb7b53] hover:bg-[#fb7b53] hover:text-white cursor-pointer font-semibold transition-all active:scale-95 shadow-sm"
        >
          Auto-fill Mock Admin
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Do not have an account?{' '}
          <Link
            href="/register"
            className="text-[#fb7b53] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>

        {/* Helper text for reviewers */}
        <div className="mt-4 p-2 bg-gray-50 rounded-md border border-dashed border-gray-200">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
            Mock Credentials:
          </p>
          <p className="text-[11px] text-gray-500 font-mono">
            admin.maha@gmail.com / 123456
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
