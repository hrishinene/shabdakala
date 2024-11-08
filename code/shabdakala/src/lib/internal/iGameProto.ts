import { iCompleteRow } from './iCompleteRow';
import { iLiveRow } from './iLiveRow';
import { iRowProto } from './iRowProto';
import { ZCombo } from './ZCombo'; // Adjust the import path as necessary
import { shuffleArray } from '../Utils'; // Adjust the import path as necessary
import { iCellProto } from './iCellProto';
import { ZCellAddress } from './ZCellAddress';

export class iGameProto {
    combo: ZCombo;
    solvedThemes: string[] = [];
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
        // reset rows
        this.rows = [];

        // First fill the solved themes with Complete Rows
        this.solvedThemes.map(theme => {
            this.combo.tuples.forEach(tuple => {
                if (tuple.theme == theme) {
                    this.rows.push(new iCompleteRow(tuple));
                }
            });
        }
        );

        const wordsArray: string[] = [];
        // shuffle remaining tuples
        this.combo.tuples.map((tuple, index) => {
            if (!this.solvedThemes.includes(tuple.theme)) {
                wordsArray.push(...tuple.words);
            }
        });

        if (wordsArray.length == 0) {
            return;
        }

        var shuffledArray = shuffleArray(wordsArray);

        var shuffledArrayIndex = 0;
        for (var index = this.rows.length; index < this.combo.tuples.length; index++) {
            this.rows.push(new iLiveRow([ 
                new iCellProto(shuffledArray[shuffledArrayIndex], new ZCellAddress(index, 0)),
                new iCellProto(shuffledArray[shuffledArrayIndex + 1], new ZCellAddress(index, 1)),
                new iCellProto(shuffledArray[shuffledArrayIndex + 2], new ZCellAddress(index, 2)),
                new iCellProto(shuffledArray[shuffledArrayIndex + 3], new ZCellAddress(index, 3)),
            ]));       

            shuffledArrayIndex += 4;
        }
    }

    shuffle() {
        this.populate();
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

    handleUnselect() {
        this.rows.forEach(row => {
            row.getCells().forEach(cell => {
                cell.isSelected = false;
            });   
        });
    }

    handleSubmision() {
        // Make sure all cells are selected
        var selectedCells = this.getSelectedCells();
        if (selectedCells.length != 4) {
            return;
        }

        // Check if the selected cells match the tuple
        var selectedWords = selectedCells.map(cell => cell.word);
        var matchingTuple = this.combo.getMatchingTuple(selectedWords);
        if (matchingTuple) {
            // Mark the row as complete 
            var completeRow = new iCompleteRow(matchingTuple);
            this.solvedThemes.push(matchingTuple.theme);

            // Unselect all cells
            this.handleUnselect();
            return true;
        }

        return false;
        
    }

    getFirstLiveRowIndex() {
        const index = this.rows.findIndex(row => !row.isComplete());
        return index !== -1 ? index : -1;
    }

    isWon() {
        return this.getCompletedRows().length == this.combo.tuples.length;
    }

    getCompletedRows() {
        return this.rows.filter(row => row.isComplete());
    }
}   
