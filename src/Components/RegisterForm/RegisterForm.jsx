'use client';
import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link'; // 'a' ট্যাগ এর বদলে Link ব্যবহার করা ভালো

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
  const handleRegisterAuthCreate = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;

    // পাসওয়ার্ড ভ্যালিডেশন
    if (password.length < 6) {
      toast.error('Password must be 6+ characters');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('Must include at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error('Must include at least one lowercase letter');
      return;
    }

    try {
      // ১. ফায়ারবেসে ইউজার তৈরি করা
      const result = await registerAuthCreate(email, password);

      // ২. ইউজারের নাম ও ছবি আপডেট করা
      await updateUserProfile({ displayName: name, photoURL: photo });

      // ৩. ব্রাউজারে কুকি সেট করা (Middleware এর জন্য)
      document.cookie = 'auth=true; path=/; max-age=86400';

      // ৪. গ্লোবাল স্টেট আপডেট করা
      setUser({ ...result.user, displayName: name, photoURL: photo });

      toast.success('Registration successful!');
      e.target.reset();
      router.push('/pets'); // সাকসেস হলে আইটেম লিস্ট পেজে রিডাইরেক্ট
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Registration failed. Try again.');
    }
  };

  // --- গুগল দিয়ে সাইন আপ ---
  const handleGoogleAuthUser = async () => {
    try {
      const result = await googleLogin();

      // কুকি সেট করা
      document.cookie = 'auth=true; path=/; max-age=86400';

      setUser(result.user);
      toast.success('Google Sign Up successful!');
      router.push('/pets');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Google Sign Up failed.');
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
