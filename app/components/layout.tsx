import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { LoadingScreen } from "./loading-screen"
import { GlobeIcon, MenuIcon } from "lucide-react"
import Link from "next/link"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <GlobeIcon className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">WorldWide Transit</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/company-dashboard"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
              <Link
                href="/vehicles"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Vehicles
              </Link>
              <Link
                href="/drivers"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Drivers
              </Link>
              <Link
                href="/trips"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Trips
              </Link>
            </nav>
            <button className="md:hidden text-gray-600 dark:text-gray-300">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </header>
        <motion.main
          className="flex-grow container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
        <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
            © 2023 WorldWide Transit. Connecting the world, one journey at a time.
          </div>
        </footer>
      </div>
    </>
  )
}

