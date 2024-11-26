export let MAX_WORD_LENGTH = 4
export let MAX_CHALLENGES = 6
export const RANDOM_DATE = true
// export const FORM_LINK = "https://forms.gle/EFjoyEsdaxk3bCpf6"
// export const FORM_LINK = "https://forms.gle/43tbxoHU3tS1zvWQ9"
export const FORM_LINK = "https://forms.gle/bjzjiCuYY5n8SkXMA"

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

export type ZColor = {
    bgcolor: string; 
    background: string; 
    shareIcon:string;
}

export const Colors:ZColor[] = [
    { bgcolor: "bg-lime-500", background: "#47fd55", shareIcon: "🟩" },
    { bgcolor : "bg-orange-400", background: "#fdb047", shareIcon: "🟧" },
    // { bgcolor : "bg-violet-300", background: "#d093fe", shareIcon: "🟪" }
    { bgcolor : "bg-blue-300", background: "#d093fe", shareIcon: "🟦" }
]

export const StartDate:Date = new Date("2024-11-21");
