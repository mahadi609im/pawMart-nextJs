'use client';
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Newsletter = () => {
  const handleSubscribe = e => {
    e.preventDefault();
    const email = e.target.email.value;

    if (email) {
      Swal.fire({
        title: 'Subscribed!',
        text: 'Thank you for joining our newsletter. Stay tuned for paw-some updates!',
        icon: 'success',
        confirmButtonColor: '#fb7b53',
      });
      e.target.reset();
    }
  };

  return (
    <section className="py-10 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#fb7b53] bg-slate-900/20 p-8 md:p-16">
          {/* Background Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fb7a5315] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fb7a5315] rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-[#fb7b53] font-bold text-lg mb-4 uppercase tracking-widest">
              Join Our Community
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-100 titleFont mb-6 leading-tight">
              Get the Latest Pet Updates <br />
              <span className="text-[#fb7b53]">& Exclusive Offers!</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter and stay updated with new pet
              listings, care tips, and special discounts on premium pet food.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#fb7b53] transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#fb7b53] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#e06a45] transform hover:scale-105 transition-all shadow-lg shadow-[#fb7b53]/20"
              >
                Subscribe <FaPaperPlane className="text-sm" />
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
