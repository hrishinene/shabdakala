import { iCompleteRow } from './iCompleteRow';
import { iLiveRow } from './iLiveRow';
import { iRowProto } from './iRowProto';
import { ZCombo } from './ZCombo'; // Adjust the import path as necessary
import { shuffleArray } from '../Utils'; // Adjust the import path as necessary
import { iCellProto } from './iCellProto';

export class iGameProto {
    combo: ZCombo;
    rows: iRowProto[];
    
    constructor(combo:ZCombo, rows:iRowProto[]) {
        this.combo = combo;
        this.rows = rows;
        if (rows == undefined || rows.length == 0) {
            this.populate();
        }
    }


    // Shuffle will populate rows from combo and shuffle the rows
    populate() {
        // Manufacture rows from combo
        // First row is completed row
        this.rows[0] = new iCompleteRow(this.combo.tuples[0]); // first row is completed row
        // second and third rows are live rows

        const wordsArray: string[] = [];
        wordsArray.push(...this.combo.tuples[1].words);
        wordsArray.push(...this.combo.tuples[2].words);

        var shuffledArray = shuffleArray(wordsArray);
        
        this.rows[1] = new iLiveRow([new iCellProto(shuffledArray[0], 10), 
            new iCellProto(shuffledArray[1], 11), new iCellProto(shuffledArray[2], 12), new iCellProto(shuffledArray[3], 13)]);

        this.rows[2] = new iLiveRow([new iCellProto(shuffledArray[4], 14), 
            new iCellProto(shuffledArray[5], 15), new iCellProto(shuffledArray[6], 16), new iCellProto(shuffledArray[7], 17)]);

    }

    shuffle() {
    }
}   