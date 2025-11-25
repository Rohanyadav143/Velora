import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const RecruiterLogin = () => {
    const [state, setState] = useState("Login")
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    const { setShowRecruiterLogin } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (state === "Sign Up" && !isTextDataSubmited) {
            setIsTextDataSubmited(true)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-50 px-4'>
            <form 
                onSubmit={onSubmitHandler} 
                className='relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 sm:p-10 flex flex-col'
            >
                <h1 className='text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-2'>
                    {state} Recruiter
                </h1>
                <p className='text-center text-gray-500 text-sm mb-6'>
                    {state === 'Login' ? 'Welcome back! Please sign in to continue.' : 'Create your recruiter account to manage job postings.'}
                </p>

                {/* Sign Up Image Upload */}
                {state === "Sign Up" && isTextDataSubmited && (
                    <div className='flex items-center gap-4 mb-6'>
                        <label htmlFor='image'>
                            <img 
                                className='h-16 w-16 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform' 
                                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                alt='Upload Logo' 
                            />
                            <input 
                                type='file' 
                                id='image' 
                                hidden 
                                onChange={e => setImage(e.target.files[0])} 
                            />
                        </label>
                        <p className='text-gray-600 text-sm'>Upload Company <br /> Logo</p>
                    </div>
                )}

                {/* Form Fields */}
                {!(state === "Sign Up" && isTextDataSubmited) && (
                    <>
                        {state !== 'Login' && (
                            <div className='flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 mb-4'>
                                <img src={assets.person_icon} alt='Company' className='h-5 w-5'/>
                                <input 
                                    type="text" 
                                    placeholder='Company Name' 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    className='w-full outline-none text-sm text-gray-700' 
                                    required 
                                />
                            </div>
                        )}

                        <div className='flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 mb-4'>
                            <img src={assets.email_icon} alt='Email' className='h-5 w-5'/>
                            <input 
                                type="email" 
                                placeholder='Email id' 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                className='w-full outline-none text-sm text-gray-700' 
                                required 
                            />
                        </div>

                        <div className='flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 mb-4'>
                            <img src={assets.lock_icon} alt='Password' className='h-5 w-5'/>
                            <input 
                                type="password" 
                                placeholder='Password' 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                className='w-full outline-none text-sm text-gray-700' 
                                required 
                            />
                        </div>
                    </>
                )}

                {state === "Login" && (
                    <p className='text-sm text-blue-600 text-right mb-4 cursor-pointer hover:underline'>
                        Forgot password?
                    </p>
                )}

                <button 
                    type='submit' 
                    className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-full shadow-md transition-all mb-4'
                >
                    {state === 'Login' ? 'Login' : isTextDataSubmited ? 'Create Account' : 'Next'}
                </button>

                <p className='text-center text-gray-600 text-sm'>
                    {state === 'Login' ? "Don't have an account?" : "Already have an account?"} 
                    <span 
                        className='text-blue-600 cursor-pointer ml-1 hover:underline' 
                        onClick={() => { setState(state === 'Login' ? 'Sign Up' : 'Login'); setIsTextDataSubmited(false); }}
                    >
                        {state === 'Login' ? 'Sign Up' : 'Login'}
                    </span>
                </p>

                <img 
                    onClick={() => setShowRecruiterLogin(false)} 
                    className='absolute top-4 right-4 w-6 h-6 cursor-pointer hover:scale-110 transition-transform'
                    src={assets.cross_icon} 
                    alt='Close'
                />
            </form>
        </div>
    )
}

export default RecruiterLogin
