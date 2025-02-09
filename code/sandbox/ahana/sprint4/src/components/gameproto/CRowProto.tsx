import classnames from 'classnames'
import { CCellProto } from './CCellProto'
import { iRowProto } from '../../lib/internal/iRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZTuple } from '../../lib/internal/ZTuple';
import { iCellProto } from '../../lib/internal/iCellProto';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import {easeIn, motion} from 'framer-motion'

interface CRowProtoProps {

  rowProto: iRowProto;
  onClick:(cellAddress:ZCellAddress)=>void;
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
    <motion.div className="flex justify-center mb-2" initial={{ opacity: 0, y: -50}} 
    animate={{ opacity: 1, y: 0 }} transition={{ease: 'easeIn' ,duration: 0.4}} >
    <button className={classes}>
     <div className="flex flex-col items-center">
        <span className='text-xl font-bold'> {thm} </span>
        <span className='text-xl font-sans'> {wrds} </span>
     </div>
    </button>
    </motion.div>
  )
}

function rowCells(cells: iCellProto[], onClick: (cellAddress: ZCellAddress) => void) {
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