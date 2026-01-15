import React, { useContext } from 'react';
import Image from 'next/image';

import paw from '../../assets/paw.png';
import paw2 from '../../assets/paw2.png';
import { AuthContext } from '@/context/AuthContextProvider';
import LoginForm from '@/Components/LoginForm/LoginForm';

const Login = () => {
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
        <LoginForm></LoginForm>

        {/* Paw Decoration */}
        <div className="absolute bottom-4 right-4 opacity-40 w-8 h-8">
          <Image src={paw} alt="paw" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
