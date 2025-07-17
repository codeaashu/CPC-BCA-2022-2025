import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userToken,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      if (!resume) return toast.error('Please select a resume file');

      const formData = new FormData();
      formData.append('resume', resume);

      const { data } = await axios.post(`${backendUrl}/api/users/update-resume`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        await fetchUserData(); // refresh userData
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (userToken) {
      fetchUserApplications();
    }
  }, [userToken]);

  return userData ? (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>

        <div className='flex gap-2 mb-6 mt-3'>
          {isEdit || !userData.resume ? (
            <>
              <label className='flex items-center cursor-pointer' htmlFor='resumeUpload'>
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>
                  {resume ? resume.name : 'Select Resume'}
                </p>
                <input
                  id='resumeUpload'
                  type='file'
                  accept='application/pdf'
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <img src={assets.profile_upload_icon} alt='upload' />
              </label>
              <button
                onClick={updateResume}
                className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={userData.resume}
                className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'
              >
                View Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.length > 0 ? (
              userApplications.map((job, index) => (
                <tr key={index}>
                  <td className='py-3 px-4 flex items-center gap-2 border-b'>
                    <img className='w-8 h-8' src={job.companyId.image} alt='company-logo' />
                    {job.companyId.name}
                  </td>
                  <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>
                    {moment(job.date).format('ll')}
                  </td>
                  <td className='py-2 px-4 border-b'>
                    <span
                      className={`${
                        job.status === 'Accepted'
                          ? 'bg-green-100'
                          : job.status === 'Rejected'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='py-4 px-4 text-gray-500' colSpan='5'>
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Applications;
