import { iCompleteRow } from './iCompleteRow';
import { iLiveRow } from './iLiveRow';
import { iRowProto } from './iRowProto';
import { ZCombo } from './ZCombo'; // Adjust the import path as necessary
import { shuffleArray } from '../Utils'; // Adjust the import path as necessary
import { iCellProto } from './iCellProto';
import { ZCellAddress } from './ZCellAddress';

export class iGameProto {
    combo: ZCombo;
    rows: iRowProto[];

    constructor(combo: ZCombo, rows: iRowProto[]) {
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
        // this.rows[0] = new iCompleteRow(this.combo.tuples[0]); // first row is completed row
        // second and third rows are live rows

        const wordsArray: string[] = [];
        wordsArray.push(...this.combo.tuples[0].words);
        wordsArray.push(...this.combo.tuples[1].words);
        wordsArray.push(...this.combo.tuples[2].words);

        var shuffledArray = shuffleArray(wordsArray);

        this.combo.tuples.map((tuple, index) => {
            var shuffledArrayIndex = index * 3;
            this.rows[index] = new iLiveRow([
                new iCellProto(shuffledArray[shuffledArrayIndex], new ZCellAddress(index, 0)),
                new iCellProto(shuffledArray[shuffledArrayIndex + 1], new ZCellAddress(index, 1)),
                new iCellProto(shuffledArray[shuffledArrayIndex + 2], new ZCellAddress(index, 2)),
                new iCellProto(shuffledArray[shuffledArrayIndex + 3], new ZCellAddress(index, 3)),
            ]);
        });
    }

    shuffle() {
    }

    getSelectedCells() {
        var selectedCells: iCellProto[] = [];
        this.rows.forEach(row => {
            row.getCells().forEach(cell => {
                if (cell.isSelected) {
                    selectedCells.push(cell);
                }
            });   
        });

        return selectedCells
    }

    unselectAll() {
        this.rows.forEach(row => {
            row.getCells().forEach(cell => {
                cell.isSelected = false;
            });   
        });
    }
}   