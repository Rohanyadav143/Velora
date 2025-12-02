import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets} from "../assets/assets";
import kconverter from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams();
  const {getToken} = useAuth()
  const navigate = useNavigate()
  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied,setIsAlreadyApplied] = useState(false)
  const { jobs,backendUrl,userData,userApplications,fetchUserApplications } = useContext(AppContext);

  const fetchJob = async () => {
    
    try{
      const {data} = await axios.get(backendUrl+`/api/jobs/${id}`)
      if(data.success){
        setJobData(data.job)
      }else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(data.message)
    }
  };

  const applyHandler = async()=>{
    try{
      if(!userData){
        return toast.error('Login to apply for jobs')
      }
      if(!userData.resume){
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()

      const {data} = await axios.post(backendUrl+'/api/users/apply',
        {jobId: jobData._id},
        {headers:{Authorization: `Bearer ${token}`}}
      )

      if(data.success){
        toast.success(data.message)
        fetchUserApplications()
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () =>{
    const hasApplied = userApplications.some(item => item.jobId._id === jobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(()=>{
    if(userApplications.length > 0 && jobData){
      checkAlreadyApplied()
    }
  },[jobData,userApplications,id])

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        {/* Job Header */}
        <div className="bg-white text-black rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 bg-sky-50 border border-sky-400 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                className="h-24 w-24 bg-white rounded-lg p-4 border object-contain"
                src={jobData.companyId.image}
                alt=""
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-semibold">{jobData.title}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" className="h-4"/>
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" className="h-4"/>
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" className="h-4"/>
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" className="h-4"/>
                    CTC: {kconverter.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-center md:text-end gap-4">
              <button onClick={applyHandler} className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md font-medium">
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </button>
              <p className="text-gray-600 text-sm">Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>
        </div>

        {/* Job Description & More Jobs */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Description */}
          <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow">
            <h2 className="font-bold text-2xl mb-4 text-gray-800">Job Description</h2>
            <div className="rich-text text-gray-700" dangerouslySetInnerHTML={{ __html: jobData.description }} />
            <button onClick={applyHandler} className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md mt-6 font-medium">
              {isAlreadyApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>

          {/* More Jobs from Company */}
          <div className="w-full lg:w-1/3 space-y-5">
            <h2 className="font-semibold text-lg mb-3">More jobs from {jobData.companyId.name}</h2>
            {jobs.filter((job) => job._id !== jobData._id && job.companyId._id === jobData.companyId._id).filter(job => {
              const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
              return !appliedJobsIds.has(job._id)
            }).slice(0, 3).map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
