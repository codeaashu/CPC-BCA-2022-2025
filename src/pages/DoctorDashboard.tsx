import { useState, useEffect } from 'react';
import { useDoctorAuth } from '@/contexts/DoctorAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Phone, Mail, LogOut, Settings, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DoctorHeader from '@/components/DoctorHeader';
import Footer from '@/components/Footer';

interface Appointment {
  id: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status: string;
  phone_number: string;
  email?: string;
  symptoms_description?: string;
  notes?: string;
}

const DoctorDashboard = () => {
  const { user, doctorProfile, signOut, loading } = useDoctorAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/doctor/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (doctorProfile?.id) {
      fetchAppointments();
    }
  }, [doctorProfile?.id]);

  const fetchAppointments = async () => {
    if (!doctorProfile?.id) {
      setAppointmentsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_profile_id', doctorProfile.id)
        .order('appointment_date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
        return;
      }

      setAppointments(data || []);
    } catch (error) {
      console.error('Error in fetchAppointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setAppointmentsLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) {
        toast.error('Failed to update appointment status');
        return;
      }

      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
      
      toast.success('Appointment status updated');
    } catch (error) {
      toast.error('Failed to update appointment status');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/doctor/auth');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader />

      {/* Welcome Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-gray-600">Welcome, Dr. {doctorProfile.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {appointments.filter(a => a.status === 'pending').length}
                  </div>
                  <p className="text-sm text-gray-600">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {appointments.filter(a => new Date(a.appointment_date).toDateString() === new Date().toDateString()).length}
                  </div>
                  <p className="text-sm text-gray-600">Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {appointments.length}
                  </div>
                  <p className="text-sm text-gray-600">Total</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Patient Appointments</CardTitle>
                <CardDescription>
                  Manage your upcoming and past appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading appointments...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No appointments scheduled yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">{appointment.patient_name}</span>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.appointment_time}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4" />
                                <span>{appointment.phone_number}</span>
                              </div>
                              {appointment.email && (
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-4 w-4" />
                                  <span>{appointment.email}</span>
                                </div>
                              )}
                            </div>

                            <div className="text-sm">
                              <span className="font-medium">Type:</span> {appointment.appointment_type}
                            </div>

                            {appointment.symptoms_description && (
                              <div className="text-sm">
                                <span className="font-medium">Symptoms:</span> {appointment.symptoms_description}
                              </div>
                            )}

                            {appointment.notes && (
                              <div className="text-sm">
                                <span className="font-medium">Notes:</span> {appointment.notes}
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            {appointment.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>
                  Your professional information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{doctorProfile.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{doctorProfile.phone_number || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1 text-sm text-gray-900">{doctorProfile.specialization || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {doctorProfile.experience_years ? `${doctorProfile.experience_years} years` : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Qualification</label>
                    <p className="mt-1 text-sm text-gray-900">{doctorProfile.qualification || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" onClick={() => navigate('/doctor/profile')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;