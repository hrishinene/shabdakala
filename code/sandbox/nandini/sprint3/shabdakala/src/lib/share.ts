import {CharStatus2, getAkshars, getGuessStatuses, getEncodedUrl, getGuessStatuses2, CharStatus} from './statuses'
import {solutionIndex} from './words'
import {GAME_TITLE, GAME_URL, GAME_ENCODE_URL} from '../constants/strings'
import {MAX_CHALLENGES} from '../constants/settings'

// export const shareStatus = (guesses: string[], lost: boolean) => {
// navigator.clipboard.writeText(
// `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
// generateEmojiGrid(guesses)
// )
// [[med,easy,hard,easy],[],[],[]]}
let shareString : string

export const shareStatus = (guesses: string[], lost: boolean) => {
    let encodedUrl = getEncodedUrl(GAME_ENCODE_URL);
    let msg = lost? "मी प्रयत्न केलेले शब्दक:" : "मी सोडवलेले शब्दक:";
    let text = `${GAME_TITLE} (${solutionIndex}) ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}\n\n` +
        generateEmojiGrid3([['medium','easy','hard','easy'],['medium','medium','medium','medium'],['hard','hard','hard','hard'],['easy','easy','easy','easy']]) + `\n\n` + GAME_URL +  `\n\n` + msg + `\n` + encodedUrl;

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
            const status:CharStatus2[] = getGuessStatuses(guess)
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
            const status:CharStatus[] = getGuessStatuses2(guess)
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
        .join('\n')}


        export const generateEmojiGrid3 = (guesses: string[][]) => {
            shareString=""
            let temp: string
            guesses.forEach((innerList) => {
                 innerList.forEach((item) => {
                    if(item=='easy'){
                        temp='🟦'
                        //temp='🥉'
                        //temp='🔷''🔶'🥇🥈🥉
                    }
                    else if(item=='medium'){
                        //temp='🥈'
                         temp='🟩'
                    }
                    else{
                        //temp='🥇'
                        temp='🟧'
                    }
                    shareString=shareString+temp
                });
                shareString=shareString+'\n';
              });
            console.log(shareString)
            return shareString
        }
            
