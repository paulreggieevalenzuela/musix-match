"use client";

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Logout() {
  // const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 1000);
    return () => clearTimeout(timer);
  }, [router])


  return (
    <div className='m-auto text-center my-[40vh]'>Logging out...</div>
  );
}