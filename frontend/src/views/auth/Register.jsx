import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(state)
    }

    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                    <h2 className='text-xl mb-3 font-bold'>
                        Welcome to Ecomerce
                    </h2>
                    <p className='text-sm mb-3 font-medium'>
                        Please register your account
                    </p>

                    <form onSubmit={submit}>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Your name</label>
                            <input onChange={inputHandle} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:ring-red-400' 
                                type="text" name='name' placeholder='Your name' id='name' value={state.name} required/>
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Email</label>
                            <input onChange={inputHandle} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:ring-red-400' 
                                type="text" name='email' placeholder='Email' id='email' value={state.email} required/>
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Password</label>
                            <input onChange={inputHandle} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:ring-red-400' 
                                type="password" name='password' placeholder='Password' id='password' value={state.password} required/>
                        </div>

                        <div className='flex items-center w-full gap-3 mb-3'>
                            <input type="checkbox" className='w-4 h-4 text-blue-600 overflow-hidden
                             bg-gray-200 border-gray-300 focus:ring-blue-500'
                             name='checkbox' id='checkbox'
                             />
                            <label htmlFor="checkbox">I agree with the policies & terms</label>
                        </div>

                        <button className='bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg 
                        text-white rounded-md px-7 py-2 mb-3' type='submit'>
                            Sign Up
                        </button>

                        <p className="mt-10 text-center text-sm text-white">
                            Already have account?
                            <a href="/login" className="font-bold leading-6 text-indigo-100 hover:text-green-400"> Login Now</a>
                        </p>

                        <div className='w-full flex justify-center items-center mb-3'>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                            <div className='w-[10%] flex justify-center items-center'>
                                <span className='pb-1'>Or</span>
                            </div>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            <div className='w-[135px] h-[35px] flex rounded-md 
                                bg-orange-700 shadow-lg hover:bg-orange-700/50 
                                justify-center cursor-pointer items-center overflow-hidden'>
                                    <span><FaGoogle /></span>
                            </div>

                            <div className='w-[135px] h-[35px] flex rounded-md 
                                bg-blue-700 shadow-lg hover:bg-blue-700/50 
                                justify-center cursor-pointer items-center overflow-hidden'>
                                    <span><FaFacebook /></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;