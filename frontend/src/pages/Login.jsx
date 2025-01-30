import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import bg from '../assets/login-bg.jpg'

const Login = () => {
  const [currState, setCurrState] = useState('Login');

  return (
        <>
          <Header />
          <div className='relative'>
            <img src={bg} className='h-[75vh] '/>
            <div className='absolute top-0 left-0  flexCenter h-full w-full'>
              <form className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 p-10 rounded-3xl text-white '>
                <div className='w-full mb-5'>
                  <h3 className='bold-36 tracking-wider text-slate-800'>
                    <span className='underlined'>{currState}</span>
                  </h3>
                </div>

                {/* Name input for Sign Up */}
                {currState === 'Sign Up' && (
                  <div className='relative w-full'>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      placeholder="Full Name" 
                      className='rounded-lg mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      htmlFor="name" 
                      className="pl-3 absolute left-0 -top-6 text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                )}
                
                {/* Email input */}
                <div className='relative w-full'>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="Email Address" 
                    className='rounded-lg mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                  />
                  <label 
                    htmlFor="email" 
                    className="pl-3 absolute left-0 -top-6 text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                
                {/* Password input */}
                <div className='relative w-full'>
                  <input 
                    type="password" 
                    id="password"
                    name="password" 
                    placeholder="Password" 
                    className='rounded-lg mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                  />
                  <label 
                    htmlFor="password" 
                    className="pl-3 absolute left-0 -top-6 text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                
                {/* Submit button */}
                <button type='submit' className='p-5 bg-slate-800 text-primary !py-[8px] !rounded-full tracking-widest hover:bg-slate-600 duration-300 w-full'>
                  {currState === "Sign Up" ? "Sign Up" : "Login"}
                </button>

                {/* Switch between Sign Up and Login */}
                <div className='w-full flex flex-col gap-y-3'>
                  {currState === "Login" ? (
                    <>
                      <div className='medium-15 cursor-pointer text-primary underline hover:text-slate-800'>
                        Forgot your password?
                      </div>
                      <div className='medium-15 text-primary'>
                        Don't have an account? 
                        <span 
                          onClick={() => setCurrState("Sign Up")} 
                          className='cursor-pointer pl-1 underline hover:text-slate-800'
                        >
                          Create account
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className='medium-15 text-primary'>
                      Already registered? 
                      <span 
                        onClick={() => setCurrState("Login")} 
                        className='cursor-pointer pl-1 underline hover:text-slate-800'
                      >
                        Login
                      </span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>

  );
};

export default Login;
