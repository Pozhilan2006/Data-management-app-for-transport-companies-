"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { trips, vehicles, drivers, updateTrip, updateVehicle, updateDriver } from "../../utils/dataStore"
import { Layout } from "../../components/layout"
import { WorldMapBackground } from "../../components/world-map-background"
import { PlayCircle, CheckCircle, TruckIcon, MapPinIcon, UserIcon } from "lucide-react"

const MotionCard = motion(Card)

export default function DriverDashboard() {
  const { id } = useParams()
  const [driverTrips, setDriverTrips] = useState(trips.filter((trip) => trip.driverId === id))
  const [assignedVehicle, setAssignedVehicle] = useState(vehicles.find((v) => v.assignedDriverId === id))
  const [driver, setDriver] = useState(drivers.find((d) => d.id === id))

  const handleStartTrip = (tripId: string) => {
    updateTrip(tripId, { status: "in-progress" })
    updateDriver(id as string, { currentStatus: "on-trip" })
    setDriverTrips(driverTrips.map((trip) => (trip.id === tripId ? { ...trip, status: "in-progress" } : trip)))
    setDriver({ ...driver!, currentStatus: "on-trip" })
  }

  const handleCompleteTrip = (tripId: string, vehicleId: string) => {
    updateTrip(tripId, { status: "completed" })
    updateDriver(id as string, { currentStatus: "available" })
    updateVehicle(vehicleId, { currentStatus: "available" })
    setDriverTrips(driverTrips.map((trip) => (trip.id === tripId ? { ...trip, status: "completed" } : trip)))
    setDriver({ ...driver!, currentStatus: "available" })
    setAssignedVehicle({ ...assignedVehicle!, currentStatus: "available" })
  }

  return (
    <Layout>
      <div className="relative">
        <WorldMapBackground />
        <motion.div
          className="space-y-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8">Driver Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Driver Status</CardTitle>
                <UserIcon className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{driver?.currentStatus}</div>
                <p className="text-xs text-gray-500">{driver?.name}</p>
              </CardContent>
            </MotionCard>

            <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned Vehicle</CardTitle>
                <TruckIcon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignedVehicle?.plateNumber || "Unassigned"}</div>
                <p className="text-xs text-gray-500">{assignedVehicle?.model || "No vehicle assigned"}</p>
              </CardContent>
            </MotionCard>

            <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                <MapPinIcon className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{driverTrips.filter((t) => t.status === "in-progress").length}</div>
                <p className="text-xs text-gray-500">Currently on the road</p>
              </CardContent>
            </MotionCard>
          </div>

          <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                <MapPinIcon className="mr-2 h-6 w-6" />
                Your Trips
              </CardTitle>
              <CardDescription>View and manage your assigned trips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Start Location</TableHead>
                      <TableHead>End Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {driverTrips.map((trip) => (
                      <TableRow key={trip.id}>
                        <TableCell>{vehicles.find((v) => v.id === trip.vehicleId)?.plateNumber}</TableCell>
                        <TableCell>{trip.startLocation}</TableCell>
                        <TableCell>{trip.endLocation}</TableCell>
                        <TableCell>{trip.date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              trip.status === "scheduled"
                                ? "bg-yellow-100 text-yellow-800"
                                : trip.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {trip.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {trip.status === "scheduled" && (
                            <Button onClick={() => handleStartTrip(trip.id)} className="bg-blue-500 hover:bg-blue-600">
                              <PlayCircle className="mr-2 h-4 w-4" /> Start Trip
                            </Button>
                          )}
                          {trip.status === "in-progress" && (
                            <Button
                              onClick={() => handleCompleteTrip(trip.id, trip.vehicleId)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" /> Complete Trip
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </MotionCard>
        </motion.div>
      </div>
    </Layout>
  )
}

