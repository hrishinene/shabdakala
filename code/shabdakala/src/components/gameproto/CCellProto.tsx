import classnames from 'classnames'
import { iCellProto } from "../../lib/internal/iCellProto";
import { ZDummyObject } from "../../lib/internal/ZDummyObject"
import { ZCellAddress } from '../../lib/internal/ZCellAddress';


interface CCellProtoProps {
  cellProto: iCellProto;
  onClick:(cellAddress:ZCellAddress)=>void;
}

function handleCellClick(cellProt: iCellProto, onClickCallback: (cellAddress: ZCellAddress) => void) {
  cellProt.selectCell();
  onClickCallback(cellProt.address);
}

export const CCellProto = ({cellProto, onClick} : CCellProtoProps) => {
  const classes = classnames(
    'w-[150px] h-[80px]',
    'border-solid border-2 dark:border-0 flex items-center justify-center mx-1 text-xl font-bold rounded dark:text-white', // Reduced font size
    'border-black dark:border-slate-100',
    'cell-animation',
    {
      'bg-[#f4f4f5] dark:bg-slate-800 border-slate-300 dark:border-slate-600': !cellProto.isSelected,
      'bg-custom-dark-gray text-white': cellProto.isSelected,
      'bg-white text-black': !cellProto.isSelected,
    }
  )


  return (
            <button className={classes} onClick={() => handleCellClick(cellProto, onClick)}>
              {cellProto.getWord()}
            </button>
  )
}