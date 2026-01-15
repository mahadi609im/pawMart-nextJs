import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about a pet or our services? We are here to help.
            Send us a message and well respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="flex items-center p-6 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl border border-gray-100 dark:border-zinc-800">
              <div className="bg-orange-100 dark:bg-orange-500/10 p-3 rounded-xl mr-5">
                <Phone className="text-orange-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <h4 className="text-lg font-semibold dark:text-white">
                  +880 1609 216725
                </h4>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl border border-gray-100 dark:border-zinc-800">
              <div className="bg-orange-100 dark:bg-orange-500/10 p-3 rounded-xl mr-5">
                <Mail className="text-orange-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Us</p>
                <h4 className="text-lg font-semibold dark:text-white">
                  maha609im@gmail.com
                </h4>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl border border-gray-100 dark:border-zinc-800">
              <div className="bg-orange-100 dark:bg-orange-500/10 p-3 rounded-xl mr-5">
                <MapPin className="text-orange-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Visit Us</p>
                <h4 className="text-lg font-semibold dark:text-white">
                  Gazipur, Dhaka, Bangladesh
                </h4>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
