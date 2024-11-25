import React, { useEffect, useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { findDaysOffset, shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { CLivesProto } from './CLivesProto';
import { Alert } from '../alerts/Alert';
import { WRONG_GROUP_MESSAGE,
          WRONG_GROUP_BY_ONE_WORD,
          ALREADY_USED_GROUP,
          GAME_COPIED_MESSAGE,
          WIN_MESSAGES,
          LOST_GAME_MESSAGE,
          HINT_MESSAGE,
 } from '../../constants/strings';
 import { GameStorage, loadGameStorage, saveGameStorage, saveShabdabandhaStatsToLocalStorage, saveStatsToLocalStorage } from '../../lib/localStorage';
import { CStatsModalProto } from '../modals/CStatsModalProto';
import { Tuples } from '../../constants/tuples';


export const CGameProto = () => {
  const constructZCombo = (jsonString: string): ZCombo => {
    const parsedData = JSON.parse(jsonString);
    return new ZCombo(parsedData.tuples)
  };

  const loadNewGame = (offset : number) :iGameProto => {
    var newTuples = [Tuples[0][offset], Tuples[1][offset], Tuples[2][offset]];
    var combo = constructZCombo(JSON.stringify({ tuples: newTuples }));

    return new iGameProto(combo,[]);
  }
  
 const [game, setGame] = useState<iGameProto|null>();
  // const [game, setGame] = useState<iGameProto|null>(() => {
    // return iGameProto.loadGame()

    // if (loaded == null) {
      // game = undefined
    // }
    // var temp= new ZCombo([])
    // var temp1=new iGameProto(temp,[])

    // if (loaded == null || loaded.comboStorage.tuples.length==0) {
      //console.log(temp1)
      // return temp1
    // }
    // var combo = constructZCombo(JSON.stringify({tuples: loaded.comboStorage.tuples}));
    // return new iGameProto(combo,loaded.solvedThemesStorage, loaded.remainingLives, loaded.attempts);

  // });
  
  const [modificationCount, setModificationCount] = useState<number>(0);
  // const [isGameWon, setIsGameWon] = useState(false)
  const [isWrongGroup, setWrongGroup] = useState(false)
  const [isAlreadyUsedAttempt, setAlreadyUsedAttempt] = useState(false)
  const [isWrongGroupByOneWord, setWrongGroupByOneWord] = useState(false)
  const [isFailureMessageDisplayed, setFailureMessageDisplayed] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [gameRevealed, setGameRevealed] = useState(false)
  const [hint, setHint] = useState(false)
  const ALERT_TIME_MS = 3500

  //const temp : ZCombo;

  // const gameStorage : GameStorage {
  //     combo: temp;
  //     solvedThemes: [];
  // }
  //const [vibrate,setvibrate]=useState(false)

  // Initiate tuples... For now hardcoded
  useEffect(() => {
    var storedGame = iGameProto.loadGame()

    // Check if the href contains offset - if so, load from it
    const url = new URL(window.location.href);
    const offset = url.searchParams.get("offset");
    var newGame = offset ? loadNewGame(parseInt(offset)) : null ;

    if(storedGame == null || storedGame.combo.tuples.length==0 && newGame != null) {
      setGame(newGame);
    } else if (storedGame != null && newGame == null) {
      setGame(storedGame);
    }else if (storedGame != null && newGame != null) {
      if (storedGame.combo.equals(newGame.combo)) {
        // console.log("Game already loaded")
        setGame(storedGame);
      } else {
        // console.log("New Game loaded")
        setGame(newGame);
      }
    } else { // Default fall back - for demo
      var tuples = [
      // {words:["one", "two", "three", "four"], theme: "numbers", sharedBy: "me", difficulty: 1},
      // {words:["A", "B", "C", "D"], theme: "Alphabets", sharedBy: "me", difficulty: 0},
      // {words:["OK", "Yeah", "Done", "Bravo"], theme: "Exclaimations", sharedBy: "me", difficulty: 2},
        { words: ["सोमवार", "भवानी", "गुरुवार", "सदाशिव"], theme: "पुण्यातील काही पेठांची नावे", sharedBy: "शंतनू", difficulty: 1 },
        { words: ["आभाळ", "वादळ", "आई", "तू"], theme: "मराठी मालिकांच्या नावाची सुरुवातीची अक्षरे", sharedBy: "जयश्री", difficulty: 2 },
        { words: ["गरज", "सरो", "वैद्य", "मरो"], theme: "एका प्रसिद्ध म्हणीतील शब्द", sharedBy: "स्मिता", difficulty: 0 },
      ];

      var combo = constructZCombo(JSON.stringify({tuples: tuples}));
      setGame(new iGameProto(combo,[]));
    }

    setModificationCount(modificationCount + 1);
  }, []);

    useEffect(()=> {
      if (!game) {
        return;
      }

      var gameStorage : GameStorage ={
        comboStorage: game.combo,
        solvedThemesStorage: game.solvedThemes,
        remainingLives: game.remainingLives,
        attempts: game.attempts
      }
      saveGameStorage(gameStorage);
  },[modificationCount])


  // Handle Game won or lost
  useEffect(() => {
    if (!game) {
      return;
    }

    if (game.isWon()) {
      // display success message
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }

    if (game.isLost()) {
      // display failure message
      setFailureMessageDisplayed(true);

      // reveal the solution
       setTimeout(() => {
        game.reveal();
        setGameRevealed(true)
      }, 3000)

      // open stats modal
      setTimeout(() => {
        setFailureMessageDisplayed(false);
        setGameRevealed(false);
        setIsStatsModalOpen(true)
      }, 10000)
    }
  }, [modificationCount])



  const flashAlert = (setter: React.Dispatch<React.SetStateAction<boolean>>, timeoutMS:number = 3500): void => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, timeoutMS);
  }

  const handleSubmission = () => {
      if (!game) {
        return;
      }
      const errors = game.handleSubmision();
      if (game.isWon()) { // All combos solved
          game.populate();
          saveShabdabandhaStatsToLocalStorage(game);
          // clear localStorage
      } else if (game.isLost()) { // All lives lost
          saveShabdabandhaStatsToLocalStorage(game);
          // clear localStorage
      } else if (errors == -1) { // already used attempt
          flashAlert(setAlreadyUsedAttempt);
          return; // no need to redraw
      } else if (errors == 0) { // correct group
          game.populate() // rearrange game
      } else if (errors == 1) { // wrong group by one word
          flashAlert(setWrongGroupByOneWord);
      } else { // wrong group
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

  const handleHint = () => {
    //   alert("Hint");
      if (!game) {
          return;
      }

      game.showHint(true);
      setHint(true);

      setTimeout(() => {
        game.showHint(false);
        setHint(false);
      }, 3500)
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

  const handleReset = () => {
    // alert("Reset");
    localStorage.removeItem('GameStorage');
    setGame(null)
    // alert("Game Reset");
    setModificationCount(modificationCount + 1);
  }

  if (!game) {
    return <div className='text-left py-4 text-black dark:text-white'>Please Reload Page</div>;
  }

  var isSubmitEnabled = !game.isWon() && !game.isLost() && game.getSelectedCells().length == 4;
  var isShuffleEnabled = !game.isWon() && !game.isLost() && game.getSelectedCells().length == 0;
  var isDeselectEnabled = !game.isWon()  && !game.isLost() && game.getSelectedCells().length > 0;
  var isResetEnabled = game.isWon()  || game.isLost();
  var isHintEnabled = !game.isWon() && !game.isLost() &&  game.getSelectedCells().length == 0;

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

          {/* submit button */}
          <button
              className={`px-4 py-2 rounded-3xl mb-2 ${
                isSubmitEnabled
                  ? "bg-gray-500 dark:bg-gray-50 text-white dark:text-black "
                  : "bg-gray-500 dark:bg-gray-50 text-white dark:text-black cursor-not-allowed opacity-50"
              }`}
              disabled={!isSubmitEnabled}
              onClick={handleSubmission}
            >
              submit
            </button>

            {/* shuffle button */}
            <button
              className={`px-4 py-2 rounded-3xl mb-2 ${
                isShuffleEnabled
                  ? "bg-gray-500 dark:bg-gray-50 text-white dark:text-black"
                  : "bg-gray-500 dark:bg-gray-50 text-white dark:text-black cursor-not-allowed opacity-50"
              }`}
              disabled={!isShuffleEnabled}
              onClick={handleShuffle}
            >
              shuffle
            </button>

            {/* hint button */}
            <button
              className={`px-4 py-2 rounded-3xl mb-2 ${
                isHintEnabled
                  ? "bg-gray-500 dark:bg-gray-50 text-white dark:text-black"
                  : "bg-gray-500 dark:bg-gray-50 text-white dark:text-black cursor-not-allowed opacity-50"
              }`}
              disabled={!isHintEnabled}
              onClick={() => handleHint()}
            >
              hint
            </button>

            {/* deselect button */}
            <button
              className={`px-4 py-2 rounded-3xl mb-2 ${
                isDeselectEnabled
                  ? "bg-gray-500 dark:bg-gray-50 text-white dark:text-black"
                  : "bg-gray-500 dark:bg-gray-50 text-white dark:text-black cursor-not-allowed opacity-50"
              }`}
              disabled={!isDeselectEnabled}
              onClick={() => handleUnselect()}
            >
              deselect
            </button>
            
              {/* reset button */}
              {isResetEnabled && (
                  <button className="bg-gray-500 dark:bg-gray-50 text-white dark:text-black px-4 py-2 rounded-3xl mb-2" onClick={() => handleReset()}>
                      reset
                  </button>
              )}
          </div>
      </div>

        <Alert message={WRONG_GROUP_MESSAGE} isOpen={isWrongGroup} />
        <Alert message={WRONG_GROUP_BY_ONE_WORD} isOpen={isWrongGroupByOneWord} />
        <Alert message={ALREADY_USED_GROUP} isOpen={isAlreadyUsedAttempt} />

        {/* Success message Alert and Failure message Alerts*/}
        {/* <Alert message="Congratulations!! You have Won the game!" isOpen={isSuccessMessageDisplayed} /> */}
        {/* <Alert message="Sorry!! You have lost the game! Better luck next time" isOpen={isFailureMessageDisplayed} /> */}
        <Alert message= {LOST_GAME_MESSAGE} isOpen={isFailureMessageDisplayed} />
        <CStatsModalProto
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
        />
        <Alert
          message={successAlert}
          isOpen={successAlert !== ''}
          variant="success"
        />
        <Alert
          message={HINT_MESSAGE}
          isOpen={hint}
          variant="success"
        />
      </div>
  )
}

export default CGameProto;
