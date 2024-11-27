import classnames from 'classnames'
import { CCell } from './CCell'
import { iRow } from '../../lib/internal/iRow';
import { ZTuple } from '../../lib/internal/ZTuple';
import { iCell } from '../../lib/internal/iCell';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { Colors } from '../../constants/settings';

interface CRowProps {

  rowProto: iRow;
  onClick:(cellAddress:ZCellAddress)=>void;
}

// Completed Row Tuple contains the category name and the tuple value
function completedRowContent(tuple: ZTuple) {
  var color = Colors[tuple.difficulty].bgcolor;
  // var borderClass = "bg-orange-400"+color +"] text-black";
  const classes = classnames(
    "border-solid border-0 flex items-center justify-center mx-1 rounded text-black", // Reduced font size
    color,
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

function rowCells(cells: iCell[], onClick: (cellAddress: ZCellAddress) => void) {
  return (
    <div className="flex justify-center mb-1">
      {cells.map((cell, index) => (
        <CCell key={index} cellProto={cell} onClick = {onClick} />
      ))}
    </div>
  );
}

export const CRow = ({rowProto, onClick} : CRowProps) => {
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