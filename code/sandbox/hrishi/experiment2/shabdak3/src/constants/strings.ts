import {MAX_WORD_LENGTH} from "./settings";

export const GAME_TITLE = 'नवे शब्दक';
// export const GAME_URL = 'localhost:3000';
export const GAME_URL = 'shabdak.com' 
export const GAME_ENCODE_URL = 'https://shabdak3.el.r.appspot.com';
export const GAME_SHABDAK_1_URL = 'http://shabdak1.shabdak.com';
export const GAME_ENCODE_URL_RANDOM = 'https://shabdak3.el.r.appspot.com/?random=1';
export const WIN_MESSAGES = ['महान!', 'उत्तम!', 'भले शाब्बास!', 'वा वा !', 'मानलं तुम्हाला!', 'कमाल!', 'फार छान!', 'अगदी बरोब्बर!']
export const GAME_COPIED_MESSAGE = 'आता व्हॉट्सॅप् वर पेस्ट करा'
export const ABOUT_GAME_MESSAGE = `'${GAME_TITLE}' विषयी थोडेसे...`
export const NOT_ENOUGH_LETTERS_MESSAGE = `निदान ${MAX_WORD_LENGTH} तरी अक्षरं हवीत!`
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `आजचा शब्द आहे ${solution}. चांगला प्रयत्न!`
export const ENTER_TEXT = '\u2713'
export const DELETE_TEXT = '\u232B'
// export const WORD_NOT_FOUND_MESSAGE = 'हा कुठला शब्द? दुसरा निवडा! (\u232B कळ वापरा)'
export const WORD_NOT_FOUND_MESSAGE = 'क्षमस्व! अक्षरांच्या पुनरावृत्तीमुळे हा शब्द स्वीकारार्ह नाही! (\u232B कळ वापरा)'
export const STATISTICS_TITLE = 'काही आकडे'
export const GUESS_DISTRIBUTION_TEXT = 'तुमचे प्रयत्न असे होते'
export const GUESS_DISTRIBUTION_SUBTEXT = '(उजवीकडे: ओळखलेली शब्दसंख्या, डावीकडे: लागलेले प्रयत्न)'
// export const NEW_WORD_TEXT = 'पुन्हा आपली भेट'
export const SHARE_TEXT = 'व्हॉट्सॅप् वर कळवा!'
export const TOTAL_TRIES_TEXT = 'तुमचे अंदाज'
export const SUCCESS_RATE_TEXT = 'यशाची सरासरी'
export const CURRENT_STREAK_TEXT = 'अखंडित यशोमाला'
export const BEST_STREAK_TEXT = 'सर्वोत्तम यशोमाला'
export const BRUHADKOSH_REF =(solution : string) => 'हा शब्द <b>बृहद्कोशाच्या</b> सौजन्याने आपल्यापर्यंत आणण्यात येत आहे. एकाच वेळी अनेक कोशांत या शब्दाचा अर्थ पाहण्यासाठी <a href=https://bruhadkosh.org/words?shodh=विराजमान>इथे क्लिक करा</a>'
export const BRUHAD =  (solution: string) => `हा शब्द <b>बृहद्कोशाच्या</b> सौजन्याने आपल्यापर्यंत आणण्यात येत आहे. एकाच वेळी अनेक कोशांत या शब्दाचा अर्थ पाहण्यासाठी <b><u><a href = "https://bruhadkosh.org/words?shodh= +${solution}"> इथे क्लिक करा</a></u></b>`
