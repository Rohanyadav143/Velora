import bcrypt from 'bcrypt'
import Company from "../models/Company.js";
import { v2 as cloudinary} from 'cloudinary';
import generateToken from '../utils/generateToken.js';
import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';

// Register a new company
export const registerCompany = async(req,res) =>{
    
    const {name, email, password} = req.body

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile){
        return res.json({success:false, message: "Missing Details"})
    }

    try{
        const companyExists = await Company.findOne({email})

        if(companyExists){
            return res.json({success:false, message: "Company already register"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)

        })
    }
    catch(error){
        res.json({success:false, message:error.message})
    }
}

// Company login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email });

        // If company not found
        if (!company) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        // Compare password (NEEDS await)
        const isMatch = await bcrypt.compare(password, company.password);

        if (isMatch) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get company data
export const getCompanyData = async (req, res) => {
  try {
    const companyId = req.company._id; // <-- FIX

    const company = await Company.findById(companyId).select("-password");

    res.json({ success: true, data: company });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// post a new job
export const postJob = async(req,res)=>{

    const { title, description, location, salary, level, category } = req.body
    const companyId = req.company._id

    try{
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({success:true, newJob})

    }
    catch(error){
        res.json({success:false, message: error.message})
    }

}

// Get company job applications
export const getCompanyJobApplicants = async(req,res) =>{

}

// Get company posted job
export const getCompanyPostedJob = async(req,res)=>{
    try{

        const companyId = req.company._id

        const jobs = await Job.find({companyId})

        //Adding Number of applicants info in data 
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({jobId:job._id});
            return{...job.toObject(),applicants:applicants.length}
        }))

        
        res.json({success:true, jobsData})
    
    }
    catch(error){
        res.json({success:false,message: error.message})
    }
}

// Change job application status
export const changeJobApplicationsStatus = async(req,res)=>{

}

// Change job visiblity
export const changeVisiblity = async(req,res)=>{
    try{
        
        const {id} = req.body
        
        const companyId = req.company._id
        
        const job = await Job.findById(id)
        
        if(companyId.toString() == job.companyId.toString()){
            job.visible = !job.visible
        }

        await job.save()

        res.json({success:true, job})

    }   
    catch(error){
        res.json({success:false, message:error.message})
    }
}
 