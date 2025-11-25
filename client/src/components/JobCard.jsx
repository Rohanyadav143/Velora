import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div className='border border-gray-200 p-6 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 bg-white'>
      
      {/* Company Icon */}
      <div className='flex justify-between items-center mb-4'>
        <img className='h-10 w-10 object-contain rounded-full' src={assets.company_icon} alt='company' />
      </div>

      {/* Job Title */}
      <h4 className='font-semibold text-xl sm:text-2xl text-gray-800 mb-2 hover:text-blue-600 transition-colors'>
        {job.title}
      </h4>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mt-2 text-xs'>
        <span className='bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full'>
          {job.location}
        </span>
        <span className='bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded-full'>
          {job.level}
        </span>
      </div>

      {/* Description */}
      <p className='text-gray-500 text-sm mt-4 line-clamp-3' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>

      {/* Buttons */}
      <div className='mt-6 flex flex-wrap gap-3 text-sm'>
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
          className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition'
        >
          Apply Now
        </button>
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
          className='text-gray-600 border border-gray-400 hover:border-gray-600 hover:text-gray-800 px-5 py-2 rounded-lg transition'
        >
          Learn More
        </button>
      </div>

    </div>
  )
}

export default JobCard
