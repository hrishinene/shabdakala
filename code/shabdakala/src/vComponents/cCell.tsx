import { useState } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../lib/statuses'

type Props = {
  value?: string
  status?: CharStatus,
  size?: string
  onChar?: (value: string) => void
  className?: string; // Add this line to accept a className prop
}
//<AGA> : grid dimensions set by max_challenges(no. of rows) and max_word_length(no.of cells) in contants\settings.ts
export const Cell = ({ value, status, size = 'small', onChar, className}: Props) => {
  // State to manage background color
  const [clicked, setClicked] = useState(false)
  const [rowCompleted, setRowCompleted] = useState(false)

  const classes = classnames(
    'border-solid border-0 flex items-center justify-center mx-1 text-xl font-bold rounded dark:text-white', // Reduced font size
    {
      //'bg-custom-light-gray dark:bg-slate-800 border-slate-300 dark:border-slate-600': !status && !clicked,
      'bg-[#f4f4f5] dark:bg-slate-800 border-slate-300 dark:border-slate-600': !status && !clicked,
      // 'bg-[#efefe6] dark:bg-slate-800 border-slate-300 dark:border-slate-600': !status && !clicked,
      // 'bg-red-500 dark:bg-slate-800 border-slate-400 dark:border-slate-600': !status && !clicked,
      //"bg-[#fde047] text-white border-yellow-500 dark:bg-yellow-700 dark:border-yellow-700":!status && !clicked,
      'bg-custom-dark-gray text-white': clicked,
      'bg-white text-black': !clicked && value,
      'border-black dark:border-slate-100': value && !status,
      // 'shadowed bg-slate-500 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700': status === 'absent',
      // 'shadowed bg-lime-500 text-white border-lime-500': status === 'correct',
      // 'shadowed bg-yellow-500 dark:bg-yellow-700 text-white border-yellow-500 dark:border-yellow-700': status === 'present',
      'cell-animation': !!value,
      'w-[150px] h-[80px]': size === 'small' || size === "big" || size === " micro",  
      // 'w-40 h-24': size === 'big',     // Increased size for big
      // 'w-28 h-16': size === 'micro',   // Increased size for micro
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onChar && value) {
      onChar(value)
    }
    
    if(clicked==true){
      setClicked(false)
    }
    else{
      setClicked(true)
    }
    // Set the clicked state to true to change the background color to grey
   
  }

  return (
    <button className={classes} onClick={handleClick}>
      {value}
    </button>
  )}
