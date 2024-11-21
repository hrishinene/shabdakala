import {WORDS} from '../constants/wordlist'
// import {VALIDGUESSES} from '../constants/validGuesses'
import {setMaxWords, RANDOM_DATE} from "../constants/settings";
import {getAkshars, unicodeMatch, decodeShabda} from "./statuses";

// <HVN> Shabdak2 - suspend valid guess
export const isWordInWordList = (word: string) => {
    return true; // allow any word for now
    // return  (false === isRepeatAkshar(getAkshars(word)))
    // return (
        // WORDS.includes(word.toLowerCase()) ||
        // VALIDGUESSES.includes(word.toLowerCase())
    // )
}

export const isWinningWord = (word: string) => {
    return unicodeMatch(solution, word);
}

const epoch = new Date('January 1, 2022 00:00:00');
const epochMs = epoch.valueOf()

const generateRandomPastDate = (): number => { // thanks to https://stackoverflow.com/a/60180035/437506
    const fromTime = epoch.getTime();
    const toTime = new Date().getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime)).valueOf();
}

const PASSWORD ="j0y0fc0d1ng";
export const getWordOfDay = () => { 
    // January 1, 2022 Game Epoch
    const now = Date.now()
    const msInDay = 86400000
    const today = Math.floor((now - epochMs) / msInDay)
    const nextday = (today + 1) * msInDay + epochMs

    let wrdSrc = "Unknown";

    // If available in url, use that word!
    const queryParams = new URLSearchParams(window.location.search);
    // console.log("Parameter", queryParams);
    let word = queryParams.get('encoded');
    let password = queryParams.get('pass');
    let randomWord = queryParams.get('random');

    let picked: number
    if (randomWord) {
        picked = generateRandomPastDate()
        wrdSrc = "Random"
    } else {
        picked = today
        wrdSrc = "Daily"
    }

    // console.log("Word", word);
    // console.log("Password", password);
    // Three modes - No Word, Encoded Word, Plain word
    if (!word) {
        word = WORDS[picked % WORDS.length];
    } else if (!password || password !== PASSWORD) {// check password 
        word = decodeShabda(word);
        wrdSrc = "Encoded"
    }

    // console.log("FinalWord", word);

    // let encoded:string = encodeShabda(word);
    // console.log("Encoded =" , encoded);

    // word = decodeShabda(encoded);
    // Set the word length and attempts
    var akshare = getAkshars(word);
    console.log("Number of letters =" , akshare.length);
    setMaxWords(akshare.length);


    return {
        solution: word,
        solutionIndex: today,
        tomorrow: nextday,
        wordSource: wrdSrc
    }
}

export const {solution, solutionIndex, tomorrow, wordSource} = getWordOfDay()
