import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import FileUpload from './FileUpload';
import { logout } from '../lib/actions/user.actions';
import Search from './Search';

const Header = ({
  userId,
  accountID,
}: {
  userId: string;
  accountID: string;
}) => {
  return (
    <header className='header'>
      <Search />
      <div className='header-wrapper'>
        <FileUpload ownerId={userId} accountId={accountID} />
        <form
          action={async () => {
            'use server';
            await logout();
          }}
        >
          <Button type='submit' className='sign-out-button group relative'>
            <Image
              src='/assets/icons/logout.svg'
              alt='logout'
              width={24}
              height={24}
              className='cursor-pointer hover:scale-110'
            />
            <div className='invisible absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-transparent px-3 py-1 text-sm text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
              Sign out
            </div>
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
