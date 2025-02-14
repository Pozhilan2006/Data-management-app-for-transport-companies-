import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataDisplayProps {
  vehicles: { id: string; plateNumber: string; model: string; isInTrip: boolean }[]
  drivers: { id: string; name: string; licenseNumber: string; isAvailable: boolean }[]
  trips: {
    id: string
    vehicleId: string
    driverId: string
    from: string
    to: string
    distance: number
    salary: number
    startTime: string
    endTime: string | null
    status: "assigned" | "in-progress" | "completed"
  }[]
  endTrip: (tripId: string) => void
}

export default function DataDisplay({ vehicles, drivers, trips, endTrip }: DataDisplayProps) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Current Data</h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">Vehicles</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plate Number</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.plateNumber}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.isInTrip ? "In Trip" : "Available"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="text-xl font-semibold mt-6 mb-2">Drivers</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.licenseNumber}</TableCell>
              <TableCell>{driver.isAvailable ? "Available" : "On Trip"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="text-xl font-semibold mt-6 mb-2">Trips</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Distance (km)</TableHead>
            <TableHead>Salary (₹)</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.from}</TableCell>
              <TableCell>{trip.to}</TableCell>
              <TableCell>{trip.distance}</TableCell>
              <TableCell>₹{trip.salary.toFixed(2)}</TableCell>
              <TableCell>{new Date(trip.startTime).toLocaleString()}</TableCell>
              <TableCell>{trip.status}</TableCell>
              <TableCell>
                {trip.status !== "completed" && <Button onClick={() => endTrip(trip.id)}>End Trip</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

