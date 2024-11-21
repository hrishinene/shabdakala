import { useState } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../lib/statuses'

type Props = {
  categoryName?: string
  tupleValue?: string
  size?: string
  className?: string; // Add this line to accept a className prop
}
//<AGA> : grid dimensions set by max_challenges(no. of rows) and max_word_length(no.of cells) in contants\settings.ts
export const CompletedCell = ({categoryName,tupleValue,size = 'small', className,}: Props) => {
  // State to manage background color

  const classes = classnames(
    'border-solid border-0 flex items-center justify-center mx-1 rounded dark:text-white', // Reduced font size
    "bg-[#fde047] text-black border-yellow-500 dark:bg-yellow-700 dark:border-yellow-700",
     {'w-[620px] h-[80px]': size === 'small' || size === "big" || size === " micro"} 
    
  )
  return (
    <button className={classes}>
     <div className="flex flex-col items-center">
        <span className='text-xl font-bold'> {categoryName}</span>
        <span className='text-xl font-sans'> {tupleValue}</span>
     </div>
    </button>
  )}
