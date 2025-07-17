import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// ✅ Import icons from react-icons (Feather, Heroicons)
import { FiPlusCircle, FiHome, FiUsers, FiBarChart2, FiLogOut } from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { BsPersonCheck } from 'react-icons/bs'

const Dashboard = () => {
  const navigate = useNavigate()
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

  const logout = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs')
    }
  }, [companyData])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="backdrop-blur bg-white/80 border-b shadow-sm sticky top-0 z-50 px-4 sm:px-8 py-2 flex justify-between items-center">
        {/* Logo and Admin Panel */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <HiOutlineOfficeBuilding className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700 tracking-wide">
            Admin Panel
          </h1>
        </div>

        {/* Welcome & Logout */}
        {companyData && (
          <div className="flex items-center gap-3">
            <p className="text-base font-medium hidden sm:block">
              Welcome,<span className="text-blue-600"> {companyData.name}</span>
            </p>
            <div className="relative group">
              <img
                className="w-8 h-8 rounded-full border hover:ring-2 ring-blue-400"
                src={companyData.image}
                alt="User"
              />
              <div className="absolute hidden group-hover:block top-full right-0 z-10 mt-1 text-black rounded shadow-lg">
                <ul className="bg-white border rounded-md text-sm">
                  <li
                    onClick={logout}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FiLogOut className="w-4 h-4 text-red-500" />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Dashboard Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 sm:w-60 min-h-screen border-r bg-white shadow-sm">
          <nav className="pt-6">
            <ul className="flex flex-col text-sm sm:text-base">
              <NavLink
                to="/dashboard/add-job"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                  }`
                }
              >
                <FiPlusCircle className="w-5 h-5" />
                <span>Add Job</span>
              </NavLink>

              <NavLink
                to="/dashboard/manage-jobs"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                  }`
                }
              >
                <FiHome className="w-5 h-5" />
                <span>Manage Jobs</span>
              </NavLink>

              <NavLink
                to="/dashboard/view-applications"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                  }`
                }
              >
                <BsPersonCheck className="w-5 h-5" />
                <span>View Applications</span>
              </NavLink>

              {/* ✅ Analytics Section */}
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                  }`
                }
              >
                <FiBarChart2 className="w-5 h-5" />
                <span>Analytics</span>
              </NavLink>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
