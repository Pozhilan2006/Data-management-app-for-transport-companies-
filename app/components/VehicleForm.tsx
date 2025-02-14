import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VehicleFormProps {
  addVehicle: (vehicle: { plateNumber: string; model: string }) => void
}

export default function VehicleForm({ addVehicle }: VehicleFormProps) {
  const [plateNumber, setPlateNumber] = useState("")
  const [model, setModel] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addVehicle({ plateNumber, model })
    setPlateNumber("")
    setModel("")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-muted rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="plateNumber">Plate Number</Label>
          <Input id="plateNumber" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <Button type="submit">Add Vehicle</Button>
      </div>
    </form>
  )
}

