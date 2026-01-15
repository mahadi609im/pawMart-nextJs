'use client';
import React from 'react';
import {
  FaShieldAlt,
  FaUserCheck,
  FaHandshake,
  FaFileContract,
} from 'react-icons/fa';

const termsList = [
  {
    title: 'Adoption Agreement',
    desc: 'By adopting, you agree to provide a safe, loving, and permanent home for the pet. PawMart reserves the right to verify living conditions.',
    icon: <FaHandshake />,
  },
  {
    title: 'Safe Payments',
    desc: 'All transactions for premium pet food and accessories are encrypted. We ensure 100% secure payment processing for our community.',
    icon: <FaShieldAlt />,
  },
  {
    title: 'User Responsibility',
    desc: 'Users must provide accurate information when listing a pet or product. Misleading descriptions may lead to account suspension.',
    icon: <FaUserCheck />,
  },
  {
    title: 'Privacy Policy',
    desc: 'Your personal data is safe with us. We never share your contact information with third parties without your explicit consent.',
    icon: <FaFileContract />,
  },
];

const Terms = () => {
  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Illustration or Visual Area */}
          <div className="lg:w-5/12 relative order-2 lg:order-1">
            <div className="relative z-10 border-2 border-dashed border-[#fb7b53] rounded-3xl p-6 bg-slate-900/40 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop"
                alt="Pet Safety"
                className="rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#fb7b53] p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-white font-bold text-xl uppercase tracking-tighter italic">
                  Verified Security
                </p>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#fb7a5320] rounded-full blur-[100px] -z-0"></div>
          </div>

          {/* Right Side: Text Content */}
          <div className="lg:w-7/12 order-1 lg:order-2">
            <h3 className="text-[#fb7b53] font-bold text-lg mb-2 flex items-center gap-2">
              <span className="w-10 h-[2px] bg-[#fb7b53]"></span> Trust & Policy
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-8 titleFont leading-tight">
              Our Commitment to <br />
              <span className="text-[#fb7b53]">Safety & Quality.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {termsList.map((term, index) => (
                <div key={index} className="group transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fb7a5315] border border-dashed border-[#fb7b53] flex items-center justify-center text-[#fb7b53] group-hover:bg-[#fb7b53] group-hover:text-white transition-all">
                      {term.icon}
                    </div>
                    <h4 className="font-bold text-slate-200 text-lg">
                      {term.title}
                    </h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400">
                    {term.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-slate-400 text-sm italic">
              * Note: By using PawMart, you automatically agree to our updated
              terms and conditions as of 2026.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
