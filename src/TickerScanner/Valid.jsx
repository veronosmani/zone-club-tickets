import React from 'react';
import validCircle from '../assets/validCircle.png';
import scanIcon from '../assets/scanIcon.png';

const Valid = () => {
  return (
    <div className='max-w-[400px] min-h-screen bg-black flex flex-col items-center mx-auto'>
      <div className='flex mt-20 w-[270px] h-[120px] items-center justify-center font-bold text-[24px] mx-auto border border-gray-500 text-white'>
        <h1>event name</h1>
      </div>
      <div className='relative mt-10'>
        <img src={validCircle} alt="Valid Circle" className="w-full" />
        <h1 className='absolute inset-0 flex text-[40px] items-center justify-center text-white font-bold'>PASS</h1>
      </div>
      <div className='absolute bottom-5 w-[350px] h-[140px] bg-red-600 mx-auto'>
        <button className='flex w-[350px] h-[140px] items-center justify-center space-x-3'>
            <img src={scanIcon} />
            <h1 className='font-bold text-[36px] text-white'>SCAN</h1>
        </button>
      </div>
    </div>
  );
};

export default Valid;
