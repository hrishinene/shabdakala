export let MAX_WORD_LENGTH = 4
export let MAX_CHALLENGES = 6
export const RANDOM_DATE = true
// export const FORM_LINK = "https://forms.gle/EFjoyEsdaxk3bCpf6"
export const FORM_LINK = "https://forms.gle/43tbxoHU3tS1zvWQ9"

export function setMaxWords(len:number) {
    MAX_WORD_LENGTH = len;
    MAX_CHALLENGES = 6;
    switch (len) {
        case 3:
           MAX_CHALLENGES = 8; 
            break;
        case 4:
           MAX_CHALLENGES = 7; 
            break;
    
        default:
            MAX_CHALLENGES = 6;
            break;
    }
}
