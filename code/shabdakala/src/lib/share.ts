import { GAME_TITLE, GAME_URL, GAME_ENCODE_URL, TICK_EMOJI, CROSS_EMOJI } from '../constants/strings'
import { Colors, Today} from '../constants/settings'
import { iGame } from './internal/iGame'

//---------------------------------------------------
// Shabdabandha sharing logic
//---------------------------------------------------
export const shareShabdabandhaStatus = (game: iGame): void => {
    let encodedUrl = "shabdabandha.shabdak.com";
    let lost = game.isLost();
    let attemptsCount = game.attempts.length;

    let msg = lost ? "मी प्रयत्न केलेले शब्दबंध:" : "मी सोडवलेले शब्दबंध:";
    let text = `${GAME_TITLE} (${Today}) ${lost ? 'X' : attemptsCount}/5\n\n` +
        generateSBEmojiGrid(game) + `\n` + GAME_URL + `\n`;
        // generateEmojiGrid3([['medium', 'easy', 'hard', 'easy'], ['medium', 'medium', 'medium', 'medium'], ['hard', 'hard', 'hard', 'hard'], ['easy', 'easy', 'easy', 'easy']]) + `\n\n` + GAME_URL + `\n\n` + msg + `\n` + encodedUrl;

    // TODO - prepare the text to share
    // let text = "❌ 🟩🟧🟦🟧\n✅ 🟧🟧🟧🟧\n❌ 🟩🟦🟦🟦\n✅ 🟦🟦🟦🟦\n✅ 🟩🟩🟩🟩\n";

    // console.log("message", text);
    navigator.clipboard.writeText(text).then(r => {
        // ignore for now
    })

    if (navigator.share) {
        navigator
            .share({
                text: text,
            })
            .catch(error => {
                console.error('Something went wrong', error);
            });
    }
}

export const generateSBEmojiGrid = (game: iGame) => {
    let shareString:string = ""
    game.attempts.forEach((attempt) => {
        var matchIndicators:number[] = game.combo.getMatchIndicators(attempt);
        // if all indicators are identical, then it is a correct guess
        if (matchIndicators.every((val, i, arr) => val === arr[0])) {
            shareString = shareString + TICK_EMOJI + ' ';
        } else {
            shareString = shareString + CROSS_EMOJI + ' ';
        }

        matchIndicators.forEach((item) => {
            shareString = shareString +  Colors[item].shareIcon;
        });
        shareString = shareString + '\n';
    });

    console.log(shareString)
    return shareString
}

