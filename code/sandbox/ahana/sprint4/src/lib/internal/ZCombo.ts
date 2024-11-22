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

    isTupleEqual(tuple1:ZTuple,tuple2:ZTuple){
        var wordsEqual=JSON.stringify(tuple1) == JSON.stringify(tuple2);
        var themeEqual=tuple1.theme==tuple2.theme;
        var sharedByEqual=tuple1.sharedBy==tuple2.sharedBy;
        var difficultyEqual=tuple1.difficulty==tuple2.difficulty;


        if(wordsEqual&&sharedByEqual&&themeEqual&&difficultyEqual){
            return true
        }
        else{
            return false 
        }

    }
    
    isComboEqual(localStroagecombo: ZCombo){
        var i;
        for(i=0;i<3;i++){
            if(this.isTupleEqual(this.tuples[i],localStroagecombo.tuples[i])){
                continue
            }
            else{
                return false 
            }
        }
        return true 
    }  
}