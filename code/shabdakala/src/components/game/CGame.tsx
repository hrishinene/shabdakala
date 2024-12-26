import React, { useEffect, useState } from 'react'
import { iGame } from '../../lib/internal/iGame'   
import { CRow } from './CRowProto';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { CLives } from './CLives';
import { Alert } from '../alerts/Alert';
import { WRONG_GROUP_MESSAGE,
          WRONG_GROUP_BY_ONE_WORD,
          ALREADY_USED_GROUP,
          GAME_COPIED_MESSAGE,
          WIN_MESSAGES,
          LOST_GAME_MESSAGE,
          HINT_MESSAGE,
          PASS,
 } from '../../constants/strings';
 import { GameStorage, saveGameStorage, saveShabdabandhaStatsToLocalStorage } from '../../lib/localStorage';
import { CStatsModal } from '../modals/CStatsModal';
import { Tuples } from '../../constants/tuples';
import { StartDate } from '../../constants/settings';
// import { decodeString, findDaysDifference, getElement, playBeep, playHappyMusic, playHappySound, playSadMusic, playSadSound } from '../../lib/Utils';
import { decodeString, findDaysDifference, getElement } from '../../lib/Utils';


export const CGame = () => {
  const constructZCombo = (jsonString: string, date? : Date): ZCombo => {
    const parsedData = JSON.parse(jsonString);
    return new ZCombo(parsedData.tuples, date)
  };

  const loadNewGameFromOffset = (offset : number, date? : Date) :iGame => {
    console.log("Loading New Game with index: " + offset);
    // var newTuples = [Tuples[0][offset], Tuples[1][offset], Tuples[2][offset]];
    if (offset < 0)
      return demoGame();

    var tplCombo = getElement(Tuples, offset);
    var newTuples = [tplCombo[0], tplCombo[1], tplCombo[2]]
    var combo = constructZCombo(JSON.stringify({ tuples: newTuples }), date);

    return new iGame(combo,[]);
  }

  const loadNewGameFromRawString = (raw: string) :iGame => {
    // Split the raw string into tuples
    var words:string[] = raw.split("X");
    if (words.length != 15)
      return demoGame();

    var tuples = [
      { words: words.slice(0,4), theme: words[4], sharedBy: "शब्दबंध", difficulty: 0 },
      { words: words.slice(5,9), theme: words[9], sharedBy: "शब्दबंध", difficulty: 1 },
      { words: words.slice(10,14), theme: words[14], sharedBy: "शब्दबंध", difficulty: 2 }
    ];

    var combo = constructZCombo(JSON.stringify({tuples: tuples}));
    return new iGame(combo,[]);
  }

  const demoGame = () : iGame => {
      var tuples = [
        { words: ["सोमवार", "भवानी", "गुरुवार", "सदाशिव"], theme: "पुण्यातील काही पेठांची नावे", sharedBy: "शंतनू", difficulty: 1 },
        { words: ["आभाळ", "वादळ", "आई", "तू"], theme: "मराठी मालिकांच्या नावाची सुरुवातीची अक्षरे", sharedBy: "जयश्री", difficulty: 2 },
        { words: ["गरज", "सरो", "वैद्य", "मरो"], theme: "एका प्रसिद्ध म्हणीतील शब्द", sharedBy: "स्मिता", difficulty: 0 },
      ];

      var combo = constructZCombo(JSON.stringify({tuples: tuples}));
      return new iGame(combo,[]);
  }

  const loadNewGameFromUrl = () :iGame => {
    const url = new URL(window.location.href);

    // Load based on offset
    const offsetParam = url.searchParams.get("offset");
    const offset = offsetParam ? parseInt(offsetParam) : null;
    if (offset) {
      return loadNewGameFromOffset(offset);
    }

    // Load based on Demo
    const demo= url.searchParams.get("demo");
    if (demo) {
      return demoGame();
    }

    // Load encoded or password protected
    const encoded = url.searchParams.get("encoded");
    if (encoded) {
      const pass = url.searchParams.get("pass");
      if (pass && pass !== PASS) // wrong password
        return demoGame();


      var combostring = pass ? encoded : decodeString(encoded);

      return loadNewGameFromRawString(combostring);
    }

    // Load based on Date (and also in case of no date)
    var startDateParam = url.searchParams.get("startDate");
    const startDate = startDateParam ? new Date(startDateParam) : StartDate;

    var todayDate = new Date();
    var todayParam = url.searchParams.get("today");
    if (todayParam) {
      todayDate = new Date(todayParam+"T00:00:00"); // Convert to Local
      // don't allow future dates

      if (findDaysDifference(todayDate, new Date()) < 0)
        todayDate = new Date();
    }

    // console.log("Today Date: " + todayDate);
    // console.log("Start Date: " + startDate);

    var daysOffset = findDaysDifference(startDate, todayDate);
    // console.log("Days Offset: " + daysOffset);

    var tomorrowParam = url.searchParams.get("tomorrow");
    return tomorrowParam ? loadNewGameFromOffset(daysOffset + 1) : loadNewGameFromOffset(daysOffset, todayDate);
  }
  
 const [game, setGame] = useState<iGame|null>();
  
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
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date())
  const ALERT_TIME_MS = 3500

  const sessionElapsedSeconds = () => {
    var now = new Date();
    return Math.round((now.getTime() - sessionStartTime.getTime()) / 1000);
  } 

  // Initiate tuples based on date/storage and inputs... 
  useEffect(() => {
    var newGame = loadNewGameFromUrl()
    var storedGame = iGame.loadGame()

    // New Game cannot be null - but just in case!
    if (newGame == null) {
      setGame(demoGame());
      return;
    }

    if (storedGame == null) {
      // console.log("Setting New Game")
      setGame(newGame);
    } else if (storedGame.combo.equals(newGame.combo)) {
      // console.log("Stored game is same. Loading Stored Game")
      setGame(storedGame);
    } else {
      // console.log("Stored game is different. Loading New Game")
      setGame(newGame);
    }

    setModificationCount(modificationCount + 1);
  }, []);

  useEffect(() => {
      if (!game) {
        return;
      }

      // console.log("Saving Game Storage " + sessionElapsedSeconds());
      game.timeSpentSeconds += sessionElapsedSeconds();

      // console.log("Game time Spent = " + game.timeSpentSeconds);
      setSessionStartTime(new Date());

      var gameStorage : GameStorage ={
        comboStorage: game.combo,
        solvedThemesStorage: game.solvedThemes,
        remainingLives: game.remainingLives,
        attempts: game.attempts,
        timeSpentSeconds: game.timeSpentSeconds
      }
      saveGameStorage(gameStorage);
  },[modificationCount])


  // Handle Game won or lost
  useEffect(() => {
    if (!game) {
      return;
    }

    if (game.isWon()) {
      // update time
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
    // make a beep sound
    // playSadSound();

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
          // playHappyMusic();
          game.populate();
          saveShabdabandhaStatsToLocalStorage(game);
          // clear localStorage
      } else if (game.isLost()) { // All lives lost
          // playSadMusic();
          saveShabdabandhaStatsToLocalStorage(game);
          // clear localStorage
      } else if (errors === -1) { // already used attempt
          flashAlert(setAlreadyUsedAttempt);
          return; // no need to redraw
      } else if (errors === 0) { // correct group
          // playHappySound();
          game.populate() // rearrange game
      } else if (errors === 1) { // wrong group by one word
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

  var isSubmitEnabled = !game.isWon() && !game.isLost() && game.getSelectedCells().length === 4;
  var isShuffleEnabled = !game.isWon() && !game.isLost() && game.getSelectedCells().length === 0;
  var isDeselectEnabled = !game.isWon()  && !game.isLost() && game.getSelectedCells().length > 0;
  var isResetEnabled = game.isWon()  || game.isLost();
  var isHintEnabled = !game.isWon() && !game.isLost() &&  game.getSelectedCells().length === 0;

  return (
    <div>
      <div className="text-center py-4">
        {/* <h3 className="text-lg font-sans text-black">Create groups of 4!</h3> */}
        <h3 className="text-lg font-sans text-black dark:text-white">परस्पर संबंध असलेल्या चार गोष्टींचे शब्दबंध शोधा</h3>
      </div>
      <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
          {
              game.rows.map((row, index) => (
                  <CRow key={index} rowProto={row} onClick={handleCellClick} />
              ))
          }

          <CLives mistake={game.remainingLives} timeSpentSeconds={game.timeSpentSeconds} game={game}/>

          <div className="flex justify-center mt-2 space-x-4">

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
              उत्तर नोंदवा
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
              क्रम बदला
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
              संकेत
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
              निवड रद्द करा
            </button>
            
              {/* reset button */}
              {/* {isResetEnabled && ( */}
                  {/* <button className="bg-gray-500 dark:bg-gray-50 text-white dark:text-black px-4 py-2 rounded-3xl mb-2" onClick={() => handleReset()}> */}
                      {/* reset (temporary) */}
                  {/* </button> */}
              {/* )} */}
          </div>
      </div>

        <Alert message={WRONG_GROUP_MESSAGE} isOpen={isWrongGroup} />
        <Alert message={WRONG_GROUP_BY_ONE_WORD} isOpen={isWrongGroupByOneWord} />
        <Alert message={ALREADY_USED_GROUP} isOpen={isAlreadyUsedAttempt} />

        {/* Success message Alert and Failure message Alerts*/}
        {/* <Alert message="Congratulations!! You have Won the game!" isOpen={isSuccessMessageDisplayed} /> */}
        {/* <Alert message="Sorry!! You have lost the game! Better luck next time" isOpen={isFailureMessageDisplayed} /> */}
        <Alert message= {LOST_GAME_MESSAGE} isOpen={isFailureMessageDisplayed} />
        <CStatsModal
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

export default CGame;
