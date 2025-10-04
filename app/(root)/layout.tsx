import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import MobileNav from '../../components/MobileNav';
import { getCurrentUser } from '../../lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

// Force this layout to be dynamic
export const dynamicParams = true;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect('/sign-in');
  return (
    <main className='flex h-screen'>
      <Sidebar {...currentUser} />
      <section className='flex h-full flex-1 flex-col'>
        <MobileNav {...currentUser} accountId={currentUser.accountId} />
        <Header userId={currentUser.$id} accountID={currentUser.accountId} />
        <div className='main-content'>{children}</div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
