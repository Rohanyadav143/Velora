import React, { useState, useRef, useEffect } from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';
import { useContext } from 'react';
import {AppContext} from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ViewApplications = () => {

  // State to track which dropdown is open (by index)
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current.every(ref => ref && !ref.contains(event.target))) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const {backendUrl, companyToken} = useContext(AppContext)
  const [applicants, setApplicants] = useState(null)

  // Function to fetch company job Applications data
  const fetchCompanyJobApplications = async () =>{
    try{
      const {data} = await axios.get(backendUrl+'/api/company/applicants',
        {headers:{token:companyToken}})
      if(data.success){
        setApplicants(data.applications.reverse())
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  // Function to update job Application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplications(); // refresh the table with updated status
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  if (applicants === null) {
    return <Loading />;
  }

  if (applicants.length === 0) {
      return <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text-2xl'>No Applications Found</p>
      </div>
  }

  return(
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left max-md:hidden">#</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-3 px-4 text-left max-md:hidden">Location</th>
              <th className="py-3 px-4 text-left">Resume</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">

                <td className="py-3 px-4 border-b max-md:hidden">{index + 1}</td>

                <td className="py-3 px-4 border-b flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full max-sm:hidden"
                    src={applicant.userId.image}
                    alt={applicant.name}
                  />
                  {applicant.userId.name}
                </td>

                <td className="py-3 px-4 border-b max-sm:hidden">{applicant.jobId.title}</td>
                <td className="py-3 px-4 border-b max-md:hidden">{applicant.jobId.location}</td>

                <td className="py-3 px-4 border-b">
                  <a
                    href={applicant.userId.resume}
                    target="_blank"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex items-center gap-2 hover:bg-blue-100"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="download" />
                  </a>
                </td>

                {/* CLICK DROPDOWN */}
                <td className="py-3 px-4 border-b">
                  {applicant.status === "Pending"
                  ?
                  <div className="relative" ref={el => dropdownRefs.current[index] = el}>
                    <button
                      className="px-3 py-1 text-gray-500 font-bold hover:bg-gray-100 rounded"
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                    >
                      ...
                    </button>

                    {openDropdown === index && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-white border rounded shadow-lg z-50 pointer-events-auto">
                        <button onClick={()=>changeJobApplicationStatus(applicant._id,'Accepted')} className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">
                          Accept
                        </button>
                        <button onClick={()=>changeJobApplicationStatus(applicant._id,'Rejected')} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>:
                  <div>{applicant.status}</div>
                  }
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default ViewApplications;
