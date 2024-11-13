import { ZTuple } from './ZTuple'; // Adjust the import path as necessary
import { iCellProto } from './iCellProto'; // Adjust the import path as necessary

export interface iRowProto {
    isComplete():boolean;
    getCells():iCellProto[];
    getTuple():ZTuple | undefined;
}   