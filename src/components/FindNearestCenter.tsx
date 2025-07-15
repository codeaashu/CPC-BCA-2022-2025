import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MapPin, Search, Navigation, Phone, Star } from 'lucide-react';

interface FindNearestCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindNearestCenter = ({ isOpen, onClose }: FindNearestCenterProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState<any[]>([]);
  const [searchRadius] = useState(50);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await searchNearbyHospitals(`${latitude},${longitude}`);
        setSearchLocation('Current Location');
      },
      (error) => {
        toast.error('Unable to retrieve your location');
        console.error('Geolocation error:', error);
        setLoading(false);
      }
    );
  };

  const searchNearbyHospitals = async (location: string) => {
    setLoading(true);
    try {
      // Store the search
      if (user) {
        await supabase
          .from('location_searches')
          .insert({
            user_id: user.id,
            search_location: location,
            search_radius: searchRadius,
          });
      }

      // For now, we'll get all hospitals and sort them randomly
      // In a real app, you'd implement proper geospatial search
      const { data: hospitals, error } = await supabase
        .from('cancer_hospitals')
        .select('*')
        .limit(10);

      if (error) throw error;

      // Simulate distance calculation and sorting
      const hospitalsWithDistance = (hospitals || []).map(hospital => ({
        ...hospital,
        distance: Math.floor(Math.random() * 50) + 1, // Random distance for demo
      })).sort((a, b) => a.distance - b.distance);

      setNearbyHospitals(hospitalsWithDistance);
      
      // Update search results count
      if (user) {
        await supabase
          .from('location_searches')
          .update({ results_found: hospitalsWithDistance.length })
          .eq('user_id', user.id)
          .eq('search_location', location);
      }

      toast.success(`Found ${hospitalsWithDistance.length} cancer centers near you`);
    } catch (error) {
      console.error('Error searching nearby hospitals:', error);
      toast.error('Failed to search nearby hospitals');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchLocation.trim()) {
      toast.error('Please enter a location');
      return;
    }
    await searchNearbyHospitals(searchLocation);
  };

  const getDirections = (hospital: any) => {
    const address = `${hospital.address}, ${hospital.city}, ${hospital.state}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Find Nearest Cancer Centers
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <form onSubmit={handleManualSearch} className="space-y-4">
              <div>
                <Label htmlFor="location">Search Location</Label>
                <Input
                  id="location"
                  placeholder="Enter city, area, or pincode..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  {loading ? 'Searching...' : 'Search'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {nearbyHospitals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Nearby Cancer Centers ({nearbyHospitals.length} found)
              </h3>
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {nearbyHospitals.map((hospital) => (
                  <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{hospital.name}</CardTitle>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {hospital.city}, {hospital.state} • {hospital.distance} km away
                          </p>
                        </div>
                        {hospital.rating && (
                          <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{hospital.rating}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">{hospital.address}</p>
                        {hospital.phone && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {hospital.phone}
                          </p>
                        )}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => getDirections(hospital)}
                            className="flex items-center gap-1"
                          >
                            <Navigation className="h-3 w-3" />
                            Directions
                          </Button>
                          {hospital.phone && (
                            <Button 
                              size="sm"
                              onClick={() => window.open(`tel:${hospital.phone}`, '_self')}
                              className="flex items-center gap-1"
                            >
                              <Phone className="h-3 w-3" />
                              Call
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FindNearestCenter;