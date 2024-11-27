import { iCell } from "./iCell";
import { iRow } from "./iRow";
import { ZTuple } from "./ZTuple";

export class iCompleteRow implements iRow {
    tuple: ZTuple;

    constructor(tuple: ZTuple) {
        this.tuple = tuple;
    }
    showHint(show: boolean, words:string[]): void {
        // do nothing   
    }

    getCells(): iCell[] {
        // return empty array of iCellProto
        return [];
    }

    getTuple(): ZTuple {
        return this.tuple;
    }

    isComplete(): boolean {
        return true;
    }
}