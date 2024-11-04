import { ZTuple } from './ZTuple'; // Adjust the import path as necessary
import { iCellProto } from './iCellProto'; // Adjust the import path as necessary

export class iRowProto {
    words: String[] | undefined;
    cells: iCellProto[] = [];
    
    constructor(words : String[]) {
        this.words = words;
        words.map((word, index) => {
            this.cells.push(new iCellProto(word, index));
        });
    }
}   