import { ZCellAddress } from "./ZCellAddress";

export class iCellProto {
    word: string
    address: ZCellAddress;
    isSelected: boolean = false
    
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
}   