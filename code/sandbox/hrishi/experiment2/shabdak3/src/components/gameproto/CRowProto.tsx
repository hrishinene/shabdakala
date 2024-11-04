import classnames from 'classnames'
import { CCellProto } from './CCellProto'
import { iRowProto } from '../../lib/internal/iRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZTuple } from '../../lib/internal/ZTuple';
import { iCellProto } from '../../lib/internal/iCellProto';

interface CRowProtoProps {

  rowProto: iRowProto;
  onClick:(cellAddress:number)=>void;
}

// Completed Row Tuple contains the category name and the tuple value
function completedRowContent(tuple: ZTuple) {
  const classes = classnames(
    'border-solid border-0 flex items-center justify-center mx-1 rounded dark:text-white', // Reduced font size
    "bg-[#fde047] text-black border-yellow-500 dark:bg-yellow-700 dark:border-yellow-700",
     'w-[620px] h-[80px]')

  const thm = tuple.theme
  const wrds = tuple.words.join(',');
  return (
    <div className="flex justify-center mb-2">

    <button className={classes}>
     <div className="flex flex-col items-center">
        <span className='text-xl font-bold'> {thm} </span>
        <span className='text-xl font-sans'> {wrds} </span>
     </div>
    </button>
    </div>
  )
}

function rowCells(cells: iCellProto[], onClick: (cellAddress: number) => void) {
  return (
    <div className="flex justify-center mb-1">
      {cells.map((cell, index) => (
        <CCellProto key={index} cellProto={cell} onClick = {onClick} />
      ))}
    </div>
  );
}

export const CRowProto = ({rowProto, onClick} : CRowProtoProps) => {
  // if row is complete, paint the entire row
  if (rowProto.isComplete()) {
    const tuple = rowProto.getTuple();
    if (tuple) {
      return completedRowContent(tuple);
    }
    // Handle the case where tuple is undefined if necessary
    return null;
  } else {
    // Show the cells
    return rowCells(rowProto.getCells(), onClick);
  }
}