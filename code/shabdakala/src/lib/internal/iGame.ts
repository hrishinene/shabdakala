import { iCompleteRow } from './iCompleteRow';
import { iLiveRow } from './iLiveRow';
import { iRow } from './iRow';
import { ZCombo } from './ZCombo'; // Adjust the import path as necessary
import { shuffleArray } from '../Utils'; // Adjust the import path as necessary
import { iCell } from './iCell';
import { ZCellAddress } from './ZCellAddress';
import { ZAttempt } from './ZAttempt';
import { loadGameStorage } from '../localStorage';

export class iGame {
    combo: ZCombo;
    solvedThemes: string[] = [];
    remainingLives: number = 3;
    attempts: ZAttempt[] = [];
    rows: iRow[] = [];

    constructor(combo: ZCombo, solvedThemes: string[], remainingLives: number = 3, attempts: ZAttempt[] = []) {
        this.combo = combo;
        this.solvedThemes = solvedThemes;
        this.remainingLives = remainingLives;
        this.attempts = attempts;
        this.populate();
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
                new iCell(shuffledArray[shuffledArrayIndex], new ZCellAddress(index, 0)),
                new iCell(shuffledArray[shuffledArrayIndex + 1], new ZCellAddress(index, 1)),
                new iCell(shuffledArray[shuffledArrayIndex + 2], new ZCellAddress(index, 2)),
                new iCell(shuffledArray[shuffledArrayIndex + 3], new ZCellAddress(index, 3)),
            ]));       

            shuffledArrayIndex += 4;
        }
    }

    shuffle() {
        this.populate();
    }

    getSelectedCells() {
        var selectedCells: iCell[] = [];
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

        // Check if the selected words are present in attempts in any order
        if (this.attempts.find(attempt => {
            const sortedAttemptWords = attempt.words.slice().sort();
            const sortedSelectedWords = selectedWords.slice().sort();
            return sortedAttemptWords.every((word, index) => word === sortedSelectedWords[index]);
        })) {
            return -1;
        }
        // if (this.attempts.find(attempt => attempt.words.every((word, index) => word === selectedWords[index]))) {
            // return -1;
        // }

        // Add to attempts
        this.attempts.push({
            words: selectedWords,
            attemptNumber: this.attempts.length + 1
        });

        var matchingTuple = this.combo.getMatchingTuple(selectedWords);
        if (matchingTuple) {
            // Mark the row as complete 
            // var completeRow = new iCompleteRow(matchingTuple);
            this.solvedThemes.push(matchingTuple.theme);

            // Unselect all cells
            this.handleUnselect();
            return 0;
        }

        // Reduce lives
        this.remainingLives -= 1;
        return this.combo.getMinimumWrongWords(selectedWords);
    }

    getFirstLiveRowIndex() {
        const index = this.rows.findIndex(row => !row.isComplete());
        return index !== -1 ? index : -1;
    }

    isWon() {
        return this.solvedThemes.length == this.combo.tuples.length;
    }

    isLost() {
        return this.remainingLives == 0;
    }

    getCompletedRows() {
        return this.rows.filter(row => row.isComplete());
    }

    showHint(show: boolean) {
        var words:string[] = this.combo.getWordsFromEachTuple();
        this.rows.forEach(row => {
            row.showHint(show, words);
        });
    }

    reveal() {
        // reveal the solution. Mark all rows as complete
        // copy tuples in local variable
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

        // reveal remaining tuples
        this.combo.tuples.map((tuple, index) => {
            if (!this.solvedThemes.includes(tuple.theme)) {
                this.rows.push(new iCompleteRow(tuple));
            }
        });
    }

    static loadGame() : iGame | null {
        const gameStorage = loadGameStorage();
        if (!gameStorage) {
            return null;
        }

        const combo = new ZCombo(gameStorage.comboStorage.tuples, gameStorage.comboStorage.createdOn);
        const solvedThemes = gameStorage.solvedThemesStorage;
        const remainingLives = gameStorage.remainingLives;
        const attempts = gameStorage.attempts;

        return new iGame(combo, solvedThemes, remainingLives, attempts);
        
    }
}   
