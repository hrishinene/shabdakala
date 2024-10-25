import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'

//<AGA> : this is where we are using max_word_length to decide number of cells in one row.
export const EmptyRow = () => {

  //<AGA> : this is old code for generating empty row
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))
    return (
    <div className="flex justify-center mb-2">
      {emptyCells.map((_, i) => (
        <Cell key={i} size='big' value = "WORD"/>
      ))}
    </div>
  )
  // const numCells = 4; // Static number of cells in a row

  // return (
  //   <div className="flex justify-center mb-1">
  //     {Array.from({ length: numCells }).map((_, i) => (
  //       <Cell key={i} value="A" size="big" />
  //     ))}
  //   </div>
  // );

}


