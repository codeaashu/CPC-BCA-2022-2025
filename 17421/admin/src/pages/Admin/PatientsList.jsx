import React, { useEffect, useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Users, Plus, Activity, AlertCircle, Calendar, Search, Filter, Eye, Edit, Trash2, Mail, Phone, User, HomeIcon } from "lucide-react";
import { AppContext } from '../../context/AppContext';

const PatientsList = () => {
    const { getAllUsers, users,setUsers,aToken,handleDeletePatient } = useContext(AdminContext);
    const {calculateAge}  = useContext(AppContext)



    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [genderFilter, setGenderFilter] = useState("all");
    const [selectedPatient, setSelectedPatient] = useState(null);

    const filteredPatients = users.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || patient.status.toLowerCase() === statusFilter;
        const matchesGender = genderFilter === "all" || patient.gender.toLowerCase() === genderFilter;
        return matchesSearch && matchesStatus && matchesGender;
    });

  

    useEffect(() => {
        getAllUsers();
    }, [aToken]);

    return (

        
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-600" />
                Patient Management
              </h1>
              <p className="text-gray-600 mt-1">Manage and monitor patient information</p>
            </div>
          
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Patients", value: users.length, icon: <Users className="w-5 h-5 text-blue-600" />, color: "bg-blue-100" },
           
            { label: "Appointments Today", value: users.filter(p => p.nextAppointment === new Date().toISOString().split("T")[0]).length, icon: <Calendar className="w-5 h-5 text-blue-600" />, color: "bg-blue-100" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-40"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button className="border border-gray-300 rounded px-4 py-2 flex items-center hover:bg-gray-100">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          Showing {filteredPatients.length} of {users.length} patients
        </p>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {patient.image ? <img className='rounded-full w-9' src={patient.image} alt="" /> : (patient.name.split(" ").map((n) => n[0]).join(""))}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{patient.name}</h3>
                    <p className="text-sm text-gray-500">ID: {patient._id.slice(0,5)}</p>
                  </div>
                
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Age:</strong> {calculateAge(patient.dob)} years</p>
                  <p><strong>Gender:</strong> {patient.gender}</p>
                  <p className="flex items-center gap-1"><Phone className="w-4 h-4" /> {patient.phone}</p>
                  <p className="flex items-center gap-1"><Mail className="w-4 h-4" /> {patient.email}</p>
                  <p className="flex items-center gap-1"><HomeIcon className="w-4 h-4" /> {patient.address.line1}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => setSelectedPatient(patient)} className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" /> View
                </button>
                <button onClick={() => handleDeletePatient(patient._id)} className="flex-1 border border-red-300 rounded px-3 py-1 text-sm text-red-600 hover:bg-red-50 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center mt-6">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No patients found</h3>
        
            
          </div>
        )}

        {/* Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button onClick={() => setSelectedPatient(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
              <h2 className="text-xl font-bold mb-4">Patient Details</h2>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Age:</strong> {calculateAge(selectedPatient.dob)} years</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p><strong>Email:</strong> {selectedPatient.email}</p>
              <p><strong>address:</strong> {selectedPatient.address.line1} , {selectedPatient.address.line2}</p>
            </div>
          </div>
        )}
    
      </div>
    </div>
    

);

}

export default PatientsList;
