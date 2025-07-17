import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, Stethoscope } from 'lucide-react'

export default function MyComponents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Book Now
        </Button>
      </CardContent>
    </Card>
  )
}