import classnames from 'classnames'
import { iCellProto } from "../../lib/internal/iCellProto";
import { ZDummyObject } from "../../lib/internal/ZDummyObject"


interface CCellProtoProps {
  cellProto: iCellProto;
  onClick:(cellAddress:number)=>void;
}

function handleCellClick(cellProt: iCellProto, onClickCallback: (cellAddress: number) => void) {
  cellProt.selectCell();
  onClickCallback(cellProt.address);
}

export const CCellProto = ({cellProto, onClick} : CCellProtoProps) => {
  const classes = classnames(
    'w-[150px] h-[80px]',
    'border-solid border-0 flex items-center justify-center mx-1 text-xl font-bold rounded dark:text-white', // Reduced font size
    {
      'bg-[#f4f4f5] dark:bg-slate-800 border-slate-300 dark:border-slate-600': !cellProto.isSelected,
      'bg-custom-dark-gray text-white': cellProto.isSelected,
      'bg-white text-black': !cellProto.isSelected && cellProto.word,
      'border-black dark:border-slate-100': cellProto.word,
      'cell-animation': !!cellProto,
    }
  )


  return (
            // <button className="border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-black dark:border-slate-100 cell-animation w-16 h-12">ई-शब्दक</button>
            //<button className="">ई-शब्दक</button>
            <button className={classes} onClick={() => handleCellClick(cellProto, onClick)}>
              {cellProto.word}
            </button>
  )
}