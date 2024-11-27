import { ZAttempt } from "./ZAttempt";
import { ZTuple } from "./ZTuple";

// ZCombo is a type that represents a combination of tuples - typically 3
export class ZCombo {
    tuples: ZTuple[];
    createdOn:Date;

    constructor(tuples: ZTuple[], createdOn?:Date) {
        // sort tuples in the order of difficulty
        tuples.sort((a, b) => a.difficulty - b.difficulty);
        this.tuples = tuples;
        this.createdOn = createdOn ? createdOn : new Date();
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

    getMinimumWrongWords(selectedWords: string[]) {
        // find the tuple that matches the words array with any sequence
        return this.tuples.reduce((min, tuple) => {
            const wrongWords = tuple.words.filter(word => !selectedWords.includes(word));
            return wrongWords.length < min ? wrongWords.length : min;
        }, 1000);
    }

    getMatchIndicators(attempt: ZAttempt): number[] {
        // find difficulty of the tuple in which the words from attempt is present
        var matchIndicators: number[] = [];
        attempt.words.forEach(word => {
            const tuple = this.tuples.find(tuple => tuple.words.includes(word));
            if (tuple) {
                matchIndicators.push(tuple.difficulty);
            }
        });

        return matchIndicators;
    }

    getWordsFromEachTuple(): string[] {
        // get only first word from each tuple
        return this.tuples.map(tuple => tuple.words[0]);
    }

    // Compare each word from each tuple of the combo
    equals(other: ZCombo) : boolean {
        if (this.tuples.length !== other.tuples.length) {
            return false;
        }

        // compare each tuple themes
        for (let i = 0; i < this.tuples.length; i++) {
            if (this.tuples[i].theme !== other.tuples[i].theme) {
                console.log("Themes do not match");
                return false;
            }
        }
        console.log("Themes do match");
        return true;
    }
}