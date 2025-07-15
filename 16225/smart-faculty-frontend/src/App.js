// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import History from './pages/student/History';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddStudent from './pages/admin/AddStudent';
import AddFaculty from './pages/admin/AddFaculty';
import AddRoutine from './pages/admin/AddRoutine';
import AssignSubstitute from './pages/admin/AssignSubstitute';
import ViewReport from './pages/admin/ViewReport';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-dashboard/history" element={<History />} />

        {/* Faculty Routes */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

        {/* Admin Routes with nested layout */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<ViewReport />} /> {/* Default page */}
          <Route path="add-student" element={<AddStudent />} />
          <Route path="add-faculty" element={<AddFaculty />} />
          <Route path="add-routine" element={<AddRoutine />} />
          <Route path="assign-substitute" element={<AssignSubstitute />} />
          <Route path="view-report" element={<ViewReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
