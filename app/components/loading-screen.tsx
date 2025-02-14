import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TruckIcon } from "lucide-react"

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <motion.div
        className="text-white text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ x: ["-50%", "50%", "-50%"] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
        >
          <TruckIcon className="h-16 w-16 mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold">DriveLink</h1>
      </motion.div>
    </motion.div>
  )
}

