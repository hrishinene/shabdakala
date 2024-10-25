
// import { getAkshars } from '../../lib/statuses'
// import { getGuessStatuses } from '../../lib/statuses'
// import { KeyVal } from '../../lib/statuses'
import { AksharStatus, getAksharAndKeyStatuses, GuessKeyMap } from '../lib/statuses'
import { CompletedCell } from './cCompletedCell'


export const CompletedRow = () => {
  // const statuses = getGuessStatuses(guess);
  //const guessAndKeyStatuses:GuessKeyMap = getAksharAndKeyStatuses([guess]);
  // console.log(guessAndKeyStatuses); 
  // const charstatuses = getStatuses([guess]);
  // const guessChars : CharForm[] = getAkshars(guess);

//   return (
//     <div className="flex justify-center mb-1">
//         style={{
//         width: `150px`, // Total width for 4 cells with gaps
//         height: '80px', // Same height as the big cell size
//         backgroundColor: '#facc15', // Yellow color
//         borderRadius: '8px', // Optional rounded edges
//       }}
//     </div>
//   )
const emptyCells = Array.from(Array(1))
return (
<div className="flex justify-center mb-2">
  {emptyCells.map((_, i) => (
    <CompletedCell key={i} size='big' categoryName="मराठी चित्रपट" tupleValue = "देऊळ, ही वाट पंढरीची, संत तुकाराम, धूमधडाका" />
  ))}
</div>
)
}
