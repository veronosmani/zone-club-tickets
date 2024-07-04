import React from 'react';
import zoneLogo from '../../assets/ZoneLogo.png'; 

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: "#101010"}}>
      <div 
        className="px-8 rounded-md" 
        style={{ 
          width: '555px', 
          height: '475px', 
          backgroundColor: '#191919', 
          boxShadow: '0 -4px 10px -2px #404040' 
        }}
      >
        <div className="flex flex-col items-center">
          <img src={zoneLogo} alt="zone logo" className="w-[210px] h-auto mb-8" style={{ marginTop: '0px' }} />
          <h1 className="text-white text-2xl pt-4 mb-8" style={{ fontFamily: 'Play, sans-serif' }}>Welcome Back!</h1>
        </div>
        <div className="flex flex-col space-y-6 w-full px-4">
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
          />
          <button className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
