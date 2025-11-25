import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar/>
      <div className='container px-4 2xl:px-20 mx-auto my-10 min-h-[65vh]'>
        
        {/* Resume Section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Your Resume</h2>
          <div className='flex gap-3 flex-wrap'>
            {isEdit ? (
              <>
                <label htmlFor='resumeUpload' className='flex items-center gap-2 cursor-pointer'>
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition'>Select Resume</p>
                  <input 
                    id='resumeUpload' 
                    onChange={e => setResume(e.target.files[0])} 
                    accept='application/pdf' 
                    type='file' 
                    hidden
                  />
                  <img className='w-8 h-8 hover:scale-110 transition' src={assets.profile_upload_icon} alt='' />
                </label>
                <button 
                  onClick={() => setIsEdit(false)} 
                  className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 hover:bg-green-200 transition'
                >
                  Save
                </button>
              </>
            ) : (
              <div className='flex gap-2'>
                <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition' href=''>
                  Resume
                </a>
                <button 
                  onClick={() => setIsEdit(true)} 
                  className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition'
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Jobs Applied Table */}
        <div>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Jobs Applied</h2>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border rounded-lg shadow-sm'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='py-3 px-4 text-left text-gray-700 font-medium'>Company</th>
                  <th className='py-3 px-4 text-left text-gray-700 font-medium'>Job Title</th>
                  <th className='py-3 px-4 text-left text-gray-700 font-medium max-sm:hidden'>Location</th>
                  <th className='py-3 px-4 text-left text-gray-700 font-medium max-sm:hidden'>Date</th>
                  <th className='py-3 px-4 text-left text-gray-700 font-medium'>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobsApplied.map((job, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition'>
                    <td className='py-3 px-4 flex items-center gap-2'>
                      <img className='w-8 h-8 rounded-md' src={job.logo} alt='' />
                      {job.company}
                    </td>
                    <td className='py-2 px-4'>{job.title}</td>
                    <td className='py-2 px-4 max-sm:hidden'>{job.location}</td>
                    <td className='py-2 px-4 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4'>
                      <span className={`px-4 py-1.5 rounded font-medium text-sm ${
                        job.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                        job.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Applications
