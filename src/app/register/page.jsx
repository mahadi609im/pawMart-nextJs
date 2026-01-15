'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import paw from '../../assets/paw.png';
import paw2 from '../../assets/paw2.png';
import loginBg from '../../assets/listingsFormBg.webp';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '@/context/AuthContextProvider';

const Register = () => {
  const {
    setUser,
    googleLogin,
    isLoading,
    registerAuthCreate,
    updateUserProfile,
  } = useContext(AuthContext);

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

  const handleRegisterAuthCreate = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error('Password must be 6+ chars');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('Use at least one uppercase');
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error('Use at least one lowercase');
      return;
    }

    try {
      const result = await registerAuthCreate(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });
      setUser({ ...result.user, displayName: name, photoURL: photo });
      toast.success('Registration successful!');
      e.target.reset();
      router.push('/');
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleGoogleAuthUser = async () => {
    try {
      const result = await googleLogin();
      setUser(result.user);
      toast.success('Google SignIn successfully');
      router.push('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-10 max-w-md w-full">
        <div className="mb-8 text-center">
          <h3 className="text-base font-bold text-[#fb7b53] relative inline-block">
            Registration
            <Image
              src={paw2}
              alt="paw"
              width={24}
              height={24}
              className="absolute -top-3 -right-5"
            />
          </h3>
          <h2 className="text-3xl font-bold text-slate-950 mt-2">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">
            Sign up to start adding pets or products
          </p>
        </div>

        <form
          onSubmit={handleRegisterAuthCreate}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
          />
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
          <button className="bg-[#fb7b53] text-white font-medium px-6 py-3 rounded-lg hover:bg-orange-500 transition-all">
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleAuthUser}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 text-slate-950 hover:bg-gray-100 transition-all"
          >
            <FcGoogle size={24} /> Sign up with Google
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-[#fb7b53] font-semibold hover:underline"
          >
            Login here
          </a>
        </p>

        <div className="absolute bottom-4 right-4 opacity-40 w-8 h-8">
          <Image src={paw} alt="paw" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
};

export default Register;
