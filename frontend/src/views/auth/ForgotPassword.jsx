import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { admin_login } from '../../store/Reducers/authReducer';

const ForgotPassword = () => {
    const [state, setState] = useState("");

    const dispatch = useDispatch()

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault();
        // Handle the form submission to get the verification code
        console.log("Email submitted:", state.email);
    };

    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                    <h2 className='text-xl mb-3 font-bold'>
                        Forgot password
                    </h2>

                    <form onSubmit={submit}>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Email</label>
                            <input className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:ring-red-400' 
                                type="text" name='email' placeholder='Email' id='email' 
                                onChange={inputHandle} value={state.email} required/>
                        </div>

                        <button className='bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg 
                        text-white rounded-md px-7 py-2 mb-3'
                            >Get verification code
                        </button>

                        <p className="mt-10 text-center text-sm text-white">
                            Remember your password?
                            <a href="/forgot-password" className="font-bold leading-6 text-indigo-100 
                            hover:text-green-400"> Log in now</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;