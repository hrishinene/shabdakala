import classnames from 'classnames'
import { iCell } from "../../lib/internal/iCell";
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { Colors } from '../../constants/settings';


interface CCellProps {
  cellProto: iCell;
  onClick:(cellAddress:ZCellAddress)=>void;
}

function handleCellClick(cellProt: iCell, onClickCallback: (cellAddress: ZCellAddress) => void) {
  cellProt.selectCell();
  onClickCallback(cellProt.address);
}

export const CCell = ({cellProto, onClick} : CCellProps) => {
  var color = Colors[0].bgcolor;
  if (cellProto.isHinted) {
    color = Colors[cellProto.wordDifficulty].bgcolor;
  }

  const classes = classnames(
    'w-[150px] h-[80px]',
    'border-solid border-2 dark:border-0 flex items-center justify-center mx-1 text-xl font-bold rounded dark:text-white', // Reduced font size
    'border-black dark:border-slate-100',
    'cell-animation',
    {
      [color] : cellProto.isHinted,
      'shadow-2xl shadow-black dark : shadow-slate-600': cellProto.isHinted,
      'bg-[#f4f4f5] dark:bg-slate-800 border-slate-300 dark:border-slate-600': !cellProto.isSelected && !cellProto.isHinted,
      'bg-custom-dark-gray text-white': cellProto.isSelected,
      'bg-white text-black': !cellProto.isSelected && !cellProto.isHinted,
    }
  )


  return (
            <button className={classes} onClick={() => handleCellClick(cellProto, onClick)}>
              {cellProto.getWord()}
            </button>
  )
}