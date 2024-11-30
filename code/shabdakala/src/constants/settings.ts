export const FORM_LINK = "https://forms.gle/bjzjiCuYY5n8SkXMA"

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

// Dates and Epoch
const epoch = new Date('November 29, 2024 00:00:00');
const epochMs = epoch.valueOf()
const now = Date.now()
const msInDay = 86400000

export const Today = Math.floor((now - epochMs) / msInDay)
export const Tomorrow = (Today + 1) * msInDay + epochMs
export const StartDate:Date = new Date("2024-11-30");
