import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const EmployeeProfile = () => {
  const location = useLocation();
  var fetchedEmployee = location.state; // use this in case of Admin & Employer
  console.log("PRINT");
  console.log(fetchedEmployee);
  const sessionEmployee = JSON.parse(sessionStorage.getItem("active-employee")); // use this for Employee Profile Update
  const navigate = useNavigate();

  if (sessionEmployee) {
    fetchedEmployee = sessionEmployee;
  }

  const employee_jwtToken = sessionStorage.getItem("employee-jwtToken");

  const [showSkillModal, setShowSkillModal] = useState(false);

  const handleSkillClose = () => setShowSkillModal(false);
  const handleSkillShow = () => setShowSkillModal(true);

  const [showQualificationModal, setShowQualificationModal] = useState(false);

  const handleQualificationClose = () => setShowQualificationModal(false);
  const handleQualificationShow = () => setShowQualificationModal(true);

  const [showExperienceModal, setShowExperienceModal] = useState(false);

  const handleExperienceClose = () => setShowExperienceModal(false);
  const handleExperienceShow = () => setShowExperienceModal(true);

  const [addExperience, setAddExperience] = useState({
    experience: "",
    jobPosition: "",
    company: "",
    startDate: "",
    endDate: "",
    userId: fetchedEmployee.id,
  });

  const [addSkill, setAddSkill] = useState({
    skill: "",
    experience: "",
    userId: fetchedEmployee.id,
  });

  const handleUserExperienceInput = (e) => {
    setAddExperience({ ...addExperience, [e.target.name]: e.target.value });
  };

  const handleUserSkillInput = (e) => {
    setAddSkill({ ...addSkill, [e.target.name]: e.target.value });
  };

  const [addQualification, setAddQualification] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    userId: fetchedEmployee.id,
  });

  const handleUserQualificationInput = (e) => {
    setAddQualification({
      ...addQualification,
      [e.target.name]: e.target.value,
    });
  };

  const showEmployeeSkillModal = (e) => {
    handleSkillShow();
  };

  const showEmployeeQualificationModal = (e) => {
    handleQualificationShow();
  };

  const showEmployeeExperienceModal = (e) => {
    handleExperienceShow();
  };

  const addEmployeeSkill = (e) => {
    fetch("http://localhost:8080/api/user/profile/skill/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + employee_jwtToken,
      },
      body: JSON.stringify(addSkill),
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
  };

  const addEmployeeQualification = (e) => {
    fetch("http://localhost:8080/api/user/profile/education/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + employee_jwtToken,
      },
      body: JSON.stringify(addQualification),
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
  };

  const addEmployeeWorkExperience = (e) => {
    fetch("http://localhost:8080/api/user/profile/work-experience/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + employee_jwtToken,
      },
      body: JSON.stringify(addExperience),
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
  };

  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNo: "",
    role: "",
    userProfile: {
      id: "",
      bio: "",
      website: "",
      resume: "",
      linkedlnProfileLink: "",
      githubProfileLink: "",
      skills: [{ id: "", skill: "", experience: 0, userId: 0 }],
      educations: [
        {
          id: "",
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
          userId: 0,
        },
      ],
      workExperiences: [
        {
          id: "",
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
    address: {
      id: "",
      street: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
    registrationDate: "",
  });

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setEmployee(allUsers.users[0]);
      }
    };

    // Run the effect only on mount (empty dependency array)
    getAllUsers();
  }, []); // <- Add the empty dependency array here

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch?userId=" + fetchedEmployee.id
      // ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    console.log(response.data);
    return response.data;
  };

  const downloadResume = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/employee/resume/${fetchedEmployee.userProfile.resume}/download?employeeId=${fetchedEmployee.id}`,
        {
          responseType: "blob", // Important to handle binary data
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fetchedEmployee.userProfile.resume;
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      {/* User Profile Card */}
      <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div
          className="card rounded-card h-100 shadow-lg"
          style={{
            width: "900px",
          }}
        >
          <div className="card-body">
            <h4 className="card-title text-color-second text-center">
              Personal Detail
            </h4>

            <div className="row mt-4">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>First Name:</b> {employee.firstName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Last Name:</b> {employee.lastName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Email Id:</b> {employee.emailId}
                </p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Contact:</b> {employee.phoneNo}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Address:</b>{" "}
                  {employee.address.street +
                    " " +
                    employee.address.city +
                    " " +
                    employee.address.pincode +
                    " " +
                    employee.address.state +
                    " " +
                    employee.address.country}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Registrated Date:</b>{" "}
                  {formatDateFromEpoch(employee.registrationDate)}
                </p>
              </div>
            </div>

            <h4 className="card-title text-color-second text-center mt-5">
              User Profile
            </h4>
            {(() => {
              if (employee.userProfile === null) {
                return (
                  <div>
                    <h5 className="text-center mt-5">Profile Not Updated</h5>

                    <Link
                      to="/employee/profile/update"
                      class="nav-link active text-center mt-1"
                      aria-current="page"
                    >
                      <b className="text-color-second">
                        Click here to update the profile
                      </b>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div>
                    <div className="d-flex align-items-center justify-content-cente">
                      <img
                        src={
                          "http://localhost:8080/api/user/" +
                          employee.userProfile.profilePic
                        }
                        className="rounded-circle profile-photo"
                        alt="Profile Pic"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          margin: "20px auto 10px", // Adjust margins as needed
                        }}
                      />
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-4">
                        <p className="mb-2">
                          <b>Bio:</b> {employee.userProfile.bio}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-2">
                          <b>Github:</b>
                          <br />
                          <Link
                            to={`${employee.userProfile.githubProfileLink}`}
                            className="text-color-second"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {employee.userProfile.githubProfileLink}
                          </Link>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-2">
                          <b>LinkedIn:</b>
                          <br />
                          <Link
                            to={`${employee.userProfile.linkedlnProfileLink}`}
                            className="text-color-second"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {employee.userProfile.linkedlnProfileLink}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <h4 className="text-color-second text-center mt-5">
                      Qualifications
                    </h4>
                    {(() => {
                      if (employee.userProfile.educations === null) {
                        return (
                          <div>
                            <h2>No Qualification</h2>
                          </div>
                        );
                      } else {
                        return (
                          <div className="mt-4">
                            {employee.userProfile.educations.map(
                              (education) => (
                                <div className="row mt-2">
                                  <div className="col-md-4">
                                    <p className="mb-2">
                                      <b>Degree:</b> {education.degree}
                                    </p>
                                  </div>
                                  <div className="col-md-4">
                                    <p className="mb-2">
                                      <b>Start Date:</b> {education.startDate}
                                    </p>
                                  </div>
                                  <div className="col-md-4">
                                    <p className="mb-2">
                                      <b>End Date:</b> {education.endDate}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (employee_jwtToken) {
                        return (
                          <div className="d-flex align-items-center justify-content-center mt-3">
                            <input
                              type="submit"
                              className="btn btn-md bg-color custom-bg-text mb-5"
                              value="Add"
                              onClick={() => showEmployeeQualificationModal()}
                            />
                          </div>
                        );
                      }
                    })()}
                    <h4 className="text-color-second text-center mt-2">
                      Skills
                    </h4>
                    {(() => {
                      if (employee.userProfile.skills === null) {
                        return (
                          <div>
                            <h2>No Skills</h2>
                          </div>
                        );
                      } else {
                        return (
                          <div className="mt-4">
                            {employee.userProfile.skills.map((skill) => (
                              <div className="row mt-2">
                                <div className="col-md-4">
                                  <p className="mb-2">
                                    <b>Skill:</b> {skill.skill}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <p className="mb-2">
                                    <b>Experience:</b> {skill.experience}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (employee_jwtToken) {
                        return (
                          <div className="d-flex align-items-center justify-content-center mt-3">
                            <input
                              type="submit"
                              className="btn btn-md bg-color custom-bg-text mb-5"
                              value="Add"
                              onClick={() => showEmployeeSkillModal()}
                            />
                          </div>
                        );
                      }
                    })()}
                    <h4 className="text-color-second text-center mt-2">
                      Work Experience
                    </h4>
                    {(() => {
                      if (employee.userProfile.skills === null) {
                        return (
                          <div>
                            <h2>No Skills</h2>
                          </div>
                        );
                      } else {
                        return (
                          <div className="mt-4">
                            {employee.userProfile.workExperiences.map(
                              (experience) => (
                                <div className="row mt-2">
                                  <div className="col-md-3">
                                    <p className="mb-2">
                                      <b>Company:</b> {experience.company}
                                    </p>
                                  </div>
                                  <div className="col-md-3">
                                    <p className="mb-2">
                                      <b>Position:</b> {experience.jobPosition}
                                    </p>
                                  </div>
                                  <div className="col-md-3">
                                    <p className="mb-2">
                                      <b>Start Date:</b> {experience.startDate}
                                    </p>
                                  </div>
                                  <div className="col-md-3">
                                    <p className="mb-2">
                                      <b>End Date:</b> {experience.endDate}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (employee_jwtToken) {
                        return (
                          <div className="d-flex align-items-center justify-content-center mt-3">
                            <input
                              type="submit"
                              className="btn btn-md bg-color custom-bg-text mb-5"
                              value="Add"
                              onClick={() => showEmployeeExperienceModal()}
                            />
                          </div>
                        );
                      }
                    })()}
                    <div className="d-flex align-items-center justify-content-center mt-3">
                      <input
                        type="submit"
                        className="btn btn-lg bg-color custom-bg-text mb-5"
                        value="Download Resume"
                        onClick={() => downloadResume()}
                      />
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>

      {/* employee skill modal */}
      <Modal show={showSkillModal} onHide={handleSkillClose} size="md">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Add Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Skill</b>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="skill"
                  onChange={handleUserSkillInput}
                  value={addSkill.skill}
                />
              </div>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Experience</b>
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  onChange={handleUserSkillInput}
                  value={addSkill.experience}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => addEmployeeSkill()}
                  class="btn bg-color custom-bg-text"
                >
                  Add Skill
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSkillClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* employee qualification modal */}
      <Modal
        show={showQualificationModal}
        onHide={handleQualificationClose}
        size="md"
      >
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Add Qualification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Degree</b>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="degree"
                  onChange={handleUserQualificationInput}
                  value={addQualification.degree}
                />
              </div>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Institution</b>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="institution"
                  onChange={handleUserQualificationInput}
                  value={addQualification.institution}
                />
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Start Date</b>
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  onChange={handleUserQualificationInput}
                  value={addQualification.startDate}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>End Date</b>
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  onChange={handleUserQualificationInput}
                  value={addQualification.endDate}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => addEmployeeQualification()}
                  class="btn bg-color custom-bg-text"
                >
                  Add Qualification
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleQualificationClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* employee work experience modal */}
      <Modal
        show={showExperienceModal}
        onHide={handleExperienceClose}
        size="md"
      >
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Add Work Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Company Name</b>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="company"
                  onChange={handleUserExperienceInput}
                  value={addExperience.company}
                />
              </div>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Job Position</b>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="jobPosition"
                  onChange={handleUserExperienceInput}
                  value={addExperience.jobPosition}
                />
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Experience</b>
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  onChange={handleUserExperienceInput}
                  value={addExperience.experience}
                />
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Start Date</b>
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  onChange={handleUserExperienceInput}
                  value={addExperience.startDate}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>End Date</b>
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  onChange={handleUserExperienceInput}
                  value={addExperience.endDate}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => addEmployeeWorkExperience()}
                  class="btn bg-color custom-bg-text"
                >
                  Add Experience
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExperienceClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeProfile;
