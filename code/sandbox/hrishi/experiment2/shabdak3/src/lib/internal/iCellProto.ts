import { ZCellAddress } from "./ZCellAddress";

export class iCellProto {
    word: String = "Undefined"
    address: ZCellAddress;
    isSelected: boolean = false
    
    constructor(word : String, address : ZCellAddress) {
        this.word = word;
        this.address = address;
    }

    selectCell() {
        this.isSelected = !this.isSelected;
    }

    getWord() {
        return this.isSelected ? "["+this.word+"]" : this.word;
    }
}   