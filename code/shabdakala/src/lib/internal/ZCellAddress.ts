export class ZCellAddress {
    row:number;
    col:number;

    constructor(row:number, col:number) {
        this.row = row;
        this.col = col;
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.col;
    }

    toString() {
        return `(${this.row}, ${this.col})`;
    }

    equals(address:ZCellAddress) {
        return this.row == address.row && this.col == address.col;
    }
}