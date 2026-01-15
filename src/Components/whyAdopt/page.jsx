'use client';
import React from 'react';
import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaSmileBeam,
  FaCheckCircle,
} from 'react-icons/fa';

const features = [
  {
    title: 'Save a Life',
    desc: 'Every year, millions of pets are left homeless. By adopting, you give a second chance to a soul in need.',
    icon: <FaHeartbeat />,
  },
  {
    title: 'Unconditional Love',
    desc: 'Adopted pets often show immense gratitude and loyalty, forming an unbreakable bond with their new family.',
    icon: <FaSmileBeam />,
  },
  {
    title: 'Healthier Choice',
    desc: 'Most shelter pets are already vaccinated and health-checked, saving you initial medical costs and worries.',
    icon: <FaCheckCircle />,
  },
  {
    title: 'Stop Cruelty',
    desc: 'Adopting helps fight against unethical breeding mills and supports community rescue efforts.',
    icon: <FaHandHoldingHeart />,
  },
];

const WhyAdopt = () => {
  return (
    <section className="py-10 bg-black text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side: Content */}
          <div className="lg:w-1/2">
            <h3 className="text-[#fb7b53] font-bold text-lg mb-2 flex items-center gap-2">
              <span className="w-10 h-[2px] bg-[#fb7b53]"></span>
              Adoption Awareness
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 titleFont leading-tight">
              Because Every Pet <br />
              <span className="text-[#fb7b53]">Deserves Love.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
              Adopting a pet is a life-changing experience. Not just for the
              pet, but for you too. At PawMart, we ensure every adoption is a
              match made in heaven.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-dashed hover:border-[#fb7b53] hover:bg-[#fb7a5305] transition-all duration-300"
                >
                  <div className="text-[#fb7b53] text-2xl mt-1 shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">
                      {f.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-500 leading-snug mt-1">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-dashed border-[#fb7b53] p-4 bg-gray-50 dark:bg-slate-900 shadow-2xl transition-colors duration-300">
              <img
                src="https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=1000&auto=format&fit=crop"
                alt="Happy Adopted Dog"
                className="rounded-xl w-full object-cover h-[450px] brightness-90 dark:brightness-75 transition-all"
              />

              {/* Floating Status Card */}
              <div className="absolute bottom-10 left-10 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border-l-4 border-[#fb7b53] transform hover:scale-105 transition-transform">
                <p className="text-[#fb7b53] font-bold text-2xl">2,500+</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                  Pets Adopted Yearly
                </p>
              </div>
            </div>

            {/* Decorative Glow Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#fb7a5320] rounded-full blur-[80px] -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
