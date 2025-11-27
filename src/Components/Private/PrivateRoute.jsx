'use client';

import { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContextProvider';

const PrivateRoutes = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect only if user not logged in
      router.replace(`/login`);
    }
  }, [isLoading, user, router, pathname]);

  // Loading state
  if (isLoading || !user) {
    return (
      <div className="bg-[#0c062e] min-h-screen flex flex-col">
        <main className="flex-1 flex justify-center items-center">
          <h3>Loading...</h3>
        </main>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoutes;
