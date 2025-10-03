import React from 'react';

const Search = () => {
  return (
    <div className='flex items-center'>
      <input
        type='text'
        placeholder='Search'
        className='rounded-md border border-gray-300 px-2 py-1'
      />
      <button className='ml-2 rounded-md px-2 py-1 text-white'></button>
    </div>
  );
};

export default Search;
