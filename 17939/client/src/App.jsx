import { useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Static Pages
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Press from './pages/Press';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Careers from './pages/Careers';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// ✅ New: Analytics Page
import RecruiterAnalytics from './pages/RecruiterAnalytics';

// ✅ New: Recruiter Forgot Password Page
import RecruiterForgotPassword from './pages/RecruiterForgotPassword';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        {showRecruiterLogin && <RecruiterLogin />}
        <ToastContainer />
        <Routes>
          {/* ✅ Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/apply-job/:id' element={<ApplyJob />} />
          <Route path='/applications' element={<Applications />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/help' element={<HelpCenter />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/press' element={<Press />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />

          {/* ✅ Recruiter-specific */}
          <Route path='/recruiter-forgot-password' element={<RecruiterForgotPassword />} />

          {/* ✅ Dashboard Routes */}
          <Route path='/dashboard' element={<Dashboard />}>
            {companyToken && (
              <>
                <Route path='add-job' element={<AddJob />} />
                <Route path='manage-jobs' element={<ManageJobs />} />
                <Route path='view-applications' element={<ViewApplications />} />
                <Route path='analytics' element={<RecruiterAnalytics />} />
              </>
            )}
          </Route>
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
