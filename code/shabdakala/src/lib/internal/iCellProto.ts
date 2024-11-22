import { ZCellAddress } from "./ZCellAddress";

export class iCellProto {
    word: string
    address: ZCellAddress;
    isSelected: boolean = false
    isHinted: boolean = false
    wordDifficulty: number = -1;
    
    constructor(word : string, address : ZCellAddress) {
        this.word = word;
        this.address = address;
    }

    selectCell() {
        this.isSelected = !this.isSelected;
    }

    getWord() {
        return this.word;
    }

    showHint(show: boolean, words: string[]) {
        if (!words.includes(this.word))
            return; 

        this.isHinted = show;
        // this.isSelected = show;

        if (this.word === words[0]) this.wordDifficulty = 0;
        if (this.word === words[1]) this.wordDifficulty = 1;
        if (this.word === words[2]) this.wordDifficulty = 2;
    }
}   