import { useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { shuffleArray } from '../../lib/Utils';

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

  var gameProto = new iGameProto({words: ["one", "two", "thirteen", "four"], oddIndex: 2});

  const shuffledRowArray = shuffleArray(gameProto.rowProto ?? []);


  return (
      <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
      {
      shuffledRowArray.map((row, index) => (
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