import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DriverFormProps {
  addDriver: (driver: { name: string; licenseNumber: string }) => void
}

export default function DriverForm({ addDriver }: DriverFormProps) {
  const [name, setName] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addDriver({ name, licenseNumber })
    setName("")
    setLicenseNumber("")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-muted rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Driver</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input id="licenseNumber" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />
        </div>
        <Button type="submit">Add Driver</Button>
      </div>
    </form>
  )
}

