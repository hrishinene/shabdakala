import { useState } from 'react'

type Props = {
  mistake : number
}

export const CLivesProto=({mistake}: Props)=>{
const round = Array.from(Array(mistake))

return(
<div className="text-center py-4">
        {/* <h3 className="text-base font-sans text-black">Mistakes Remaining:  */}
        <h3 className="text-base font-sans text-black dark:text-white">शिल्लक चुका: 
        {round.map((_, i) => (
        <span key={i} className="inline-block w-3.5 h-3.5 bg-custom-dark-gray dark:bg-custom-light-gray rounded-full mx-1"></span>
      ))}
        {/* <span className="inline-block w-3.5 h-3.5 bg-custom-dark-gray rounded-full mx-1"></span>
        <span  className="inline-block w-3.5 h-3.5 bg-custom-dark-gray rounded-full mx-1"></span>
        <span  className="inline-block w-3.5 h-3.5 bg-custom-dark-gray rounded-full mx-1"></span> */}
        </h3>
    </div>
      )
}