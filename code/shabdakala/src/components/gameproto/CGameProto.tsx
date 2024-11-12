import { useEffect, useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { MistakesRemaining } from '../../vComponents/cMistakesRemaining';
import { CLivesProto } from './CLivesProto';

export const CGameProto = () => {
  const [game, setGame] = useState<iGameProto | undefined>(undefined);
  const [modificationCount, setModificationCount] = useState<number>(0);

  // Initiate tuples... For now hardcoded
  useEffect(() => {
    var tuples = [
        // {words:["one", "two", "three", "four"], theme: "numbers", sharedBy: "me", difficulty: 1},
        // {words:["A", "B", "C", "D"], theme: "Alphabets", sharedBy: "me", difficulty: 0},
        // {words:["OK", "Yeah", "Done", "Bravo"], theme: "Exclaimations", sharedBy: "me", difficulty: 2},
        {words:["सोमवार", "भवानी", "गुरुवार", "सदाशिव"], theme: "पुण्यातील काही पेठांची नावे", sharedBy: "शंतनू", difficulty: 1},
        { words: ["आभाळ", "वादळ", "आई", "तू"], theme: "मराठी मालिकांच्या नावाची सुरुवातीची अक्षरे", sharedBy: "जयश्री", difficulty: 0 },
        { words: ["गरज", "सरो", "वैद्य", "मरो"], theme: "एका प्रसिद्ध म्हणीतील शब्द", sharedBy: "स्मिता", difficulty: 2 },
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
      if (!game) {
            return;
        }
      const success = game.handleSubmision();
      if (success) {
          game.populate()
      } else {
          alert("Incorrect combination! Please try again.");
      }

      setModificationCount(modificationCount + 1);
  }

  const handleShuffle = () => {
    //   alert("Shuffle");
      if (!game) {
          return;
      }

      game.populate();
      setModificationCount(modificationCount + 1);
  }

  const handleUnselect = () => {
    //   alert("Unselect");
      if (!game) {
          return;
      }

      game.handleUnselect();
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

  var isSubmitEnabled = !game.isWon() && game.getSelectedCells().length == 4;
  var isShuffleEnabled = !game.isWon() && game.getSelectedCells().length == 0;
  var isDeselectEnabled = !game.isWon() && game.getSelectedCells().length > 0;
//   var isHintEnabled = !game.isWon() && game.getSelectedCells().length == 0;
  var isHintEnabled = false

  return (
    <div>
      <div className="text-center py-4">
        {/* <h3 className="text-lg font-sans text-black">Create groups of 4!</h3> */}
        <h3 className="text-lg font-sans text-black dark:text-white">चार गोष्टींचे गट बनवा!</h3>
      </div>
      <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
          {
              game.rows.map((row, index) => (
                  <CRowProto key={index} rowProto={row} onClick={handleCellClick} />
              ))
          }

          <CLivesProto mistake={game.remainingLives}/>

          <div className="flex justify-center mt-4 space-x-4">
              {isSubmitEnabled && (
                  <button className="bg-gray-500 dark:bg-gray-50 text-white dark:text-black px-4 py-2 rounded mb-2" onClick={() => handleSubmission()}>
                      submit
                  </button>
              )}
              {isShuffleEnabled && (
                  <button className="bg-gray-500 dark:bg-gray-50 text-white dark:text-black px-4 py-2 rounded mb-2" onClick={() => handleShuffle()}>
                      shuffle
                  </button>
              )}

              {isHintEnabled && (
                  <button className="bg-gray-500 dark:bg-gray-50 text-white dark:text-black px-4 py-2 rounded mb-2" onClick={() => handleClick("hint")}>
                      hint
                  </button>
              )}

              {isDeselectEnabled && (
                  <button className="bg-gray-500 dark:bg-gray-50 text-white dark:text-black px-4 py-2 rounded mb-2" onClick={() => handleUnselect()}>
                      unselect
                  </button>
              )}
          </div>
      </div>
      </div>
  )
}

export default CGameProto;
