'use client';

import Image from 'next/image';

import paw from '../../assets/paw.png';
import paw2 from '../../assets/paw2.png';
import RegisterForm from '@/Components/RegisterForm/RegisterForm';

const Register = () => {
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
        <RegisterForm></RegisterForm>
        <div className="absolute bottom-4 right-4 opacity-40 w-8 h-8">
          <Image src={paw} alt="paw" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
};

export default Register;
