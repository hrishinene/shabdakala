import { iCellProto } from "./iCellProto";
import { iRowProto } from "./iRowProto";
import { ZTuple } from "./ZTuple";

export class iCompleteRow implements iRowProto {
    tuple: ZTuple;

    constructor(tuple: ZTuple) {
        this.tuple = tuple;
    }
    showHint(show: boolean, words:string[]): void {
        // do nothing   
    }

    getCells(): iCellProto[] {
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