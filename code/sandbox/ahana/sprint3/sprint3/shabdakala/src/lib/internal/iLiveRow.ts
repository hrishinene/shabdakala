import { iCellProto } from "./iCellProto";
import { iRowProto } from "./iRowProto";
import { ZTuple } from "./ZTuple";

export class iLiveRow implements iRowProto {
    cells: iCellProto[] = [];

    constructor(cells: iCellProto[]) {
        this.cells = cells;
    }   
    getCells(): iCellProto[] {
        return this.cells;
    }

    getTuple(): ZTuple | undefined {
        return undefined;
    }

    isComplete(): boolean {
        return false;
    }
}