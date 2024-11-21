import { ZCellAddress } from "./ZCellAddress";

export class iCellProto {
    word: string
    address: ZCellAddress;
    isSelected: boolean = false
    isVibarting: boolean= false
    isElevating: boolean=false
    
    constructor(word : string, address : ZCellAddress) {
        this.word = word;
        this.address = address;
    }

    selectCell() {
        this.isSelected = !this.isSelected;
    }
    vibrateCell(){
        this.isVibarting = !this.isVibarting;
    }

    elevateCell(){
        this.isElevating = !this.isElevating
    }

    getWord() {
        return this.word;
    }
}   