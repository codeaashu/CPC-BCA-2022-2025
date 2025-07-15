import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import AboutUs from "./PageComponent/AboutUs";
import ContactUs from "./PageComponent/ContactUs";
import HomePage from "./PageComponent/HomePage";
import AddCategoryForm from "./CategoryComponent/AddCategoryForm";
import ViewAllCategories from "./CategoryComponent/ViewAllCategories";
import UpdateCategoryForm from "./CategoryComponent/UpdateCategoryForm";
import AddJobForm from "./JobComponent/AddJobForm";
import ViewEmployerJobs from "./JobComponent/ViewEmployerJobs";
import ViewAllJobs from "./JobComponent/ViewAllJobs";
import ViewAllEmployees from "./UserComponent/ViewAllEmployees";
import ViewAllEmployers from "./UserComponent/ViewAllEmployers";
import JobDetailPage from "./JobComponent/JobDetailPage";
import ViewEmployeeJobApplication from "./JobApplicationComponent/ViewEmployeeJobApplication";
import EmployeeProfile from "./UserComponent/EmployeeProfile";
import UpdateUserProfileForm from "./UserComponent/UpdateUserProfileForm";
import ViewEmployerJobApplication from "./JobApplicationComponent/ViewEmployerJobApplication";
import ViewAllJobApplication from "./JobApplicationComponent/ViewAllJobApplication";
import ViewJobApplications from "./JobApplicationComponent/ViewJobApplications";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/employee/register" element={<UserRegister />} />
        <Route path="/user/employer/register" element={<UserRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin/job/category/add" element={<AddCategoryForm />} />
        <Route path="/admin/job/category/all" element={<ViewAllCategories />} />
        <Route
          path="/admin/job/category/update"
          element={<UpdateCategoryForm />}
        />
        <Route path="/employer/job/post" element={<AddJobForm />} />
        <Route path="/employer/job/all" element={<ViewEmployerJobs />} />
        <Route path="/admin/job/all" element={<ViewAllJobs />} />
        <Route path="/admin/employee/all" element={<ViewAllEmployees />} />
        <Route path="/admin/employer/all" element={<ViewAllEmployers />} />
        <Route path="/job/:jobId/detail" element={<JobDetailPage />} />
        <Route
          path="/employee/job/application/all"
          element={<ViewEmployeeJobApplication />}
        />
        <Route path="/employee/profile/detail" element={<EmployeeProfile />} />
        <Route
          path="/employee/profile/update"
          element={<UpdateUserProfileForm />}
        />
        <Route
          path="/employer/job/application/all"
          element={<ViewEmployerJobApplication />}
        />
        <Route
          path="/admin/job/application/all"
          element={<ViewAllJobApplication />}
        />
        <Route
          path="/job/:jobId/application/all"
          element={<ViewJobApplications />}
        />
      </Routes>
    </div>
  );
}

export default App;
