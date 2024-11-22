import { iCellProto } from "./iCellProto";
import { iRowProto } from "./iRowProto";
import { ZTuple } from "./ZTuple";

export class iLiveRow implements iRowProto {
    cells: iCellProto[] = [];

    constructor(cells: iCellProto[]) {
        this.cells = cells;
    }

    showHint(show: boolean, words:string[]): void {
        // if cell contains the word, mark the cell as hinted
        this.cells.forEach(cell => {
            cell.showHint(show, words);
        });
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