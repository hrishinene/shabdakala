// ZTuple is a type that represents a tuple of words - typically 4 and a theme
export type ZTuple = {
    words: string[]; 
    theme:string;
    sharedBy:string;
    difficulty:Number;
    createdOn:Date
}