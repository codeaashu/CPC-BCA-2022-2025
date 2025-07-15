import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
  const [categories, setCategories] = useState([]);

  const [jobTypes, setJobTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [experience, setExperience] = useState([]);

  const employer = JSON.parse(sessionStorage.getItem("active-employer"));
  const employer_jwtToken = sessionStorage.getItem("employer-jwtToken");

  let navigate = useNavigate();

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

  const retrieveAllExperience = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/helper/job/expereince/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
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

    const getAllExperience = async () => {
      const res = await retrieveAllExperience();
      if (res) {
        setExperience(res);
      }
    };

    const getAllSalaryRange = async () => {
      const res = await retrieveAllSalary();
      if (res) {
        setSalaryRange(res);
      }
    };

    getAllExperience();
    getAllJobTypes();
    getAllSalaryRange();
    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);

  const [job, setJob] = useState({
    employerId: employer.id,
    jobCategoryId: "",
    title: "",
    description: "",
    companyName: "",
    companyLogo: "",
    jobType: "",
    salaryRange: "",
    experienceLevel: "",
    requiredSkills: "",
    street: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const handleInput = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const saveJob = (e) => {
    e.preventDefault();
    if (job === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("employerId", job.employerId);
    formData.append("jobCategoryId", job.jobCategoryId);
    formData.append("title", job.title);
    formData.append("description", job.description);
    formData.append("companyName", job.companyName);
    formData.append("companyLogo", selectedImage1);
    formData.append("jobType", job.jobType);
    formData.append("salaryRange", job.salaryRange);
    formData.append("experienceLevel", job.experienceLevel);
    formData.append("requiredSkills", job.requiredSkills);
    formData.append("street", job.street);
    formData.append("city", job.city);
    formData.append("pincode", job.pincode);
    formData.append("state", job.state);
    formData.append("country", job.country);
    axios
      .post("http://localhost:8080/api/job/add", formData, {
        headers: {
          Authorization: "Bearer " + employer_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div class="card form-card shadow-lg" style={{ width: "60rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 class="card-title">Add Job</h5>
            </div>
            <div class="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Job Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={handleInput}
                    value={job.title}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Company Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    onChange={handleInput}
                    value={job.companyName}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Job Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="2"
                    onChange={handleInput}
                    value={job.description}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Skills Required</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="requiredSkills"
                    rows="2"
                    onChange={handleInput}
                    value={job.requiredSkills}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Job Category</b>
                  </label>

                  <select
                    name="jobCategoryId"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Job Category</option>

                    {categories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Job Type</b>
                  </label>

                  <select
                    name="jobType"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Job Type</option>

                    {jobTypes.map((type) => {
                      return <option value={type}> {type} </option>;
                    })}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Salary Range</b>
                  </label>

                  <select
                    name="salaryRange"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Salary Range</option>

                    {salaryRange.map((range) => {
                      return <option value={range}> {range} </option>;
                    })}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Experience Required</b>
                  </label>

                  <select
                    name="experienceLevel"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Experience Required</option>

                    {experience.map((exp) => {
                      return <option value={exp}> {exp} </option>;
                    })}
                  </select>
                </div>

                {/* Address Fields */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    onChange={handleInput}
                    value={job.street}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleInput}
                    value={job.city}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleInput}
                    value={job.pincode}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label">
                    <b>State</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    onChange={handleInput}
                    value={job.state}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="country" className="form-label">
                    <b>Country</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    onChange={handleInput}
                    value={job.country}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Company Logo</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="companyLogo"
                    onChange={(e) => setSelectImage1(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text"
                    onClick={saveJob}
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
