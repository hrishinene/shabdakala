import { ZTuple } from "./ZTuple";

// ZCombo is a type that represents a combination of tuples - typically 3
export class ZCombo {
    tuples: ZTuple[];
    createdOn:Date;

    constructor(tuples: ZTuple[]) {
        this.tuples = tuples;
        this.createdOn = new Date();
    }

    getTuples() {
        return this.tuples;
    }

    // getMatchingTuple returns the tuple that matches the words
    getMatchingTuple(words: string[]) {
        // find the tuple that matches the words array with any sequence
        return this.tuples.find(tuple => {
            return words.length === tuple.words.length && words.every(word => tuple.words.includes(word));
        });
    }   
}