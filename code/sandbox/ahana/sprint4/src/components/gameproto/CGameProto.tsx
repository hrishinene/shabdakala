import { useEffect, useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { decodingUrlTest, encodingUrlTest, formatDate, getArrayIndex, shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { GameStorage, loadGameStorage, saveGameStorage } from '../../lib/localStorage';
import { FinalTuplesList } from '../../constants/FinalTuplesList';
import { ZTuple } from '../../lib/internal/ZTuple';


export const CGameProto = () => {

  const constructZCombo = (jsonString: string): ZCombo => {
    const parsedData = JSON.parse(jsonString);
    return new ZCombo(parsedData.tuples)
  };


const [game, setGame] = useState<iGameProto|undefined>(() => {

    //<AGA>:first we fetch and check if encoded part is present in url currently in browser window. 
    //if yes, we decode and render game from decoded ZCombo. 
    //if not, we load LS and check if it is null, we load game from code, else, from LS 
    if(window.location.href.includes("encoded"))
      {
        console.log("game loaded from url.")

        //decoding url, fetching combo and rendering game
        const windowUrl = decodeURIComponent(window.location.href);
        const decodedAndFetchedTuple = decodingUrlTest(windowUrl);

        var decodedAndFetchedZCombo = constructZCombo(JSON.stringify({tuples: decodedAndFetchedTuple}));
        return new iGameProto(decodedAndFetchedZCombo,[]);
      }

      else
      {
        var loaded = loadGameStorage()

        if(loaded != null)
        {
          if(formatDate(new Date()) == formatDate( new Date(loaded.comboStorage.createdOn))) 
            {
              console.log("Initializing from local storage");
              return new iGameProto(
              constructZCombo(JSON.stringify({ tuples: loaded.comboStorage.tuples })),
              loaded.solvedThemesStorage
              );
            }
            // console.log("did not go into if");           
        }

          console.log("Initializing from code");
          return new iGameProto(new ZCombo([]), []);
      }

});
  
  const [modificationCount, setModificationCount] = useState<number>(0);

  useEffect(() => {
    var tuples = [FinalTuplesList[0][getArrayIndex(FinalTuplesList[0])], FinalTuplesList[1][getArrayIndex(FinalTuplesList[1])], FinalTuplesList[2][getArrayIndex(FinalTuplesList[2])] ];

    if(game?.combo.tuples.length==0){
      var combo = constructZCombo(JSON.stringify({tuples: tuples}));
      var gameProto = new iGameProto(combo,[]);
      setGame(gameProto);
      setModificationCount(modificationCount + 1);
    }
    }, []);

    useEffect(()=> {
      var gameStorage : GameStorage ={
        comboStorage: game?.combo || new ZCombo([]),
        solvedThemesStorage: game?.solvedThemes || []
      }
      saveGameStorage(gameStorage);
  },[modificationCount])

  //<AGA> : upon change in game state, url will be encoded and outputted on console
  useEffect(() => {
    if (game) {
      const baseUrl = "http://localhost:3000";
      const encodedUrl = encodingUrlTest(baseUrl, game.combo);
      console.log("Encoded URL:", encodedUrl);
    }
  }, [game]);

  const handleSubmission = () => {
      if (!game) {
            return;
        }
      const success = game.handleSubmision();
      if (success) {
        game.populate()
      } else {
          game.setVibrate()

          setTimeout(() => {
            game.setVibrate()
        }, 300);

        //alert("Incorrect combination! Please try again.");
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
  var isHintEnabled = !game.isWon() && game.getSelectedCells().length == 0;

  return (
    <div>
      <div className="text-center py-4">
        {/* <h3 className="text-lg font-sans text-black">Create groups of 4!</h3> */}
        <h3 className="text-lg font-sans text-black dark:text-white">चार गोष्टींचे गट बनवा !</h3>
      </div>
      <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
          {
              game.rows.map((row, index) => (
                  <CRowProto key={index} rowProto={row} onClick={handleCellClick} />
              ))
          }
          <div className="flex justify-center mt-4 space-x-4">
              {isSubmitEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2" onClick={() => handleSubmission()}>
                      submit
                  </button>
              )}

              {!isSubmitEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2 cursor-not-allowed opacity-50" disabled onClick={() => handleSubmission()}>
                      submit
                  </button>
              )}
              {isShuffleEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2" onClick={() => handleShuffle()}>
                      shuffle
                  </button>
              )}
              
              {!isShuffleEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2 cursor-not-allowed opacity-50" disabled onClick={() => handleShuffle()}>
                      shuffle
                  </button>
              )}
              {isHintEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2" onClick={() => handleClick("hint")}>
                      hint
                  </button>
              )}

              {!isHintEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2 cursor-not-allowed opacity-50" disabled onClick={() => handleClick("hint")}>
                      hint
                  </button>
              )}

              {isDeselectEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2" onClick={() => handleUnselect()}>
                      unselect
                  </button>
              )}

              {!isDeselectEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded-3xl mb-2 cursor-not-allowed opacity-50" disabled onClick={() => handleUnselect()}>
                      unselect
                  </button>
              )}
          </div>
      </div>
      </div>
  )
}

export default CGameProto;
