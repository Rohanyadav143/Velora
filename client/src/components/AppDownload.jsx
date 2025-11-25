import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-r from-orange-100 via-amber-100 to-orange-50 p-12 sm:p-20 lg:p-28 rounded-3xl shadow-xl overflow-hidden'>

        <div className='max-w-xl'>
          <h1 className='text-3xl sm:text-4xl font-extrabold mb-6 leading-snug text-gray-900'>
            Download Our Mobile App <br /> For a Better Experience
          </h1>

          <p className='text-gray-700 text-sm sm:text-base mb-8'>
            Stay updated with job alerts, track applications, and apply faster with our mobile app.
          </p>

          <div className='flex gap-6'>
            <a href='#' className='inline-block hover:scale-105 transition-all duration-300'>
              <img className='h-12 drop-shadow' src={assets.play_store} alt='' />
            </a>
            <a href='#' className='inline-block hover:scale-105 transition-all duration-300'>
              <img className='h-12 drop-shadow' src={assets.app_store} alt='' />
            </a>
          </div>
        </div>

        <img
          className='absolute w-80 right-0 bottom-0 mr-20 max-lg:hidden drop-shadow-xl'
          src={assets.app_main_img}
          alt=''
        />
      </div>
    </div>
  )
}

export default AppDownload
