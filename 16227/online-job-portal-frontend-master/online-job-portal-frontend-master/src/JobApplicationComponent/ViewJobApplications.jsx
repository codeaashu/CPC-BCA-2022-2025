import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ViewJobApplications = () => {
  const { jobId } = useParams();
  const employer = JSON.parse(sessionStorage.getItem("active-employer"));
  const employer_jwtToken = sessionStorage.getItem("employer-jwtToken");

  const [assignApplicationId, setAssignApplicationId] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");

  const [applications, setApplications] = useState([
    {
      id: "",
      applicationId: "",
      job: {
        id: 1,
        employer: {
          id: 4,
          firstName: "",
          lastName: "",
          emailId: "",
          phoneNo: "",
        },
        title: "",
        description: "",
        category: {
          id: 1,
          name: "",
          description: "",
          status: "",
        },
        address: {
          id: "",
          street: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        },
        companyName: "",
        companyLogo: "",
        jobType: "",
        salaryRange: "",
        experienceLevel: "",
        requiredSkills: "",
        status: "",
        datePosted: "",
        applicationCount: 0,
      },
      employee: {
        userProfile: {
          id: 1,
          bio: "",
          website: "",
          resume: "",
          linkedlnProfileLink: "",
          githubProfileLink: "",
          skills: [
            {
              id: 7,
              skill: "",
              experience: 0,
              userId: 0,
            },
          ],
          educations: [
            {
              id: 5,
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
              userId: 0,
            },
          ],
          workExperiences: [
            {
              id: 2,
              experience: 0,
              jobPosition: "",
              company: "",
              startDate: "",
              endDate: "",
              userId: 0,
            },
          ],
          profilePic: "",
        },
      },
      dateTime: "",
      status: "",
      jobId: 0,
      employeeId: 0,
    },
  ]);

  let navigate = useNavigate();

  const [showModal, setShowSkillModal] = useState(false);

  const handleClose = () => setShowSkillModal(false);
  const handleShow = () => setShowSkillModal(true);
  const [applicationStatuses, setApplicationStatuses] = useState([]);

  const updateApplicationStatus = (applicationId) => {
    console.log("Application Id :" + applicationId);
    setAssignApplicationId(applicationId);
    handleShow();
  };
  const retrieveAllStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/helper/job/application/status/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllJobApplicationsStatus = async () => {
      const res = await retrieveAllStatus();
      if (res) {
        setApplicationStatuses(res);
      }
    };

    getAllJobApplicationsStatus();
  }, []);

  const updateJobApplicationStatus = (e) => {
    e.preventDefault();

    let putData = {
      id: assignApplicationId,
      status: applicationStatus,
    };

    if (assignApplicationId === "" || applicationStatus === "") {
      toast.error("Missing input for updating the application status", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch("http://localhost:8080/api/job/application/update/status", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(putData),
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
                window.location.reload(true);
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
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        });
    }
  };

  useEffect(() => {
    const getAllJobs = async () => {
      const jobApplicationResponse = await retrieveAllJobApplication();
      if (jobApplicationResponse) {
        setApplications(jobApplicationResponse.applications);
      }
    };

    getAllJobs();
  }, []);

  const retrieveAllJobApplication = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/job/application/fetch/all/job-wise?jobId=" +
        jobId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const viewEmployeeProfile = (employee) => {
    navigate("/employee/profile/detail", { state: employee });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>Job Applications</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Company Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Job</th>
                  <th scope="col">Category</th>
                  <th scope="col">Type</th>
                  <th scope="col">Employee</th>

                  <th scope="col">Location</th>
                  <th scope="col">Application Id</th>
                  <th scope="col">Applied Date</th>
                  <th scope="col">Status</th>
                  {(() => {
                    if (employer) {
                      return <th scope="col">Action</th>;
                    }
                  })()}
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => {
                  return (
                    <tr>
                      <td>
                        <b>{application.job.companyName}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/job/" +
                            application.job.companyLogo
                          }
                          class="img-fluid"
                          alt="company_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/job/${application.job.id}/detail`}
                          style={{ textDecoration: "none" }}
                          className="text-color"
                        >
                          <b>{application.job.title}</b>
                        </Link>
                      </td>

                      <td>
                        <b>{application.job.category.name}</b>
                      </td>
                      <td>
                        <b>{application.job.jobType}</b>
                      </td>

                      <td>
                        <b
                          className="text-color"
                          onClick={() =>
                            viewEmployeeProfile(application.employee)
                          }
                        >
                          {application.employee.firstName +
                            " " +
                            application.employee.lastName}
                        </b>
                      </td>

                      <td>
                        <b>{application.job.address.city}</b>
                      </td>
                      <td>
                        <b>{application.applicationId}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(application.dateTime)}</b>
                      </td>
                      <td>
                        <b>{application.status}</b>
                      </td>

                      {(() => {
                        if (employer && application.status === "Applied") {
                          return (
                            <td>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-sm bg-color custom-bg-text mb-3"
                                  onClick={() =>
                                    updateApplicationStatus(application.id)
                                  }
                                >
                                  Update Status
                                </button>
                                <ToastContainer />
                              </div>
                            </td>
                          );
                        }
                      })()}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* employee work experience modal */}
      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Update Application Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Application Status</b>
                </label>

                <select
                  name="status"
                  onChange={(e) => {
                    setApplicationStatus(e.target.value);
                  }}
                  className="form-control"
                  required
                >
                  <option value="">Select Application Status</option>

                  {applicationStatuses.map((status) => {
                    return <option value={status}>{status}</option>;
                  })}
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="button" // Change the type to "button"
                  onClick={updateJobApplicationStatus} // Remove the arrow function
                  className="btn bg-color custom-bg-text"
                >
                  Update Status
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewJobApplications;
