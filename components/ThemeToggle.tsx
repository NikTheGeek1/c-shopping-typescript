"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { FaMoon } from "react-icons/fa"
import { HiSun } from "react-icons/hi"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    >
      {theme === "dark" ? (
      <HiSun className="h-5 w-5 text-yellow-500" />
      ) : (
      <FaMoon className="h-5 w-5 text-gray-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
