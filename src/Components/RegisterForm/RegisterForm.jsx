'use client';
import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // 'a' ট্যাগ এর বদলে Link ব্যবহার করা ভালো
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const {
    setUser,
    googleLogin,
    isLoading,
    registerAuthCreate,
    updateUserProfile,
  } = useContext(AuthContext);

  const router = useRouter();

  // লোডিং স্টেট ডিজাইন
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fb7b53]"></div>
      </div>
    );
  }

  // --- ইমেইল ও পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন ---

  // --- Email/Password Registration ---
  const handleRegisterAuthCreate = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;

    // Password Validations with SweetAlert2
    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Short Password',
        text: 'Password must be at least 6 characters long.',
        confirmButtonColor: '#fb7b53',
      });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Include at least one uppercase letter.',
        confirmButtonColor: '#fb7b53',
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Include at least one lowercase letter.',
        confirmButtonColor: '#fb7b53',
      });
      return;
    }

    try {
      const result = await registerAuthCreate(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });

      // Set Cookie for Middleware
      document.cookie = 'auth=true; path=/; max-age=86400';

      setUser({ ...result.user, displayName: name, photoURL: photo });

      // Success Message
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to pawMart family.',
        timer: 2000,
        showConfirmButton: false,
      });

      e.target.reset();
      router.push('/pets');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#fb7b53',
      });
    }
  };

  // --- Google Sign Up ---
  const handleGoogleAuthUser = async () => {
    try {
      const result = await googleLogin();

      // Set Cookie for Middleware
      document.cookie = 'auth=true; path=/; max-age=86400';

      setUser(result.user);

      // Success Message
      Swal.fire({
        icon: 'success',
        title: 'Google Sign In Successful!',
        text: 'Redirecting to pet list...',
        timer: 1500,
        showConfirmButton: false,
      });

      router.push('/pets');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Sign In Failed',
        text: err.message || 'Google Sign Up failed.',
        confirmButtonColor: '#fb7b53',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleRegisterAuthCreate} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none placeholder-gray-500"
        />
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
          Register Account
        </button>

        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-xs text-gray-500 uppercase">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuthUser}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 text-slate-950 hover:bg-gray-100 transition-all active:scale-95 shadow-sm"
        >
          <FcGoogle size={24} /> Sign up with Google
        </button>
      </form>

      <p className="text-gray-600 text-sm mt-6 text-center">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-[#fb7b53] font-semibold hover:underline"
        >
          Login here
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
