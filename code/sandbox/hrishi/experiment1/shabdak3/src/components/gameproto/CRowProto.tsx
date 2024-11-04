import { CCellProto } from './CCellProto'
import { iRowProto } from '../../lib/internal/iRowProto';
import { shuffleArray } from '../../lib/Utils';

interface CRowProtoProps {

  rowProto: iRowProto;
  onClick:(cellAddress:number)=>void;
}

export const CRowProto = ({rowProto, onClick} : CRowProtoProps) => {
  // Shuffle the cells array
  const shuffledArray = shuffleArray(rowProto.cells ?? []);

  return (
    <div className="flex justify-center mb-1">
      {shuffledArray.map((cell, index) => (
        <CCellProto key={index} cellProto={cell} onClick = {onClick} />
      ))}
    </div>
  );
}