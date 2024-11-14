import classnames from 'classnames'
import { CCellProto } from './CCellProto'
import { iRowProto } from '../../lib/internal/iRowProto';
import { ZTuple } from '../../lib/internal/ZTuple';
import { iCellProto } from '../../lib/internal/iCellProto';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { Colors } from '../../constants/settings';

interface CRowProtoProps {

  rowProto: iRowProto;
  onClick:(cellAddress:ZCellAddress)=>void;
}

// Completed Row Tuple contains the category name and the tuple value
function completedRowContent(tuple: ZTuple) {
  var color = Colors[tuple.difficulty].background;
  var colorClass = "bg-["+color +"] text-black";
  const classes = classnames(
    "border-solid border-0 flex items-center justify-center mx-1 rounded", // Reduced font size
    colorClass,
     "w-[620px] h-[80px]")
     

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