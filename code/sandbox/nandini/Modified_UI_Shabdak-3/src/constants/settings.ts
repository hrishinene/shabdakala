export let MAX_WORD_LENGTH = 4
export let MAX_CHALLENGES = 2
export const RANDOM_DATE = true
// export const FORM_LINK = "https://forms.gle/EFjoyEsdaxk3bCpf6"
export const FORM_LINK = "https://forms.gle/43tbxoHU3tS1zvWQ9"

//<AGA> : number of cells in every row is also set from words.ts
export function setMaxWords(len:number) {
    MAX_WORD_LENGTH = len;
    //<AGA> : number of rows is now hardcoded
    MAX_CHALLENGES = 2;
    switch (len) {
        case 3:
           MAX_CHALLENGES = 2; 
            break;
        case 4:
           MAX_CHALLENGES = 2; 
            break;
    
        default:
            MAX_CHALLENGES = 2;
            break;
    }
}
