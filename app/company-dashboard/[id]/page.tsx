"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  vehicles,
  drivers,
  trips,
  addVehicle,
  addDriver,
  addTrip,
  updateVehicle,
  updateDriver,
  assignVehicleToDriver,
  unassignVehicleFromDriver,
} from "../../utils/dataStore"
import { Layout } from "../../components/layout"
import { WorldMapBackground } from "../../components/world-map-background"
import { TruckIcon, UserIcon, MapPinIcon, UnlinkIcon, PlusCircleIcon, GlobeIcon } from "lucide-react"

const MotionCard = motion(Card)

export default function CompanyDashboard() {
  const { id } = useParams()
  const [companyVehicles, setCompanyVehicles] = useState(vehicles.filter((v) => v.companyId === id))
  const [companyDrivers, setCompanyDrivers] = useState(drivers.filter((d) => d.companyId === id))
  const [companyTrips, setCompanyTrips] = useState(trips.filter((t) => t.companyId === id))

  const [newVehicle, setNewVehicle] = useState({ plateNumber: "", model: "" })
  const [newDriver, setNewDriver] = useState({ name: "", licenseNumber: "" })
  const [newTrip, setNewTrip] = useState({ vehicleId: "", driverId: "", startLocation: "", endLocation: "", date: "" })

  const handleAddVehicle = () => {
    const vehicle = addVehicle({ ...newVehicle, companyId: id as string, currentStatus: "available" })
    setCompanyVehicles([...companyVehicles, vehicle])
    setNewVehicle({ plateNumber: "", model: "" })
  }

  const handleAddDriver = () => {
    const driver = addDriver({ ...newDriver, companyId: id as string, currentStatus: "available" })
    setCompanyDrivers([...companyDrivers, driver])
    setNewDriver({ name: "", licenseNumber: "" })
  }

  const handleAddTrip = () => {
    const trip = addTrip({ ...newTrip, companyId: id as string, status: "scheduled" })
    setCompanyTrips([...companyTrips, trip])
    setNewTrip({ vehicleId: "", driverId: "", startLocation: "", endLocation: "", date: "" })
    updateVehicle(newTrip.vehicleId, { currentStatus: "in-use" })
    updateDriver(newTrip.driverId, { currentStatus: "on-trip" })
  }

  const handleAssignVehicle = (vehicleId: string, driverId: string) => {
    assignVehicleToDriver(vehicleId, driverId)
    setCompanyVehicles(companyVehicles.map((v) => (v.id === vehicleId ? { ...v, assignedDriverId: driverId } : v)))
    setCompanyDrivers(companyDrivers.map((d) => (d.id === driverId ? { ...d, assignedVehicleId: vehicleId } : d)))
  }

  const handleUnassignVehicle = (vehicleId: string, driverId: string) => {
    unassignVehicleFromDriver(vehicleId, driverId)
    setCompanyVehicles(companyVehicles.map((v) => (v.id === vehicleId ? { ...v, assignedDriverId: null } : v)))
    setCompanyDrivers(companyDrivers.map((d) => (d.id === driverId ? { ...d, assignedVehicleId: null } : d)))
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
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8">Company Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                <TruckIcon className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyVehicles.length}</div>
                <p className="text-xs text-gray-500">Across various models</p>
              </CardContent>
            </MotionCard>

            <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                <UserIcon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyDrivers.length}</div>
                <p className="text-xs text-gray-500">Ready for assignments</p>
              </CardContent>
            </MotionCard>

            <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                <MapPinIcon className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {companyTrips.filter((t) => t.status === "in-progress").length}
                </div>
                <p className="text-xs text-gray-500">Currently on the road</p>
              </CardContent>
            </MotionCard>
          </div>

          <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                <TruckIcon className="mr-2 h-6 w-6" />
                Vehicles
              </CardTitle>
              <CardDescription>Manage your fleet of vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <Input
                  placeholder="Plate Number"
                  value={newVehicle.plateNumber}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })}
                  className="flex-1"
                />
                <Input
                  placeholder="Model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={handleAddVehicle} className="bg-blue-500 hover:bg-blue-600">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Add Vehicle
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plate Number</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Driver</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.plateNumber}</TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              vehicle.currentStatus === "available"
                                ? "bg-green-100 text-green-800"
                                : vehicle.currentStatus === "in-use"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {vehicle.currentStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          {vehicle.assignedDriverId
                            ? companyDrivers.find((d) => d.id === vehicle.assignedDriverId)?.name
                            : "Unassigned"}
                        </TableCell>
                        <TableCell>
                          {vehicle.assignedDriverId ? (
                            <Button
                              onClick={() => handleUnassignVehicle(vehicle.id, vehicle.assignedDriverId!)}
                              variant="outline"
                              size="sm"
                            >
                              <UnlinkIcon className="mr-2 h-4 w-4" /> Unassign
                            </Button>
                          ) : (
                            <Select onValueChange={(driverId) => handleAssignVehicle(vehicle.id, driverId)}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Assign Driver" />
                              </SelectTrigger>
                              <SelectContent>
                                {companyDrivers
                                  .filter((d) => !d.assignedVehicleId)
                                  .map((driver) => (
                                    <SelectItem key={driver.id} value={driver.id}>
                                      {driver.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </MotionCard>

          <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center">
                <UserIcon className="mr-2 h-6 w-6" />
                Drivers
              </CardTitle>
              <CardDescription>Manage your team of drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <Input
                  placeholder="Name"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  className="flex-1"
                />
                <Input
                  placeholder="License Number"
                  value={newDriver.licenseNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={handleAddDriver} className="bg-green-500 hover:bg-green-600">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Add Driver
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>License Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Vehicle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.licenseNumber}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              driver.currentStatus === "available"
                                ? "bg-green-100 text-green-800"
                                : driver.currentStatus === "on-trip"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {driver.currentStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          {driver.assignedVehicleId
                            ? companyVehicles.find((v) => v.id === driver.assignedVehicleId)?.plateNumber
                            : "Unassigned"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </MotionCard>

          <MotionCard initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center">
                <GlobeIcon className="mr-2 h-6 w-6" />
                Trips
              </CardTitle>
              <CardDescription>Manage your global trips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <Select
                  value={newTrip.vehicleId}
                  onValueChange={(value) => setNewTrip({ ...newTrip, vehicleId: value })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyVehicles
                      .filter((v) => v.currentStatus === "available" && v.assignedDriverId)
                      .map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.plateNumber}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Select value={newTrip.driverId} onValueChange={(value) => setNewTrip({ ...newTrip, driverId: value })}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyDrivers
                      .filter((d) => d.currentStatus === "available" && d.assignedVehicleId)
                      .map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Start Location"
                  value={newTrip.startLocation}
                  onChange={(e) => setNewTrip({ ...newTrip, startLocation: e.target.value })}
                  className="flex-1"
                />
                <Input
                  placeholder="End Location"
                  value={newTrip.endLocation}
                  onChange={(e) => setNewTrip({ ...newTrip, endLocation: e.target.value })}
                  className="flex-1"
                />
                <Input
                  type="date"
                  value={newTrip.date}
                  onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
                  className="w-[200px]"
                />
                <Button onClick={handleAddTrip} className="bg-red-500 hover:bg-red-600">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Add Trip
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Start Location</TableHead>
                      <TableHead>End Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyTrips.map((trip) => (
                      <TableRow key={trip.id}>
                        <TableCell>{vehicles.find((v) => v.id === trip.vehicleId)?.plateNumber}</TableCell>
                        <TableCell>{drivers.find((d) => d.id === trip.driverId)?.name}</TableCell>
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

