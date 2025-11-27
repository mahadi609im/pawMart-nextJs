'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import paw2 from '../../assets/paw2.png';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import PrivateRoutes from '@/Components/Private/PrivateRoute';

const MyListing = () => {
  const router = useRouter();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch dynamic listings
  useEffect(() => {
    fetch('https://paw-mart-server-smoky.vercel.app/listings')
      .then(res => res.json())
      .then(data => {
        setMyListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔹 Delete listing function
  const handleDeleteListings = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://paw-mart-server-smoky.vercel.app/listings/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire(
                'Deleted!',
                'Your listing has been deleted.',
                'success'
              );
              setMyListings(prev => prev.filter(el => el._id !== id));
            }
          })
          .catch(err => console.error(err));
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <PrivateRoutes>
      <div className="container mx-auto px-[3%] md:px-0 pt-20 mb-20">
        <div className="flex flex-col mb-8 space-y-2">
          <div className="flex">
            <h3 className="text-base font-bold text-[#fb7b53] items-center gap-2 relative inline-block">
              My Listings
              <Image
                src={paw2}
                alt="paw"
                width={24}
                height={24}
                className="absolute -top-3 -right-5"
              />
            </h3>
          </div>
          <h2 className="titleFont text-slate-950 dark:text-slate-100 text-3xl md:text-4xl font-bold">
            Manage all pets & products here.
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl border border-dashed border-[#fb7b53] bg-white dark:bg-transparent">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-[#fb7a5331] text-[#fb7b53]">
              <tr>
                <th className="py-3 px-6 font-semibold">Image</th>
                <th className="py-3 px-6 font-semibold">Name</th>
                <th className="py-3 px-6 font-semibold">Category</th>
                <th className="py-3 px-6 font-semibold">Price</th>
                <th className="py-3 px-6 font-semibold">Date</th>
                <th className="py-3 px-6 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myListings.length === 0 ? (
                <tr className="flex justify-center items-center">
                  <td colSpan={6} className="py-20 text-center">
                    <h3 className="text-lg font-semibold text-[#fb7b53] relative inline-block mx-auto">
                      No listings available
                      <Image
                        src={paw2}
                        alt="paw"
                        width={24}
                        height={24}
                        className="absolute -top-3 -right-5"
                      />
                    </h3>
                  </td>
                </tr>
              ) : (
                myListings.map(item => (
                  <tr
                    key={item._id}
                    className="shadow-sm hover:bg-[#fb7a5315] hover:shadow transition-all duration-200"
                  >
                    <td className="py-3 px-6">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-dashed border-[#fb7b53]"
                        />
                      )}
                    </td>

                    <td className="py-3 px-6 font-medium text-gray-800 dark:text-slate-200">
                      {item.name}
                    </td>

                    <td className="py-3 px-6 text-gray-500">{item.category}</td>

                    <td className="py-3 px-6 font-semibold text-gray-700 dark:text-slate-300">
                      {item.price === 0 || item.price === ''
                        ? 'Free Adoption'
                        : `৳${item.price}`}
                    </td>

                    <td className="py-3 px-6 text-gray-500 dark:text-slate-400">
                      {item.date}
                    </td>

                    <td className="py-3 px-6 flex items-center justify-center gap-3">
                      <div
                        onClick={() => router.push(`/details/${item._id}`)}
                        className="text-[#fb7b53] transform transition-transform duration-300 w-10 h-10 rounded-full bg-[#fb7a5331] border border-dashed hover:bg-[#fb7b53] hover:text-white hover:border-2 flex justify-center items-center cursor-pointer"
                      >
                        <FaEye size={18} />
                      </div>

                      <div
                        onClick={() => handleDeleteListings(item._id)}
                        className="text-[#fb7b53] transform transition-transform duration-300 w-10 h-10 rounded-full bg-[#fb7a5331] border border-dashed hover:bg-[#fb7b53] hover:text-white hover:border-2 flex justify-center items-center cursor-pointer"
                      >
                        <FaTrashAlt size={16} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {myListings.length < 1 ? (
            <div className="py-20 text-center border border-dashed border-[#fb7b53] rounded-xl shadow bg-white dark:bg-transparent">
              <h3 className="text-lg font-semibold text-[#fb7b53] relative inline-block mx-auto">
                No listings available
                <Image
                  src={paw2}
                  alt="paw"
                  width={24}
                  height={24}
                  className="absolute -top-3 -right-5"
                />
              </h3>
            </div>
          ) : (
            myListings.map(item => (
              <div
                key={item._id}
                className="border border-dashed border-[#fb7b53] rounded-xl p-4 shadow hover:shadow-lg transition-all bg-[#fb7a5331]"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border border-dashed border-[#fb7b53]"
                    />
                  )}

                  <div className="flex flex-col space-y-1 text-slate-800 dark:text-slate-300">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p>
                      <span className="font-semibold text-[#fb7b53]">
                        Category:
                      </span>{' '}
                      {item.category}
                    </p>
                    <p>
                      <span className="font-semibold text-[#fb7b53]">
                        Price:
                      </span>{' '}
                      {item.price === 0 || item.price === ''
                        ? 'Free Adoption'
                        : `৳${item.price}`}
                    </p>
                    <p>
                      <span className="font-semibold text-[#fb7b53]">
                        Date:
                      </span>{' '}
                      {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <div
                    onClick={() => router.push(`/details/${item._id}`)}
                    className="text-[#fb7b53] w-10 h-10 rounded-full bg-[#fb7a5331] border border-dashed hover:bg-[#fb7b53] hover:text-white flex justify-center items-center cursor-pointer"
                  >
                    <FaEye size={16} />
                  </div>

                  <div
                    onClick={() => handleDeleteListings(item._id)}
                    className="text-[#fb7b53] w-10 h-10 rounded-full bg-[#fb7a5331] border border-dashed hover:bg-[#fb7b53] hover:text-white flex justify-center items-center cursor-pointer"
                  >
                    <FaTrashAlt size={16} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PrivateRoutes>
  );
};

export default MyListing;
