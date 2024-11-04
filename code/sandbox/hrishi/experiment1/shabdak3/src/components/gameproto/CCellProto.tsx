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
  return (
            // <button className="border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-black dark:border-slate-100 cell-animation w-16 h-12">ई-शब्दक</button>
            //<button className="">ई-शब्दक</button>
            <button className="border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 p-2" onClick={() => handleCellClick(cellProto, onClick)}>
              {cellProto.word}
            </button>
  )
}