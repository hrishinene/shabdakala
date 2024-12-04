import {
  // InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
// import { Alert } from './components/alerts/Alert'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import {
  GAME_TITLE,
  GAME_COPIED_MESSAGE,
  GAME_ENCODE_URL,
} from './constants/strings'

import './App.css'
import {
  DotsVerticalIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import DropdownComponent from './components/modals/MenuModal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CGame from './components/game/CGame'
import { CStatsModal } from './components/modals/CStatsModal'
import { getDateUrl } from './lib/Utils'

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

  const handleDateChange = (date: Date | null, event?: React.SyntheticEvent) => {
    console.log(date)
    if (date) {
      setSelectedDate(date)
    }
  }

  const navigationLink = () => {
    console.log("navigate to archive game dated: " + selectedDate)
    return getDateUrl(GAME_ENCODE_URL, selectedDate);
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
      <div className="text-center py-1 mt-1 space-x-1"/>
      <hr />
      <div className="text-center py-1 mt-1 space-x-1">
        {/* <h3 className="text-lg font-sans text-black">Create groups of 4!</h3> */}
        <h3 className="text-lg font-sans text-black dark:text-white">शब्दबंध संग्रहातून</h3>
        <div className="text-center flex justify-center mt-2 space-x-2" >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date("2024-12-01")}
          maxDate={new Date()}
          dateFormat="MMMM dd, yyyy"
          className="p-2 rounded-2xl border-1 border-gray-500 dark:border-gray-50 text-center bg-gray-300 dark:bg-gray-100"
          />
          </div>
          <div className="flex justify-center mt-2 space-x-2">
           <button
              className={"px-4 py-2 rounded-3xl mb-2 bg-gray-500 dark:bg-gray-50 text-white dark:text-black" }
            >
             <a href={navigationLink()} rel="noopener noreferrer">खेळा</a>
            </button>
            </div>
      </div>
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