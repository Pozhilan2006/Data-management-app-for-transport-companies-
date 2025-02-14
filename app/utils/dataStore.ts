export interface User {
  id: string
  username: string
  password: string
  role: "company" | "driver"
  companyId?: string // Only for drivers
}

export interface Vehicle {
  id: string
  companyId: string
  plateNumber: string
  model: string
  currentStatus: "available" | "in-use" | "maintenance"
  assignedDriverId: string | null
}

export interface Driver {
  id: string
  companyId: string
  name: string
  licenseNumber: string
  currentStatus: "available" | "on-trip" | "off-duty"
  assignedVehicleId: string | null
}

export interface Trip {
  id: string
  companyId: string
  vehicleId: string
  driverId: string
  startLocation: string
  endLocation: string
  date: string
  status: "scheduled" | "in-progress" | "completed"
}

export const users: User[] = [
  { id: "comp1", username: "company1", password: "pass1", role: "company" },
  { id: "driv1", username: "driver1", password: "pass2", role: "driver", companyId: "comp1" },
  { id: "driv2", username: "driver2", password: "pass3", role: "driver", companyId: "comp1" },
]

export let vehicles: Vehicle[] = [
  {
    id: "veh1",
    companyId: "comp1",
    plateNumber: "ABC123",
    model: "Toyota Corolla",
    currentStatus: "available",
    assignedDriverId: null,
  },
  {
    id: "veh2",
    companyId: "comp1",
    plateNumber: "XYZ789",
    model: "Honda Civic",
    currentStatus: "in-use",
    assignedDriverId: "driv1",
  },
]

export let drivers: Driver[] = [
  {
    id: "driv1",
    companyId: "comp1",
    name: "John Doe",
    licenseNumber: "DL12345",
    currentStatus: "on-trip",
    assignedVehicleId: "veh2",
  },
  {
    id: "driv2",
    companyId: "comp1",
    name: "Jane Smith",
    licenseNumber: "DL67890",
    currentStatus: "available",
    assignedVehicleId: null,
  },
]

export let trips: Trip[] = [
  {
    id: "trip1",
    companyId: "comp1",
    vehicleId: "veh2",
    driverId: "driv1",
    startLocation: "New York",
    endLocation: "Boston",
    date: "2023-06-15",
    status: "in-progress",
  },
]

export const addVehicle = (vehicle: Omit<Vehicle, "id" | "assignedDriverId">) => {
  const newVehicle = { ...vehicle, id: Date.now().toString(), assignedDriverId: null }
  vehicles.push(newVehicle)
  return newVehicle
}

export const updateVehicle = (vehicleId: string, updates: Partial<Vehicle>) => {
  vehicles = vehicles.map((vehicle) => (vehicle.id === vehicleId ? { ...vehicle, ...updates } : vehicle))
}

export const addDriver = (driver: Omit<Driver, "id" | "assignedVehicleId">) => {
  const newDriver = { ...driver, id: Date.now().toString(), assignedVehicleId: null }
  drivers.push(newDriver)
  return newDriver
}

export const updateDriver = (driverId: string, updates: Partial<Driver>) => {
  drivers = drivers.map((driver) => (driver.id === driverId ? { ...driver, ...updates } : driver))
}

export const assignVehicleToDriver = (vehicleId: string, driverId: string) => {
  updateVehicle(vehicleId, { assignedDriverId: driverId })
  updateDriver(driverId, { assignedVehicleId: vehicleId })
}

export const unassignVehicleFromDriver = (vehicleId: string, driverId: string) => {
  updateVehicle(vehicleId, { assignedDriverId: null })
  updateDriver(driverId, { assignedVehicleId: null })
}

export const addTrip = (trip: Omit<Trip, "id">) => {
  const newTrip = { ...trip, id: Date.now().toString() }
  trips.push(newTrip)
  return newTrip
}

export const updateTrip = (tripId: string, updates: Partial<Trip>) => {
  trips = trips.map((trip) => (trip.id === tripId ? { ...trip, ...updates } : trip))
}

