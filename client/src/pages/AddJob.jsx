import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const AddJob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Bangalore')
  const [category, setCategory] = useState('Programming')
  const [level, setLevel] = useState('Beginner level')
  const [salary, setSalary] = useState(0)
  
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const{backendUrl,companyToken} = useContext(AppContext)

  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    try{
      const description = quillRef.current.root.innerHTML
      const {data} = await axios.post(
        backendUrl + '/api/company/post-job',
        { title, description, location, salary, level, category },
        { headers: { token: companyToken } }
      )
        if(data.success){
          toast.success(data.message)
          setTitle('')
          setSalary(0)
          quillRef.current.root.innerHTML=""
        }else{
          toast.error(data.message)
        }
    }catch(error){
        toast.error(error.message)
      }

  }


  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Enter job description here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='container max-w-4xl mx-auto p-6 sm:p-10 bg-white flex flex-col gap-6'>
      
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Add a New Job</h2>

      {/* Job Title */}
      <div className='w-full'>
        <label className='mb-2 text-gray-700 block'>Job Title</label>
        <input 
          type="text" 
          placeholder='Type Here' 
          onChange={e => setTitle(e.target.value)} 
          value={title} 
          required 
          className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition'
        />
      </div>

      {/* Job Description */}
      <div className='w-full'>
        <label className='mb-2 text-gray-700 block'>Job Description</label>
        <div ref={editorRef} className='border-2 border-gray-300 rounded-lg h-40 sm:h-60'></div>
      </div>

      {/* Category, Location, Level */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div className='flex-1'>
          <label className='mb-2 text-gray-700 block'>Job Category</label>
          <select 
            className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition'
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            {JobCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <label className='mb-2 text-gray-700 block'>Job Location</label>
          <select 
            className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition'
            onChange={e => setLocation(e.target.value)}
            value={location}
          >
            {JobLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <label className='mb-2 text-gray-700 block'>Job Level</label>
          <select 
            className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition'
            onChange={e => setLevel(e.target.value)}
            value={level}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      {/* Salary */}
      <div className='w-full sm:w-1/3'>
        <label className='mb-2 text-gray-700 block'>Job Salary</label>
        <input 
          type="number" 
          min={0} 
          placeholder='2500' 
          value={salary} 
          onChange={e => setSalary(e.target.value)}
          className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition'
        />
      </div>

      {/* Submit Button */}
      <button 
        type='submit' 
        className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all w-32'
      >
        ADD
      </button>
    </form>
  )
}

export default AddJob
