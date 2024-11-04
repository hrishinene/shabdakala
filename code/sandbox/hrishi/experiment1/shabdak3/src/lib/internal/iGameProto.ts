import { iRowProto } from './iRowProto';
import { ZTuple } from './ZTuple'; // Adjust the import path as necessary

export class iGameProto {
    tuple: ZTuple; // Base model for the game
    rowProto: iRowProto[] = []; // Array of rows
    
    constructor(json:ZTuple) {
        this.tuple = json || {words: ["red", "green", "red", "tree"], oddIndex: 3};

        this.rowProto[0] = new iRowProto(this.tuple.words);
    }
}   