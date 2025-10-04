import React from 'react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <section className='hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5'>
        <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
          <Image
            src='/assets/icons/logo-full-brand.svg'
            alt='logo'
            width={224}
            height={82}
            className='h-auto'
          />
          <div className='space-y-5 text-white'>
            <h1 className='h1'>Manage your files effectively</h1>
            <p className='body-1'>
              A place to store all your documents and files
            </p>
          </div>
          <Image
            src='/assets/images/files.png'
            alt='illustration'
            width={500}
            height={500}
            className='pt-16 transition-all hover:rotate-2 hover:scale-105'
          />
        </div>
      </section>
      <section className='flex flex-1 flex-col items-center justify-center bg-white p-4 py-10 lg:justify-center lg:py-0'>
        <div>
          <Image
            src='/assets/icons/logo-full-brand.svg'
            alt='logo'
            width={224}
            height={224}
            className='h-auto w-[200px] pb-20 lg:hidden'
          />
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default Layout;
