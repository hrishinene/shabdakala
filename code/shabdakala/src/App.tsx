import {
  // InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  MenuAlt1Icon,
  MenuAlt3Icon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
// import { Alert } from './components/alerts/Alert'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import {
  GAME_TITLE,
  GAME_COPIED_MESSAGE,
} from './constants/strings'

import './App.css'
import {
  DotsVerticalIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import DropdownComponent from './components/modals/MenuModal'
import CGame from './components/game/CGame'
import { CStatsModal } from './components/modals/CStatsModal'

const ALERT_TIME_MS = 2500

//**dont know what this does yet
function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  // initialize
  // const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  // const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  // const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false
  )
  const [successAlert, setSuccessAlert] = useState('')

  // Mark the page as dark mode if the user prefers dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">

      <div className="flex container mt-2 items-center">

        {/* left-aligned div */}
        <div className="flex-1 text-left">
          <DropdownComponent/>
        </div>

        {/* center-aligned div */}
        <div className="flex-1 flex-col justify-center items-center pb-8 text-center">
          <h1 className="text-5xl font-bold dark:text-white text-center">
            {GAME_TITLE}
          </h1>
          <div>
            <span className="mt-2 text-2xl text-black dark:text-white">
              {new Date().toLocaleDateString("mr-IN", { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Right-aligned div */}
        <div className="flex flex-1 justify-end items-center space-x-2">
          {isDarkMode ? (
            <SunIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
          ) : (
            <MoonIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
          )}
          <QuestionMarkCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <DotsVerticalIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsAboutModalOpen(true)}
          />
        </div>
      </div>

      <hr />
      {/* New div for "Create groups of 3!" text */}
      <CGame />
      <div />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <CStatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <div />
    </div>
  )
}

export default App