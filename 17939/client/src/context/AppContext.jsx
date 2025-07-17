import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(localStorage.getItem("companyToken"));
  const [companyData, setCompanyData] = useState(null);

  const [userToken, setUserToken] = useState(localStorage.getItem("careerconnect-user-token"));
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // ✅ Fetch all jobs (public)
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) setJobs(data.jobs);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch company data (use Bearer token)
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      if (data.success) setCompanyData(data.company);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Fetch user profile (use Bearer token)
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (data.success) setUserData(data.user);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Fetch user job applications
  const fetchUserApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (data.success) setUserApplications(data.applications);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchJobs();
    if (companyToken) fetchCompanyData();
  }, []);

  // ✅ On userToken change
  useEffect(() => {
    if (userToken) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [userToken]);

  const value = {
    backendUrl,
    jobs,
    setJobs,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    userToken,
    setUserToken,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
