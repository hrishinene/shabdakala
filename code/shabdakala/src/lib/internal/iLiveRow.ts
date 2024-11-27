import { iCell } from "./iCell";
import { iRow } from "./iRow";
import { ZTuple } from "./ZTuple";

export class iLiveRow implements iRow {
    cells: iCell[] = [];

    constructor(cells: iCell[]) {
        this.cells = cells;
    }

    showHint(show: boolean, words:string[]): void {
        // if cell contains the word, mark the cell as hinted
        this.cells.forEach(cell => {
            cell.showHint(show, words);
        });
    }

    getCells(): iCell[] {
        return this.cells;
    }

    getTuple(): ZTuple | undefined {
        return undefined;
    }

    isComplete(): boolean {
        return false;
    }
}