import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TripManagerProps {
  vehicles: { id: string; plateNumber: string }[]
  drivers: { id: string; name: string }[]
  startTrip: (vehicleId: string, driverId: string, from: string, to: string, distance: number) => void
}

export default function TripManager({ vehicles, drivers, startTrip }: TripManagerProps) {
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [selectedDriver, setSelectedDriver] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [distance, setDistance] = useState("")

  const handleStartTrip = () => {
    if (selectedVehicle && selectedDriver && from && to && distance) {
      startTrip(selectedVehicle, selectedDriver, from, to, Number(distance))
      setSelectedVehicle("")
      setSelectedDriver("")
      setFrom("")
      setTo("")
      setDistance("")
    }
  }

  return (
    <div className="mt-6 p-4 bg-muted rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Assign a Trip</h2>
      <div className="space-y-4">
        <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
          <SelectTrigger>
            <SelectValue placeholder="Select a vehicle" />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map((vehicle) => (
              <SelectItem key={vehicle.id} value={vehicle.id}>
                {vehicle.plateNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDriver} onValueChange={setSelectedDriver}>
          <SelectTrigger>
            <SelectValue placeholder="Select a driver" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map((driver) => (
              <SelectItem key={driver.id} value={driver.id}>
                {driver.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter starting location"
          />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter destination" />
        </div>
        <div>
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance in kilometers"
          />
        </div>
        <Button onClick={handleStartTrip} disabled={!selectedVehicle || !selectedDriver || !from || !to || !distance}>
          Assign Trip
        </Button>
      </div>
    </div>
  )
}

