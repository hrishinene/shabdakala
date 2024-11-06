import { useEffect, useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';

export const CGameProto = () => {
  const [game, setGame] = useState<iGameProto | undefined>(undefined);
  const [modificationCount, setModificationCount] = useState<number>(0);

  // Initiate tuples... For now hardcoded
  useEffect(() => {
    var tuples = [
        {words:["one", "two", "three", "four"], theme: "numbers", sharedBy: "me", difficulty: 1},
        {words:["A", "B", "C", "D"], theme: "Alphabets", sharedBy: "me", difficulty: 0},
        {words:["OK", "Yeah", "Done", "Bravo"], theme: "Exclaimations", sharedBy: "me", difficulty: 2},
      ];
  
      var combo = constructZCombo(JSON.stringify({tuples: tuples}));
      var gameProto = new iGameProto(combo, []);
      setGame(gameProto);
    }, []);
  const constructZCombo = (jsonString: string): ZCombo => {
    const parsedData = JSON.parse(jsonString);
    return new ZCombo(parsedData.tuples)
  };

  const handleSubmission = () => {
      alert("Submission");
  }

  const handleUnselect = () => {
    //   alert("Unselect");
      if (!game) {
          return;
      }

      game.unselectAll();
      setModificationCount(modificationCount + 1);
  }

  const handleClick = (buttenLabel: string) => {
    // alert(`Clicked ${buttenLabel} Button`);
    setModificationCount(modificationCount + 1);
  }

  const handleCellClick = (cellAddress: ZCellAddress) => {
    // alert(`Clicked Cell: ${cellAddress}`);
    setModificationCount(modificationCount + 1);
  }

  if (!game) {
    return <div>Loading...</div>;
  }

  var isSubmitEnabled = game.getSelectedCells().length == 4;
  var isShuffleEnabled = game.getSelectedCells().length == 0;
  var isDeselectEnabled = game.getSelectedCells().length > 0;
  var isHintEnabled = game.getSelectedCells().length == 0;

  return (
      <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
          {
              game.rows.map((row, index) => (
                  <CRowProto key={index} rowProto={row} onClick={handleCellClick} />
              ))
          }
          <div className="flex justify-center mt-4 space-x-4">
              {isSubmitEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleSubmission()}>
                      submit
                  </button>
              )}
              {isShuffleEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleClick("shuffle")}>
                      shuffle
                  </button>
              )}

              {isHintEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleClick("hint")}>
                      hint
                  </button>
              )}

              {isDeselectEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleUnselect()}>
                      unselect
                  </button>
              )}
          </div>
      </div>
  )
}

export default CGameProto;
