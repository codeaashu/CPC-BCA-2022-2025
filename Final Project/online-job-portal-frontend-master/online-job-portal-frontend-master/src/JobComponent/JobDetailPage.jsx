import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dollor from "../images/dollor_logo.png";
import timing from "../images/timing_logo.png";
import experience from "../images/experience_logo.png";
import { ToastContainer, toast } from "react-toastify";

const JobDetailPage = () => {
  const { jobId } = useParams();

  const employee = JSON.parse(sessionStorage.getItem("active-employee"));
  const employee_jwtToken = sessionStorage.getItem("employee-jwtToken");

  const navigate = useNavigate();

  const [jobApplyRequest, setJobApplyRequest] = useState({
    jobId: "",
    employeeId: "",
  });

  const [job, setJob] = useState({
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
  });

  useEffect(() => {
    const getJob = async () => {
      const fetchJobResponse = await retrieveJob();
      if (fetchJobResponse) {
        setJob(fetchJobResponse.jobs[0]);
      }
    };
    getJob();
  }, []);

  const retrieveJob = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/job/fetch?jobId=" + jobId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const applyForJob = (jobId, e) => {
    e.preventDefault();
    if (employee_jwtToken === null || employee_jwtToken === "") {
      toast.error("Please login as employee, for applying any Job", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      jobApplyRequest.employeeId = employee.id;
      jobApplyRequest.jobId = jobId;

      fetch("http://localhost:8080/api/job/application/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + admin_jwtToken,
        },
        body: JSON.stringify(jobApplyRequest),
      })
        .then((result) => {
          console.log("result", result);
          result.json().then((res) => {
            if (res.success) {
              toast.success(res.responseMessage, {
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
              }, 1000);
            } else if (!res.success) {
              toast.error(res.responseMessage, {
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
              }, 1000); // Redirect after 3 seconds
            } else {
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
              }, 1000); // Redirect after 3 seconds
            }
          });
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
        });
    }
  };

  return (
    <div className="mb-3">
      <div className="col ml-5 mt-3 ms-5 me-5">
        {/* Company and Employer Details Card */}
        <div className="card rounded-card h-100 shadow-lg ">
          <div className="row g-0">
            {/* Left side - Company Details Card */}
            <div className="col-md-6">
              <div className="card-body">
                <h4 className="card-title text-color-second">
                  Company Details
                </h4>
                <div className="row g-0">
                  {/* Left side - Company Logo */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      src={"http://localhost:8080/api/job/" + job.companyLogo}
                      className="card-img-top rounded img-fluid"
                      alt="Company Logo"
                      style={{
                        maxHeight: "100px",
                        width: "auto",
                      }}
                    />
                  </div>
                  {/* Right side - Job Details */}
                  <div className="col-md-8">
                    <div className="card-body text-color">
                      <h3 className="card-title d-flex justify-content-between text-color-second">
                        <div>
                          <b>{job.companyName}</b>
                        </div>
                      </h3>
                      <b className="card-text">
                        {job.address.street +
                          " " +
                          job.address.city +
                          " " +
                          job.address.pincode}
                      </b>
                      <br />
                      <b className="card-text">
                        {job.address.state + " " + job.address.country}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Employer Details Card */}
            <div className="col-md-6">
              <div className="card-body">
                <h4 className="card-title text-color-second">
                  Employer Details
                </h4>
                {/* Include the necessary details for the employer */}
                {/* Display First Name and Last Name in a row */}
                <div className="row mt-4">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>First Name:</b> {job.employer.firstName}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Last Name:</b> {job.employer.lastName}
                    </p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Email Id:</b> {job.employer.emailId}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Contact:</b> {job.employer.phoneNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Row - Job Details Card */}
        <div className="row mt-3">
          <div className="col">
            <div className="card rounded-card h-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-color-second">Job Details</h3>
                {/* Row 1 - Job Title */}
                <div className="row mt-4 ms-4 me-4">
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b className="mb-2">Job Title:</b> {job.title}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>Job Desription:</b> {job.description}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>Job Category:</b> {job.category.name}
                    </p>
                  </div>
                </div>

                {/* Row 2 - Job Title */}
                <div className="row mt-4 ms-4 me-4">
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>
                        <img
                          src={timing}
                          height="30"
                          width="auto"
                          class="d-inline-block align-top me-2"
                          alt=""
                        />
                        {job.jobType}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>
                        <img
                          src={dollor}
                          height="25"
                          width="auto"
                          class="d-inline-block align-top"
                          alt=""
                        />
                        {job.salaryRange}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>
                        <img
                          src={experience}
                          height="28"
                          width="auto"
                          class="d-inline-block align-top me-2"
                          alt=""
                        />
                        {job.experienceLevel}
                      </b>
                    </p>
                  </div>
                </div>

                {/* Row 3 - Job Title */}
                <div className="row mt-4 ms-4 me-4">
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>Required Skills:</b> {job.requiredSkills}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>Date Posted:</b> {formatDateFromEpoch(job.datePosted)}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <b>Applicants:</b> {job.applicationCount}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text mb-3"
                    onClick={(e) => applyForJob(job.id, e)}
                  >
                    Apply for Job
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
