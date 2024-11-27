export function shuffleArray(array: any[]): any[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};


export function findDaysOffset(date1 : Date, date2 : Date, array : any[]) : number {
  const normalizedDate1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const normalizedDate2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
  // Calculate the difference in days
  const diffInDays = Math.round((normalizedDate1.getTime() - normalizedDate2.getTime()) / (1000 * 60 * 60 * 24));
  console.log("calc index : " + ((diffInDays % array.length) + array.length) % array.length);
  // Return the modulo of the difference with the array length
  return ((diffInDays % array.length) + array.length) % array.length; // Ensure non-negative result
}

export function getElement(array : any[], index : number) : any {
  return array[index % array.length];
}

export function findDaysDifference(start : Date, end : Date) : number {
  const normalizedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const normalizedEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  var days = Math.round((normalizedEnd.getTime() - normalizedStart.getTime()) / (1000 * 60 * 60 * 24));
  return days < 0 ? -days : days;
}

export function findDaysDifferenceFromToday(date : Date) : number {
  return findDaysDifference(new Date(), date);
}

export function findArrayElement(array : any[], index : number) : any {
  return array[index % array.length];
}

export const encodingUrlTest = (baseUrl:string, combo: any | null) =>
  {
    let encoded = baseUrl;
    if(combo != null)
    {
      var temp_tuples = combo.getTuples();
      var temp_encode = ''
      const wordsString = temp_tuples.map((tuple: { words: any[]; theme: any; sharedBy: any; difficulty: any; }) => 
        `${tuple.words.join('#')}%${tuple.theme}%${tuple.sharedBy}%${tuple.difficulty}`
    ).join('!');  // Join all tuples with '!'


      for (let i = 0; i < wordsString.length; i++) 
        {
          let charCode = wordsString.charCodeAt(i);
          temp_encode = temp_encode.concat(String.fromCharCode(charCode + i + 3));  // Shift character codes
        }
      encoded = encoded + "?encoded=" + temp_encode
    }
    
    return encoded;

  }

  export const decodingUrlTest = (encodedUrl : String) =>
  {
    let partlyDecodedWordList: string = "";

    let toBeDecoded = encodedUrl.split("http://localhost:3000/?encoded=")[1] || "";

    let decodedTupleList: any[] = []; //to hold decoded tuples
    
    for (let i = 0; i < toBeDecoded.length; i++) {
      let charCode = toBeDecoded.charCodeAt(i);
      partlyDecodedWordList = partlyDecodedWordList.concat(String.fromCharCode(charCode - i - 3)); // Decoding logic
  }

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
