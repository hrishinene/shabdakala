//import { PresentationChartBarIcon } from '@heroicons/react/outline';
import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'unknown'

// CharValue is nothing but "Moolakshar" - rename later
export type CharValue =
'-'
| 'अ'
| 'आ'
| 'इ'
| 'ई'
| 'उ'
| 'ऊ'
| 'ए'
| 'ऐ'
| 'ओ'
| 'औ'
| 'अं'
| 'अः'
| 'क'
| 'ख'
| 'ग'
| 'घ'
| 'ङ'
| 'च'
| 'छ'
| 'ज'
| 'झ'
| 'ञ'
| 'ट'
| 'ठ'
| 'ड'
| 'ढ'
| 'ण'
| 'त'
| 'थ'
| 'द'
| 'ध'
| 'न'
| 'प'
| 'फ'
| 'ब'
| 'भ'
| 'म'
| 'य'
| 'र'
| 'ल'
| 'व'
| 'श'
| 'ष'
| 'स'
| 'ह'
| 'ळ'
| 'ऱ'
| 'क्ष'
| 'ज्ञ'
| 'श्र'

// Swaransh can't contain "Jod"
  export type Swaransh =
  0x0902
  | 0x0903
  | 0x093e
  | 0x093f
  | 0x0940
  | 0x0941
  | 0x0942
  | 0x0943
  | 0x0945
  | 0x0946
  | 0x0947
  | 0x0948
  | 0x0949
  | 0x094a
  | 0x094b
  | 0x094c
  | 0x094d
  | 0x094f
  | 0x0971 
  | 2307; 


const AllCharValues = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ळ', 'ऱ', 'क्ष', 'ज्ञ', 'श्र'];
const AllSwaransh = [0x0902, 0x903, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
// const Jod = 0x094d; // Check actually and confirm in wiki or java
// const JodChar = String.fromCharCode(Jod); // Check actually and confirm in wiki or java
  
  /** Unicode Util section - String utilities involving Unicode */
// export type Akshar = {chr : CharValue, swaranshList:Swaransh[], chrForm:string};
export type Akshar = {chrList: CharValue[], swaranshList: Swaransh[], chrForm:string};
export type AksharStatus = {akshar: Akshar, status: CharStatus};
export type GuessKeyMap = { 
  solution: Akshar[], 
  guessMap: { [guess: string]: {aksharStatuses: AksharStatus[], resolvedIndices:number[] }}, 
  keyMap: { [key: string]: CharStatus },
}

export type CharForm = {chr : CharValue, chrForm:string};
export type CharStatus2 = {chrForm : CharForm, status:CharStatus};

export function unicodeMatch(src:string, tgt:string) : boolean {
  var srcAkshare:Akshar[] = getPoornaAkshars(src);
  var tgtAkshare:Akshar[] = getPoornaAkshars(tgt);
  if (srcAkshare.length !== tgtAkshare.length) return false;

  for (var i =0; i < srcAkshare.length; i++ ) {
    // console.log("unicodeMatch", srcAkshare[i].chrForm, tgtAkshare[i].chrForm);
    if (!hasOverlappingMoolakshar(srcAkshare[i], tgtAkshare[i])) return false;
  }
  return true;
}

export function getShabda( akshars: CharForm[]) : string {
  let retval:string = "";
  akshars.forEach((val:CharForm) => {
  retval = retval.concat(val.chrForm);
  })
  return retval;
}

export function getPoornaShabda( akshars: Akshar[]) : string {
  let retval:string = "";
  akshars.forEach((val:Akshar) => {
  retval = retval.concat(val.chrForm);
  })
  return retval;
}

export function isRepeatAkshar(shabda : CharForm[]):boolean {
    for (var i = 0; i < shabda.length; i++) {
      var alpha:CharForm = shabda[i];

      for (var j = i+1; j < shabda.length; j++) {
        var beta:CharForm = shabda[j];
        if (alpha.chr === beta.chr) return true;
      }
    }
    // console.log("Akshar not repeat: ", JSON.stringify(shabda) );
    return false;
}

// This is major - what it does is, from string creates CharForm array.
// CharForm is nothing but CharValue and its form.
// One character can have multiple forms too... that's addition now.
// <HVN-TODO> Swaransh
export function getAksharsOld(shabda:string) : CharForm[] {
  // let AllCharValues  = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','ळ','क्ष','ज्ञ','श्र','ऱ']],;
//   let AllCharValues = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ळ', 'ऱ', 'क्ष', 'ज्ञ', 'श्र'];
  // let AllSwaransh = [0x0902, 0x903, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
  // console.log("Calling getAkshars");
  // console.log("initializing AllChars");
  // console.log("Calling getAkshars OLD with: ", shabda);
  let akshars:CharForm[] = [];
  let ch:CharValue = '-'; // use constant
  let form:string = "";
  // let sList:Swaransh[] = [];
  // let found:boolean = false;
    for (var i = 0; i < shabda.length; i++) {
      let alpha = shabda.charAt(i);
      if (AllCharValues.includes(alpha.charAt(0))) {
          if (ch !== '-') {
            //console.log("Pushing ", ch, " form ", form);
            let ChForm:CharForm = {chr : ch, chrForm : form};
            akshars.push(ChForm);
          }
          ch = alpha.charAt(0) as CharValue;
          form = ch;
      } else if (AllSwaransh.includes(alpha.charCodeAt(0))) {
          form = form.concat(alpha.charAt(0));
          //console.log("Char ", alpha, " form ", form);
      } else {
          console.log("Invalid character: ", alpha);
      }
    }
    //console.log("Pushing ", ch, " form ", form);
    let chForm:CharForm = {chr : ch, chrForm : form};
    akshars.push(chForm);

    // console.log("getAksharsOld returning: ", akshars);
    return akshars;
}

export function getAkshars(shabda:string) : CharForm[] {
  // console.log("Calling getAkshars New with: ", shabda);
  let akshars:Akshar[] = getPoornaAkshars(shabda);
  let charForms:CharForm[] = [];

    for (var i = 0; i < akshars.length; i++) {
      let akshar:Akshar = akshars[i];
      charForms.push({chr : akshar.chrList[0], chrForm : akshar.chrForm});
    }

  // console.log("getAksharsNew returning: ", charForms);
  return charForms;

} 

/**
 * Given the string - in the form of unicodes, break it into chunks of akshars.
 * Akshar contains set of Moolakshars and Jod along with Swaransh at the end
 * Every Moolakshar
 * @param shabda 
 * @returns 
 */
export function getPoornaAkshars(shabda:string) : Akshar[] {
  let AllCharValues = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ळ', 'ऱ', 'क्ष', 'ज्ञ', 'श्र'];
  let AllSwaransh = [0x0902, 0x903, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
  let Jod = 0x094d; // Check actually and confirm in wiki or java
  // let JodChar = String.fromCharCode(Jod); // Check actually and confirm in wiki or java
  // let AksharBreak = 0x094d;
  // console.log("Calling getAkshars");
  // console.log("initializing AllChars");
  let akshars:Akshar[] = [];
  let ch:CharValue = '-'; // use constant
  let form:string = "";
  let swaranshs:Swaransh[] = [];
  let chars:CharValue[] = [];
  // let sList:Swaransh[] = [];
  // let found:boolean = false;
    for (var i = 0; i < shabda.length; i++) {
      let alpha = shabda.charAt(i);
      let firstChar = alpha.charAt(0);
      let firstCharCode = alpha.charCodeAt(0);
      if (AllCharValues.includes(firstChar)) {
          if (ch !== '-') {
            // console.log("Pushing ", ch, " form ", form);
            let poornaAkshar:Akshar = {chrList : chars, swaranshList: swaranshs, chrForm : form};
            akshars.push(poornaAkshar);
            swaranshs = []; // clear
            chars = []; // clear
            form = ""; // clear
          }
          ch = firstChar as CharValue;
          chars.push(ch);
          form = form.concat(firstChar);
      } else if (AllSwaransh.includes(firstCharCode)) {
          form = form.concat(firstChar);
          swaranshs.push(firstCharCode as Swaransh);
          // console.log("Char ", alpha, " form ", form);
      } else if (firstCharCode === Jod) { // found a "jod" - continue appending
          form = form.concat(firstChar);
          ch = '-';
      } else {
          console.log("<HVN>Invalid character: ", alpha);
          console.log("<HVN>Invalid character: ", firstChar, firstCharCode, form);
      }
    }
    //console.log("Pushing ", ch, " form ", form);
    let lastAkshar:Akshar = {chrList : chars, swaranshList: swaranshs, chrForm : form};
    akshars.push(lastAkshar);

    return akshars;
}

export function getCharForm(ch:CharValue, str : string) : CharForm {
    let akshars:CharForm[] = getAkshars(str);
    for (var i = 0; i < akshars.length; i++) {
      if (akshars[i].chr === ch)
        return akshars[i];
    }
    return {chr:"-", chrForm:"-"};
}

// <HVN> Give a word and CharForm, match and return form and status
export function getStatus(splitSolution:CharForm[], chrForm:CharForm, indx : number) : CharStatus2 {
  var solutionIndx:number = findIndexOf(splitSolution, chrForm);
   //console.log("<HVN>Checking match: ", JSON.stringify(chrForm) );

  if (solutionIndx < 0 || solutionIndx > splitSolution.length) {
    // console.log("<HVN>No match: ", JSON.stringify(chrForm) );
    return {chrForm : {chr : chrForm.chr, chrForm : chrForm.chrForm}, status : 'absent'};
  }

  if (solutionIndx === indx) {
    // console.log("<HVN>Exact match: ", solutionIndex, "-", JSON.stringify(splitSolution[solutionIndx]) );
    return {chrForm : {chr : chrForm.chr, chrForm : splitSolution[solutionIndx].chrForm}, status : 'correct'};
  }

  // console.log("<HVN>Approximate match: ", solutionIndex, "-", JSON.stringify(splitSolution[solutionIndx]) );
  return {chrForm : {chr : chrForm.chr, chrForm : splitSolution[solutionIndx].chrForm}, status : 'present'};
}

export function findIndexOf(splitSolution:CharForm[], letter:CharForm) : number {
  // console.log("<HVN>Find Index - source = ", JSON.stringify(splitSolution), " target - " , JSON.stringify(letter));
    for (var i = 0; i < splitSolution.length; i++) {
      let form:CharForm = splitSolution[i];
      if (form.chr === letter.chr) {
          return i;
      } 
    }

    return -1;
}

export function isIncluded(splitSolution:CharForm[], letter:CharForm) : boolean {
  let indx:number = findIndexOf(splitSolution, letter);
  return indx > -1 && indx < splitSolution.length;
}

export const KeyVal = (statusMap : {[key: string]: CharStatus2 }, txt:string) : CharStatus2 =>{
    var retval : CharStatus2 = statusMap[txt];
    if (retval) return retval;

    return {chrForm:{chr : txt as CharValue, chrForm : txt}, status : 'unknown' };
}

/** Unicode section over */
/**
 * HVN code to convert to forms
 * @param guesses 
 */
export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus2 } => {
  const charObj: { [key: string]: CharStatus2 } = {};

  // console.log("Solution: ", solution, "Akshare: " + JSON.stringify(getAkshars(solution)));

  guesses.forEach((word) => {
    //console.log("Guess: ", word, "Akshare: " + JSON.stringify(getAkshars(word)));

    getAkshars(word).forEach((charForm:CharForm, i:number) => {
      // Iterate over solution to find exact form and match
      return charObj[charForm.chr]=getStatus(getAkshars(solution), charForm, i);
    });
});
  return charObj;
}

export const getGuessStatuses2 = (guess: string): CharStatus[] => {
  const statuses: CharStatus[]  = [];
  const guessAndKeyStatuses:GuessKeyMap = getAksharAndKeyStatuses([guess]);
  guessAndKeyStatuses.guessMap[guess].aksharStatuses.forEach((aksharStatus:AksharStatus, index) => {
    statuses[index] = aksharStatus.status;

  });

    // console.log("<HVN>statuses = ", statuses);
  return statuses
}

export const getGuessStatuses = (guess: string): CharStatus2[] => {
  const splitSolution:CharForm[] = getAkshars(solution);
  const splitGuess:CharForm[] = getAkshars(guess);

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus2[] = Array.from(Array(guess.length))

    //console.log("<HVN>splitSolution = ", JSON.stringify(splitSolution));
    //console.log("<HVN>splitGuess = ", JSON.stringify(splitGuess));
  // handle all correct cases first
  splitGuess.forEach((letter:CharForm, i) => {
    // console.log("<HVN>splitGuess.forEach letter = ", letter, " index = " + i);
    if (letter.chr === splitSolution[i].chr) {
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : splitSolution[i].chrForm}, status : 'correct'}
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter:CharForm, i) => {
    if (statuses[i]) return

    if (!isIncluded(splitSolution, letter)) {
      // handles the absent case
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : letter.chrForm}, status : 'absent'};
      return
    }

    // now we are left with "present"s
    const index =findIndexOf(splitSolution, letter);

    if (!solutionCharsTaken[i] && index > -1) {
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : splitSolution[i].chrForm}, status : 'present'};
      solutionCharsTaken[index] = true
      return
    } else {
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : letter.chrForm}, status : 'absent'};
      return
    }
  })

    // console.log("<HVN>statuses = ", statuses);
  return statuses
}

// -------------------------------------------------------------------------
// Shabdak3 - Complex data structures and implementations of Jodakshars etc.
// --------------------------------------------------------------------------
/**
 * 
 */
export type MatchStatus = 'absent' | 'present' | 'correct' | 'unknown'

export function exactMatch(src:string, tgt:string) : boolean {
  var srcAkshare:Akshar[] = getPoornaAkshars(src);
  var tgtAkshare:Akshar[] = getPoornaAkshars(tgt);
  if (srcAkshare.length !== tgtAkshare.length) return false;

  for (var i =0; i < srcAkshare.length; i++ ) {
    if (srcAkshare[i].chrForm !== tgtAkshare[i].chrForm) return false;    
  }
  return true;
}

export function match(src:Akshar, tgt:Akshar) : MatchStatus {
    if (src.chrForm === tgt.chrForm) return 'correct';
    
    src.chrList.forEach((srcChr:CharValue) => {
      tgt.chrList.forEach((tgtChr:CharValue) => {
        if (srcChr === tgtChr)
        return 'present';
      })
    });

  return 'absent';
}

export function getMoolaksharForm(ch:CharValue, str : string) : Akshar {
    let akshars:Akshar[] = getPoornaAkshars(str);
    for (var i = 0; i < akshars.length; i++) {
      if (akshars[i].chrList.includes(ch))
        return akshars[i];
    }

    // Not found
    return {chrList:["-"], swaranshList:[], chrForm:"-"};
}

// <HVN> This needs to be rewritten - with new advents in the unicode jodakshars
export function getAksharStatus(splitSolution:CharForm[], chrForm:CharForm, indx : number) : CharStatus2 {
  var solutionIndx:number = findIndexOf(splitSolution, chrForm);
   //console.log("<HVN>Checking match: ", JSON.stringify(chrForm) );

  if (solutionIndx < 0 || solutionIndx > splitSolution.length) {
    // console.log("<HVN>No match: ", JSON.stringify(chrForm) );
    return {chrForm : {chr : chrForm.chr, chrForm : chrForm.chrForm}, status : 'absent'};
  }

  if (solutionIndx === indx) {
    // console.log("<HVN>Exact match: ", solutionIndex, "-", JSON.stringify(splitSolution[solutionIndx]) );
    return {chrForm : {chr : chrForm.chr, chrForm : splitSolution[solutionIndx].chrForm}, status : 'correct'};
  }

  // console.log("<HVN>Approximate match: ", solutionIndex, "-", JSON.stringify(splitSolution[solutionIndx]) );
  return {chrForm : {chr : chrForm.chr, chrForm : splitSolution[solutionIndx].chrForm}, status : 'present'};
}

export const KeyVal2 = (statusMap : {[key: string]: CharStatus }, txt:string) : AksharStatus =>{
    var charStatus : CharStatus = statusMap[txt];
    // HVN TODO may not be so easy - when multiplicity is allowed
    if (charStatus !== null) {
      return { akshar: { chrList: [], swaranshList: [], chrForm: txt }, status: charStatus };
    }

    // Return dummy - should return null - but anyway...
    return {akshar:{chrList:[], swaranshList:[], chrForm:txt}, status : 'unknown' };
}

/** Unicode section over */
/**
 * HVN code to convert guesses to datastructures. 
 * This function will be called while rendering guesses
 * as well as rendering keyboard.
 * This is the master function to process guesses and Keyboard keys
 * 
 * @param guesses 
 */
export const getAksharAndKeyStatuses = (
  guesses: string[]
): GuessKeyMap => {
  // With multiple passes
  // initialize guessKeyMap
  let guessKeyMap:GuessKeyMap = {solution:[], guessMap: {}, keyMap: {}};
  let map:GuessKeyMap = prepareGuessKeyMap(guesses, guessKeyMap);
  
  // do series of checks for each guess
  guesses.forEach((word) => {
    // map = prepareKeyStatuses(word, map);
    map = matchPerfectFormPerfectPosition(word, map);
    map = matchImPerfectFormPerfectPositionForPlainAkshar(word, map);
    map = matchPerfectFormImperfectPosition(word, map);
    map = matchImPerfectFormPerfectPosition(word, map);
    map = matchImPerfectFormImperfectPosition(word, map);
});

  // return charObj;
  return map;
}

// Atomic Utility Functions
/**
 * Akshar is a jodakshar if it has more than one akshars and that is not moolakshar
 * @param a Akshar which may be moolakshar or jodakshar
 * @returns 
 */
export const isJodakshar = (a:Akshar) : boolean => {
  if (a.chrList.length === 1) return false;

  if (isMoolakshar(a)) return false;

  return true;
}

export const isMoolakshar = (a:Akshar) : boolean => {
  let normalForm:string = getNormalForm(a);

  return AllCharValues.includes(normalForm);
}

export const getNormalForm = (a:Akshar) : string => {
  let Jod = 0x094d; // Check actually and confirm in wiki or java
  let JodChar = String.fromCharCode(Jod); // Check actually and confirm in wiki or java
  let retval:string = "";
  let first = true;
  a.chrList.forEach((val:CharValue) => {
    if (first) {
      first = false;
    } else {
      retval.concat(JodChar);
    }
  });

  return retval;
}

export const getMoolakshars = (a:Akshar) : CharValue[] => {
  // if it's moolakshar, straight forward.
  if (isMoolakshar(a)) {
    return [getNormalForm(a) as CharValue];
  }

  return a.chrList;
}

// Match functions
function prepareGuessKeyMap(guesses:string[], map:GuessKeyMap) : GuessKeyMap {
  // populate guess akshars with unknown status - initially
  // Populate Solution
  let solutionAkshars = getPoornaAkshars(solution);
  map.solution = solutionAkshars;

  // populate All guesses one by one
  guesses.forEach((guess:string) => {
    let guessAkshars = getPoornaAkshars(guess);
    let aksharStatuses: AksharStatus[] = [];
    guessAkshars.forEach((a: Akshar, index) => {
      aksharStatuses[index] = { akshar: a, status: "absent" };
      updateKeyMap(map, a, "absent" );
    });
    map.guessMap[guess] = {aksharStatuses:aksharStatuses, resolvedIndices: []};
  });

  return map;
}

/**
 * Before the guess, convert keys status to absent (whichever are unknown)
 * @param guess 
 * @param map 
 * @returns 
 */
// function prepareKeyStatuses(guess:string, map:GuessKeyMap) : GuessKeyMap {
  // let akshars:Akshar[] = getPoornaAkshars(guess);
  // Convert all keys to absent if they are unknown
  // akshars.forEach((akshar:Akshar) => {
    // updateKeyMap(map, akshar, "absent");
  // });
  // return map;
// } 

function matchPerfectFormPerfectPosition(guess:string, map:GuessKeyMap) : GuessKeyMap {
  let guessAksharStatuses = map.guessMap[guess].aksharStatuses;
  let resolvedIndices = map.guessMap[guess].resolvedIndices;
  map.solution.forEach((solAkshar:Akshar, index) => {
    let guessAksharStatus:AksharStatus = guessAksharStatuses[index];
    if (solAkshar.chrForm === guessAksharStatus.akshar.chrForm) {
      guessAksharStatus.status = "correct"; // if by reference, this is all that is needed
      resolvedIndices.push(index);
      updateKeyMap(map, solAkshar, "correct");
      return;
    }
  });
  return map;
} 

function matchImPerfectFormPerfectPositionForPlainAkshar(guess:string, map:GuessKeyMap) : GuessKeyMap {
  let guessAksharStatuses = map.guessMap[guess].aksharStatuses;
  let resolvedIndices = map.guessMap[guess].resolvedIndices;

  map.solution.forEach((solAkshar:Akshar, index) => {
    if (resolvedIndices.includes(index)) // don't process
      return;

    let guessAksharStatus:AksharStatus = guessAksharStatuses[index];
    if (guessAksharStatus.akshar.chrList.length === 1 // plain letter
      && guessAksharStatus.akshar.swaranshList.length === 0 
      && hasOverlappingMoolakshar(solAkshar, guessAksharStatus.akshar) 
      && guessAksharStatus.status === "absent") {
      guessAksharStatus.akshar = solAkshar; // if by reference, this is all that is needed
      guessAksharStatus.status = "correct"; // if by reference, this is all that is needed
      resolvedIndices.push(index);
      updateKeyMap(map, solAkshar, "correct");
      return;
    }
  });
  return map;
} 

function matchPerfectFormImperfectPosition(guess:string, map:GuessKeyMap) : GuessKeyMap {
  let guessAksharStatuses = map.guessMap[guess].aksharStatuses;
  let resolvedIndices = map.guessMap[guess].resolvedIndices;
  map.solution.forEach((solAkshar: Akshar, solutionIndx) => {
      if (resolvedIndices.includes(solutionIndx)) {
        return;
      }

    let found:boolean = false;
    guessAksharStatuses.forEach((guessAksharStatus: AksharStatus, guessIndex) => {
      if (found) return;

      if (solutionIndx !== guessIndex) {
        if (solAkshar.chrForm === guessAksharStatus.akshar.chrForm) {
          if (guessAksharStatus.status === "absent") {
            guessAksharStatus.status = "present";
            resolvedIndices.push(solutionIndx);
          }
          updateKeyMap(map, guessAksharStatus.akshar, "present");
          found = true;
        }
      }
    });
  });

  return map;
} 

function matchImPerfectFormPerfectPosition(guess:string, map:GuessKeyMap) : GuessKeyMap {
  let guessAksharStatuses = map.guessMap[guess].aksharStatuses;
  let resolvedIndices = map.guessMap[guess].resolvedIndices;
  map.solution.forEach((solAkshar: Akshar, solutionIndx) => {
    if (resolvedIndices.includes(solutionIndx))
      return;

    let found:boolean = false;

    let guessAksharStatus: AksharStatus = guessAksharStatuses[solutionIndx];
    if (!found && hasOverlappingMoolakshar(solAkshar, guessAksharStatus.akshar) && guessAksharStatus.status === "absent") {
      guessAksharStatus.akshar = solAkshar; // if by reference, this is all that is needed
      guessAksharStatus.status = "correct"; // if by reference, this is all that is needed
      resolvedIndices.push(solutionIndx);
      updateKeyMap(map, guessAksharStatus.akshar, "correct");
      found = true;
    }
  });

  return map;
} 

function matchImPerfectFormImperfectPosition(guess:string, map:GuessKeyMap) : GuessKeyMap {
  let guessAksharStatuses = map.guessMap[guess].aksharStatuses;
  let resolvedIndices = map.guessMap[guess].resolvedIndices;
  map.solution.forEach((solAkshar: Akshar, solutionIndx) => {
    if (resolvedIndices.includes(solutionIndx)) {
      return;
    }

    let found:boolean = false;
    guessAksharStatuses.forEach((guessAksharStatus: AksharStatus, guessIndex) => {
      if (solutionIndx !== guessIndex) {
        if (!found && hasOverlappingMoolakshar(solAkshar, guessAksharStatus.akshar) && guessAksharStatus.status === "absent") {
          guessAksharStatus.akshar = solAkshar; // if by reference, this is all that is needed
          guessAksharStatus.status = "present";
          updateKeyMap(map, guessAksharStatus.akshar, "present");
          resolvedIndices.push(solutionIndx);
          found = true;
        }
      }
    });
  });

  return map;
} 

// Functions for rendering Guess and Keyboard
export function getGuessForm(guess:string, map:GuessKeyMap):AksharStatus[] {
  return map.guessMap[guess].aksharStatuses;
}

export function getKeyForm(key:string, map:GuessKeyMap):CharStatus {
  return map.keyMap[key];
}

function hasOverlappingMoolakshar(solAkshar: Akshar, guessAkshar: Akshar) : boolean {
  let solMoolakshars = getMoolakshars(solAkshar);
  let guessMoolakshars = getMoolakshars(guessAkshar);

  const filteredArray = solMoolakshars.filter(value => guessMoolakshars.includes(value));
  return filteredArray.length > 0;
}

function updateKeyMap(map: GuessKeyMap, akshar: Akshar, status: CharStatus) {
  getMoolakshars(akshar).forEach((moolakshar:CharValue) => {
    let existingStatus:CharStatus = map.keyMap[moolakshar];
    // console.log("UpdateKeyMap", moolakshar, existingStatus, "=>", status);
    if (existingStatus === undefined || existingStatus === "absent") {
      map.keyMap[moolakshar] = status;
      return;
    }

    if (status === existingStatus) return;

    if (status === "correct") {
      map.keyMap[moolakshar] = status;
      return;
    }
  });
}

export function encodeShabda(shabda:string) : string {
    let encoded:string = "";
    for (var i = 0; i < shabda.length; i++) {
      let charCode = shabda.charCodeAt(i);
      // console.log("Encoding Original", String.fromCharCode(charCode), "New => ", String.fromCharCode((charCode + i + 3)));
      encoded = encoded.concat(String.fromCharCode(charCode + i + 3));
    }
  return encoded;
}

export function decodeShabda(shabda:string) : string {
    let decoded:string = "";
    for (var i = 0; i < shabda.length; i++) {
      let charCode = shabda.charCodeAt(i);
      // console.log("Decoding Original", String.fromCharCode(charCode), "New => ", String.fromCharCode((charCode - i - 3)));
      decoded = decoded.concat(String.fromCharCode(charCode - i - 3));
    }


  return decoded;
}

export function getEncodedUrl(baseUrl:string) {
  let encoded = baseUrl +"?encoded=" + encodeShabda(solution);
  // console.log("Url =", encoded);
  return encoded;
}

