'use client';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  const { signInAuthUser, googleLogin, setUser, isLoading } =
    useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // --- ১. Mock Login Functionality ---
    if (email === 'admin.maha@gmail.com' && password === '123456') {
      document.cookie = 'auth=true; path=/; max-age=86400';

      setUser({
        email: 'admin.maha@gmail.com',
        displayName: 'Admin User',
        photoURL: 'https://i.ibb.co.com/kZM1hPc/home3-hero.webp',
      });

      toast.success('Admin Login successful!');
      router.push('/pets');
      return;
    }

    // --- ২. Firebase Login Functionality ---
    try {
      const result = await signInAuthUser(email, password);

      document.cookie = 'auth=true; path=/; max-age=86400';

      setUser(result.user);
      toast.success('Login successful!');
      router.push('/pets');
    } catch (err) {
      console.error(err);
      let message = 'Something went wrong. Please try again.';

      // Firebase specific error messages
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/invalid-credential'
      ) {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      }

      toast.error(message);
    }
  };

  const handleGoogleAuthUser = async () => {
    try {
      const result = await googleLogin();

      document.cookie = 'auth=true; path=/; max-age=86400';

      setUser(result.user);
      toast.success('Google SignIn successful!');
      router.push('/pets');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Google Sign In failed');
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
          onClick={handleGoogleAuthUser}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 text-slate-950 hover:bg-gray-100 transition-all active:scale-95 shadow-sm"
        >
          <FcGoogle size={24} /> Login with Google
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
