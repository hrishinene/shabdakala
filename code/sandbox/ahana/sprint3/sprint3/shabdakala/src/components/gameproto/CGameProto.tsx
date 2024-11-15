import { useEffect, useState } from 'react'
import { iGameProto } from '../../lib/internal/iGameProto'   
import { CRowProto } from './CRowProto';
import { shuffleArray } from '../../lib/Utils';
import { ZCombo } from '../../lib/internal/ZCombo';
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import { GameStorage, loadGameStorage, saveGameStorage } from '../../lib/localStorage';
import { TUPLES } from '../../constants/tuples';
import { ZTuple } from '../../lib/internal/ZTuple';


export const CGameProto = () => {

  const constructZCombo = (jsonString: string): ZCombo => {
    const parsedData = JSON.parse(jsonString);
    return new ZCombo(parsedData.tuples)
  };

  const encodingUrlTest = (baseUrl:string, combo: ZCombo | null) =>
  {
    let encoded = baseUrl;
    if(combo != null)
    {
      var temp_tuples = combo.getTuples();
      var temp_encode = ''
      const wordsString = temp_tuples.map(tuple => 
        `${tuple.words.join('#')}%${tuple.theme}%${tuple.sharedBy}%${tuple.difficulty}`
    ).join('!');  // Join all tuples with '!'

    // console.log("Word list now going for encoding: "+wordsString);

      for (let i = 0; i < wordsString.length; i++) 
        {
          let charCode = wordsString.charCodeAt(i);
          temp_encode = temp_encode.concat(String.fromCharCode(charCode + i + 3));  // Shift character codes
        }
      encoded = encoded + "?encoded=" + temp_encode
    }
    
    return encoded;
    // console.log("Encoded Url: " + encoded);

  }

  const decodingUrlTest = (encodedUrl : String) =>
  {
    let partlyDecodedWordList: string = "";

    //this works, dont touch
    let toBeDecoded = encodedUrl.split("http://localhost:3000/?encoded=")[1] || "";
    // console.log("Part of URL to be decoded: "+toBeDecoded);

    let decodedTupleList: any[] = []; //to hold decoded tuples
    
    for (let i = 0; i < toBeDecoded.length; i++) {
      let charCode = toBeDecoded.charCodeAt(i);
      partlyDecodedWordList = partlyDecodedWordList.concat(String.fromCharCode(charCode - i - 3)); // Decoding logic
  }

  // console.log("Partly decoded word list: "+partlyDecodedWordList);

  //now to format the tuples in acceptable format

    // Step 1: Split the string by '!' to get each tuple
    const tupleSegments = partlyDecodedWordList.split('!');
    
    // Step 2: Process each tuple segment
    tupleSegments.forEach(tupleSegment => {
        // Split by '%' to get words, theme, sharedBy, and difficulty
        const [wordsSegment, theme, sharedBy, difficulty] = tupleSegment.split('%');
        
        // Step 3: Split the words by '#' to separate them
        const words = wordsSegment.split('#');
        
        // Step 4: Convert difficulty back to a number
        const decodedTuple = {
            words,
            theme,
            sharedBy,
            difficulty: parseInt(difficulty),  // Convert difficulty back to a number
        };
        decodedTupleList.push(decodedTuple);
        
    });

    return decodedTupleList;
  
};
 

const [game, setGame] = useState<iGameProto|undefined>(() => {

  // if(true)
  //   {
      // var tempTuples = [
      //   {words:["A", "A", "A", "A"], theme: "AA", sharedBy: "AA", difficulty: 1},
      //   { words: ["B", "B", "B", "B"], theme: "BB", sharedBy: "BB", difficulty: 0 },
      //   { words: ["C", "C", "C", "C"], theme: "CC", sharedBy: "CC", difficulty: 2 },
      // ];
      // var tempTuples = [
      // {words:["सोमवार", "भवानी", "गुरुवार", "सदाशिव"], theme: "पुण्यातील काही पेठांची नावे", sharedBy: "शंतनू", difficulty: 1},
      // { words: ["आभाळ", "वादळ", "आई", "तू"], theme: "मराठी मालिकांच्या नावाची सुरुवातीची अक्षरे", sharedBy: "जयश्री", difficulty: 0 },
      // { words: ["गरज", "सरो", "वैद्य", "मरो"], theme: "एका प्रसिद्ध म्हणीतील शब्द", sharedBy: "स्मिता", difficulty: 2 },
      // ];

        //preparing to encode url+combo
        // var baseUrl = "http://localhost:3000/";
        // var comboFromTupleTest = constructZCombo(JSON.stringify({tuples: tempTuples}));
        // encodingUrlTest(baseUrl, comboFromTupleTest);
    // }


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

        if (loaded == null || loaded.comboStorage.tuples.length === 0) {
          console.log("Initializing from code");
          return new iGameProto(new ZCombo([]), []);
        }

        console.log("Initializing from local storage");
        return new iGameProto(
          constructZCombo(JSON.stringify({ tuples: loaded.comboStorage.tuples })),
          loaded.solvedThemesStorage
        );
      }

});
  
  const [modificationCount, setModificationCount] = useState<number>(0);
  //const temp : ZCombo;

  // const gameStorage : GameStorage {
  //     combo: temp;
  //     solvedThemes: [];
  // }
  //const [vibrate,setvibrate]=useState(false)




  // Initiate tuples... For now hardcoded
  useEffect(() => {
    var tuples = [
      {words:["सोमवार", "भवानी", "गुरुवार", "सदाशिव"], theme: "पुण्यातील काही पेठांची नावे", sharedBy: "शंतनू", difficulty: 1},
      { words: ["आभाळ", "वादळ", "आई", "तू"], theme: "मराठी मालिकांच्या नावाची सुरुवातीची अक्षरे", sharedBy: "जयश्री", difficulty: 0 },
      { words: ["गरज", "सरो", "वैद्य", "मरो"], theme: "एका प्रसिद्ध म्हणीतील शब्द", sharedBy: "स्मिता", difficulty: 2 },
    ];

    if(game?.combo.tuples.length==0){
      var combo = constructZCombo(JSON.stringify({tuples: tuples}));
      var gameProto = new iGameProto(combo,[]);
      setGame(gameProto);
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
                  <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleSubmission()}>
                      submit
                  </button>
              )}
              {isShuffleEnabled && (
                  <button className="bg-gray-500 text-black px-4 py-2 rounded mb-2" onClick={() => handleShuffle()}>
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
      </div>
  )
}

export default CGameProto;
