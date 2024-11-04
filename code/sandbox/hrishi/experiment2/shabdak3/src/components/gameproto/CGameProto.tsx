import { useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';

export const CGameProto = () => {
  const [game, setGame] = useState<iGameProto | undefined>(undefined);
  const [modificationCount, setModificationCount] = useState<number>(0);

  const handleClick = (buttenLabel: string) => {
    alert(`Clicked ${buttenLabel} Button`);
    setModificationCount(modificationCount + 1);
  }

  const handleCellClick = (cellAddress: number) => {
    alert(`Clicked Cell: ${cellAddress}`);
    setModificationCount(modificationCount + 1);
  }

  const constructZCombo = (jsonString: string): ZCombo => {
    const parsedData = JSON.parse(jsonString);
    return new ZCombo(parsedData.tuples)
  };

  var tuples = [
    {words:["one", "two", "three", "four"], theme: "numbers", sharedBy: "me", difficulty: 1},
    {words:["A", "B", "C", "D"], theme: "Alphabets", sharedBy: "me", difficulty: 0},
    {words:["OK", "Yeah", "Done", "Bravo"], theme: "Exclaimations", sharedBy: "me", difficulty: 2},
                ]

    var combo = constructZCombo(JSON.stringify({tuples: tuples}));

  var gameProto = new iGameProto(combo, []);

  return (
      <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
      {
        gameProto.rows.map((row, index) => (
          <CRowProto key = {index} rowProto={row} onClick={handleCellClick} />
      ))
      }
          <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={()=> handleClick("submit") }>
                  submit
              </button>
              <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleClick("shuffle")}>
                  shuffle
              </button>
              <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick = {() => handleClick("hint")}>
                  hint
              </button>
              <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleClick("unselect")}>
                  unselect
              </button>
          </div>
      </div>
  )
}