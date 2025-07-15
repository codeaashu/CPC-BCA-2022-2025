import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { useNavigate } from "react-router-dom";
import JobCard from "../JobComponent/JobCard";

const HomePage = () => {
  const navigate = useNavigate();

  const [allJobs, setAllJobs] = useState([
    {
      id: "",
      employer: {
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
        phoneNo: "",
        role: "",
        address: {
          id: "",
          street: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        },
        registrationDate: "",
        status: "",
      },
      title: "",
      description: "",
      category: {
        id: "",
        name: "",
        description: "",
        status: "",
      },
      companyName: "",
      companyLogo: "",
      address: {
        id: "",
        street: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
      },
      jobType: "",
      salaryRange: "",
      experienceLevel: "",
      requiredSkills: "",
      status: "",
      datePosted: "",
      applicationCount: "",
    },
  ]);

  const [searchData, setSearchData] = useState({
    categoryId: "",
    jobType: "",
    salaryRange: "",
  });

  const [tempSearchData, setTempSearchData] = useState({
    categoryId: "",
    jobType: "",
    salaryRange: "",
  });

  const [categories, setCategories] = useState([]);

  const [jobTypes, setJobTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);

  const handleUserInput = (e) => {
    setTempSearchData({ ...tempSearchData, [e.target.name]: e.target.value });
  };

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/job/category/fetch/all"
    );
    return response.data;
  };
  const retrieveAllJobTypes = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/helper/job/type/fetch/all"
    );
    return response.data;
  };
  const retrieveAllSalary = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/helper/job/salary/range/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllJobs = async () => {
      const allJobs = await retrieveAllJobs();
      if (allJobs) {
        setAllJobs(allJobs.jobs);
      }
    };

    const getSearchedJobs = async () => {
      const allJobs = await searchJobsByData();
      if (allJobs) {
        setAllJobs(allJobs.jobs);
      }
    };

    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    const getAllJobTypes = async () => {
      const res = await retrieveAllJobTypes();
      if (res) {
        setJobTypes(res);
      }
    };

    const getAllSalaryRange = async () => {
      const res = await retrieveAllSalary();
      if (res) {
        setSalaryRange(res);
      }
    };

    if (
      searchData.categoryId !== "" &&
      searchData.jobType !== "" &&
      searchData.salaryRange !== ""
    ) {
      getSearchedJobs();
    } else {
      getAllJobs();
    }

    getAllJobTypes();
    getAllSalaryRange();
    getAllCategories();
  }, [searchData]);

  const retrieveAllJobs = async () => {
    const response = await axios.get("http://localhost:8080/api/job/fetch/all");
    console.log(response.data);
    return response.data;
  };

  const searchJobsByData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/job/search?categoryId=" +
        searchData.categoryId +
        "&jobType=" +
        searchData.jobType +
        "&salaryRange=" +
        searchData.salaryRange
    );
    console.log(response.data);
    return response.data;
  };

  const searchJob = (e) => {
    e.preventDefault();
    setSearchData(tempSearchData);
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <h3 className="text-color-second text-center mt-3">
        Search Jobs here..!!
      </h3>
      <div className="d-flex aligns-items-center justify-content-center mt-3">
        <form class="row g-3">
          <div class="col-auto">
            <select
              name="categoryId"
              onChange={handleUserInput}
              className="form-control"
              required
            >
              <option value="">Select Job Category</option>

              {categories.map((category) => {
                return <option value={category.id}> {category.name} </option>;
              })}
            </select>
          </div>

          <div class="col-auto">
            <select
              name="jobType"
              onChange={handleUserInput}
              className="form-control"
              required
            >
              <option value="">Select Job Type</option>

              {jobTypes.map((type) => {
                return <option value={type}> {type} </option>;
              })}
            </select>
          </div>

          <div class="col-auto">
            <select
              name="salaryRange"
              onChange={handleUserInput}
              className="form-control"
              required
            >
              <option value="">Select Salary Range</option>

              {salaryRange.map((range) => {
                return <option value={range}> {range} </option>;
              })}
            </select>
          </div>

          <div class="col-auto">
            <button
              type="submit"
              class="btn bg-color custom-bg-text mb-3"
              onClick={searchJob}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-12 mt-3 mb-5">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {allJobs.map((job) => {
            return <JobCard item={job} key={job.id} />;
          })}
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
