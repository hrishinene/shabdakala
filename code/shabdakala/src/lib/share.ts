import { CharStatus2, getAkshars, getGuessStatuses, getEncodedUrl, getGuessStatuses2, CharStatus } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE, GAME_URL, GAME_ENCODE_URL, TICK_EMOJI, CROSS_EMOJI } from '../constants/strings'
import { Colors, MAX_CHALLENGES } from '../constants/settings'
import { iGameProto } from './internal/iGameProto'

// export const shareStatus = (guesses: string[], lost: boolean) => {
// navigator.clipboard.writeText(
// `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
// generateEmojiGrid(guesses)
// )
// [[med,easy,hard,easy],[],[],[]]}
let shareString: string

export const shareStatus = (guesses: string[], lost: boolean) => {
    let encodedUrl = getEncodedUrl(GAME_ENCODE_URL);
    let msg = lost ? "मी प्रयत्न केलेले शब्दबंध:" : "मी सोडवलेले शब्दबंध:";
    let text = `${GAME_TITLE} (${solutionIndex}) ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}\n\n` +
        generateEmojiGrid3([['medium', 'easy', 'hard', 'easy'], ['medium', 'medium', 'medium', 'medium'], ['hard', 'hard', 'hard', 'hard'], ['easy', 'easy', 'easy', 'easy']]) + `\n\n` + GAME_URL + `\n\n` + msg + `\n` + encodedUrl;

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

export const generateEmojiGrid = (guesses: string[]) => {
    return guesses
        .map((guess) => {
            const status: CharStatus2[] = getGuessStatuses(guess)
            return getAkshars(guess)
                .map((_, i) => {
                    switch (status[i].status) {
                        case 'correct':
                            // return '🟦'
                            // return '🟩'
                            return '🟢';
                        case 'present':
                            // return '🟧'
                            return '🟡';
                        default:
                            return '⬛';
                        // return '⚫';
                    }
                })
                .join('')
        })
        .join('\n')
}

export const generateEmojiGrid2 = (guesses: string[]) => {
    return guesses.map((guess) => {
        const status: CharStatus[] = getGuessStatuses2(guess)
        return getAkshars(guess).map((_, i) => {
            switch (status[i]) {
                case 'correct':
                    // return '🟦'
                    // return '🟩'
                    return '🟢';
                case 'present':
                    // return '🟧'
                    return '🟡';
                default:
                    return '⬛';
                // return '⚫';
            }
        })
            .join('')
    })
        .join('\n')
}


export const generateEmojiGrid3 = (guesses: string[][]) => {
    shareString = ""
    let temp: string
    guesses.forEach((innerList) => {
        innerList.forEach((item) => {
            if (item == 'easy') {
                temp = '🟦'
                //temp='🥉'
                //temp='🔷''🔶'🥇🥈🥉
            }
            else if (item == 'medium') {
                //temp='🥈'
                temp = '🟩'
            }
            else {
                //temp='🥇'
                temp = '🟧'
            }
            shareString = shareString + temp
        });
        shareString = shareString + '\n';
    });
    console.log(shareString)
    return shareString
}
//---------------------------------------------------
// Shabdabandha sharing logic
//---------------------------------------------------
export const shareShabdabandhaStatus = (game: iGameProto): void => {
    let encodedUrl = "shabdabandha.shabdak.com";
    let lost = game.isLost();
    let attemptsCount = game.attempts.length;

    let msg = lost ? "मी प्रयत्न केलेले शब्दबंध:" : "मी सोडवलेले शब्दबंध:";
    let text = `${GAME_TITLE} (${solutionIndex}) ${lost ? 'X' : attemptsCount}/5\n\n` +
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

export const generateSBEmojiGrid = (game: iGameProto) => {
    shareString = ""
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

