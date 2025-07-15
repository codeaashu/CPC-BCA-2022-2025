import { Link } from "react-router-dom";
import dollor from "../images/dollor_logo.png";
import timing from "../images/timing_logo.png";
import experience from "../images/experience_logo.png";

const JobCard = (job) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  return (
    <div className="col">
      <Link
        to={`/job/${job.item.id}/detail`}
        className="card job-card rounded-card h-100 shadow-lg"
        style={{ textDecoration: "none" }}
      >
        <div className="row g-0">
          {/* Left side - Company Logo */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={"http://localhost:8080/api/job/" + job.item.companyLogo}
              className="card-img-top rounded img-fluid"
              alt="Company Logo"
            />
          </div>
          {/* Right side - Job Details */}
          <div className="col-md-8">
            <div className="card-body text-color">
              <h3 className="card-title d-flex justify-content-between text-color-second">
                <div>
                  <b>{job.item.title}</b>
                </div>
              </h3>
              <b className="card-text">
                {descriptionToShow(job.item.description, 50)}
              </b>
              <div className="mt-2">
                <b>
                  <span className="text-color-second">Category:</span>{" "}
                  {job.item.category.name}
                </b>
              </div>

              <div className="d-flex justify-content-between text-color-second mt-3">
                <b>
                  <img
                    src={timing}
                    height="25"
                    width="auto"
                    class="d-inline-block align-top me-2"
                    alt=""
                  />
                  {job.item.jobType}
                </b>
                <b>
                  <img
                    src={dollor}
                    height="23"
                    width="auto"
                    class="d-inline-block align-top"
                    alt=""
                  />
                  {job.item.salaryRange}
                </b>

                <b>
                  <img
                    src={experience}
                    height="25"
                    width="auto"
                    class="d-inline-block align-top me-2"
                    alt=""
                  />
                  {job.item.experienceLevel}
                </b>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
