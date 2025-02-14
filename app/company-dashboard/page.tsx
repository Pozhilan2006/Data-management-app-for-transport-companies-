"use client"

import { useState } from "react"
import VehicleForm from "../components/VehicleForm"
import DriverForm from "../components/DriverForm"
import TripManager from "../components/TripManager"
import DataDisplay from "../components/DataDisplay"

interface Vehicle {
  id: string
  plateNumber: string
  model: string
  isInTrip: boolean
}

interface Driver {
  id: string
  name: string
  licenseNumber: string
  isAvailable: boolean
}

interface Trip {
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
}

const RATE_PER_KM = 5 // ₹5 per kilometer

export default function CompanyDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [trips, setTrips] = useState<Trip[]>([])

  const addVehicle = (vehicle: Omit<Vehicle, "id" | "isInTrip">) => {
    setVehicles([...vehicles, { ...vehicle, id: Date.now().toString(), isInTrip: false }])
  }

  const addDriver = (driver: Omit<Driver, "id" | "isAvailable">) => {
    setDrivers([...drivers, { ...driver, id: Date.now().toString(), isAvailable: true }])
  }

  const startTrip = (vehicleId: string, driverId: string, from: string, to: string, distance: number) => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      vehicleId,
      driverId,
      from,
      to,
      distance,
      salary: distance * RATE_PER_KM,
      startTime: new Date().toISOString(),
      endTime: null,
      status: "assigned",
    }
    setTrips([...trips, newTrip])
    setVehicles(vehicles.map((v) => (v.id === vehicleId ? { ...v, isInTrip: true } : v)))
    setDrivers(drivers.map((d) => (d.id === driverId ? { ...d, isAvailable: false } : d)))
  }

  const endTrip = (tripId: string) => {
    setTrips(
      trips.map((t) => {
        if (t.id === tripId) {
          setVehicles(vehicles.map((v) => (v.id === t.vehicleId ? { ...v, isInTrip: false } : v)))
          setDrivers(drivers.map((d) => (d.id === t.driverId ? { ...d, isAvailable: true } : d)))
          return { ...t, endTime: new Date().toISOString(), status: "completed" }
        }
        return t
      }),
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VehicleForm addVehicle={addVehicle} />
        <DriverForm addDriver={addDriver} />
      </div>
      <TripManager
        vehicles={vehicles.filter((v) => !v.isInTrip)}
        drivers={drivers.filter((d) => d.isAvailable)}
        startTrip={startTrip}
      />
      <DataDisplay vehicles={vehicles} drivers={drivers} trips={trips} endTrip={endTrip} />
    </div>
  )
}

