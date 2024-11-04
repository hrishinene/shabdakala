export class iCellProto {
    word: String = "Undefined"
    address: number = 0;
    isSelected: boolean = false
    
    constructor(word : String, address : number) {
        this.word = word;
        this.address = address;
    }

    selectCell() {
        this.isSelected = true;
    }

    getWord() {
        return this.isSelected ? "["+this.word+"]" : this.word;
    }
}   