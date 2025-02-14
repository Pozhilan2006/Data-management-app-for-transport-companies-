"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Trip {
  id: string
  from: string
  to: string
  distance: number
  salary: number
  startTime: string
  status: "assigned" | "in-progress" | "completed"
}

const RATE_PER_KM = 5 // ₹5 per kilometer

export default function DriverDashboard() {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    setTrips([
      {
        id: "1",
        from: "Mumbai, Maharashtra",
        to: "Pune, Maharashtra",
        distance: 150,
        salary: 150 * RATE_PER_KM,
        startTime: "2023-06-01 09:00",
        status: "assigned",
      },
      {
        id: "2",
        from: "Delhi",
        to: "Jaipur, Rajasthan",
        distance: 280,
        salary: 280 * RATE_PER_KM,
        startTime: "2023-06-03 10:00",
        status: "assigned",
      },
      {
        id: "3",
        from: "Bengaluru, Karnataka",
        to: "Chennai, Tamil Nadu",
        distance: 350,
        salary: 350 * RATE_PER_KM,
        startTime: "2023-06-05 08:00",
        status: "assigned",
      },
    ])
  }, [])

  const startTrip = (tripId: string) => {
    setTrips(trips.map((trip) => (trip.id === tripId ? { ...trip, status: "in-progress" as const } : trip)))
  }

  const completeTrip = (tripId: string) => {
    setTrips(trips.map((trip) => (trip.id === tripId ? { ...trip, status: "completed" as const } : trip)))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Trips</CardTitle>
          <CardDescription>View and manage your assigned trips</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <TableCell>{trip.startTime}</TableCell>
                  <TableCell>{trip.status}</TableCell>
                  <TableCell>
                    {trip.status === "assigned" && <Button onClick={() => startTrip(trip.id)}>Start Trip</Button>}
                    {trip.status === "in-progress" && (
                      <Button onClick={() => completeTrip(trip.id)}>Complete Trip</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

