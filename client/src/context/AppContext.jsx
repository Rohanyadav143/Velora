import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(() => {
    return localStorage.getItem("companyToken") || null;
  });
  const [companyData, setCompanyData] = useState(() => {
    const stored = localStorage.getItem("companyData");
    return stored ? JSON.parse(stored) : null;
  });

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success){
        setJobs(data.jobs);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch company data
  const fetchCompanyData = async () => {
    try {
      if (!companyToken) return;

      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { Authorization: `Bearer ${companyToken}` },
      });

      if (data.success) {
        setCompanyData(data.company);
        localStorage.setItem("companyData", JSON.stringify(data.company));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setCompanyToken(null);
      localStorage.removeItem("companyToken");
      setCompanyData(null);
    }
  };

  // Fetch user data (Clerk)
  const fetchUserData = async () => {
    try {
      if (!user) return;

      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setUserApplications(data.applications || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Load jobs on first render
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch company data whenever token exists
  useEffect(() => {
    if (companyToken && !companyData) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // Fetch user data when Clerk user is available
  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  const value = { searchFilter, setSearchFilter, isSearched, setIsSearched, jobs, setJobs,
    showRecruiterLogin,setShowRecruiterLogin,companyToken,setCompanyToken,companyData,setCompanyData,
    userData,setUserData,userApplications,setUserApplications,backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
