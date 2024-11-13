import React, { useEffect, useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { CLivesProto } from './CLivesProto';
import { Alert } from '../alerts/Alert';
import { WRONG_GROUP_MESSAGE,
          WRONG_GROUP_BY_ONE_WORD,
          ALREADY_USED_GROUP,
 } from '../../constants/strings';

export const CGameProto = () => {
  const [game, setGame] = useState<iGameProto | undefined>(undefined);
  const [modificationCount, setModificationCount] = useState<number>(0);
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWrongGroup, setWrongGroup] = useState(false)
  const [isAlreadyUsedAttempt, setAlreadyUsedAttempt] = useState(false)
  const [isWrongGroupByOneWord, setWrongGroupByOneWord] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isWarningAlertOpen, setWarningAlertOpen] = useState(false)

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

  const flashAlert = (setter: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2500);
  }

  const handleSubmission = () => {
      if (!game) {
        return;
      }
      const errors = game.handleSubmision();
      if (game.isWon()) {
          setIsGameWon(true);
      }

      if (errors == -1) {
          flashAlert(setAlreadyUsedAttempt);
          return; // no need to redraw
      } 

      if (errors == 0) {
          game.populate() // rearrange game
      } else if (errors == 1) {
          flashAlert(setWrongGroupByOneWord);
      } else {
        flashAlert(setWrongGroup);
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
        <Alert message={WRONG_GROUP_MESSAGE} isOpen={isWrongGroup} />
        <Alert message={WRONG_GROUP_BY_ONE_WORD} isOpen={isWrongGroupByOneWord} />
        <Alert message={ALREADY_USED_GROUP} isOpen={isAlreadyUsedAttempt} />
      </div>
  )
}

export default CGameProto;
