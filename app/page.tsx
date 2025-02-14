"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "./components/layout"
import { users } from "./utils/dataStore"
import { LockIcon, UserIcon, TruckIcon, CarIcon, BusIcon } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find((u) => u.username === username && u.password === password)
    if (user) {
      switch (user.role) {
        case "company":
          router.push(`/company-dashboard/${user.id}`)
          break
        case "driver":
          router.push(`/driver-dashboard/${user.id}`)
          break
      }
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-[350px] bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-blue-600 dark:text-blue-400">
                Login to DriveLink
              </CardTitle>
              <CardDescription className="text-center">Your gateway to efficient transport</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-2 top-2.5 h-4 w-4 text-blue-500" />
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      className="pl-8 border-blue-300 focus:border-blue-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-blue-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-8 border-blue-300 focus:border-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" type="submit">
                  Login
                </Button>
              </form>
              <div className="mt-6 flex justify-center space-x-4">
                <TruckIcon className="h-8 w-8 text-blue-500" />
                <CarIcon className="h-8 w-8 text-green-500" />
                <BusIcon className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}

