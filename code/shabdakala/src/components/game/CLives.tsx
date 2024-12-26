import { useState } from 'react'
import Timer from '../modals/Timer'
import { iGame } from '../../lib/internal/iGame'

type Props = {
  mistake : number
  timeSpentSeconds: number
  game: iGame
}

export const CLives=({mistake, timeSpentSeconds, game}: Props)=>{
const round = Array.from(Array(mistake))

return(
<div className="text-center py-4">
    {/* <h3 className="text-base font-sans text-black">Mistakes Remaining:  */}
    <h3 className="text-xl font-extrabold font-sans text-black dark:text-white mb-2">शिल्लक संधी: 
      {round.map((_, i) => (
        <span key={i} className="inline-block w-3.5 h-3.5 bg-custom-dark-gray dark:bg-custom-light-gray rounded-full mx-1"></span>
      ))}
      {/* <span className="inline-block w-3.5 h-3.5 bg-custom-dark-gray rounded-full mx-1"></span>
        <span  className="inline-block w-3.5 h-3.5 bg-custom-dark-gray rounded-full mx-1"></span>
        <span  className="inline-block w-3.5 h-3.5 bg-custom-dark-gray rounded-full mx-1"></span> */}
    </h3>
    <Timer startTime={timeSpentSeconds} game = {game}/>
  </div>
)
}