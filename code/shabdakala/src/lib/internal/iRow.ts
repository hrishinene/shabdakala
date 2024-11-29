import { ZTuple } from './ZTuple'; // Adjust the import path as necessary
import { iCell } from './iCell'; // Adjust the import path as necessary

export interface iRow {
    showHint(show: boolean, words: string[]): void;
    isComplete():boolean;
    getCells():iCell[];
    getTuple():ZTuple | undefined;
}   