// import {Cell} from '../grid/Cell'
import {BaseModal} from './BaseModal'
// import {MAX_CHALLENGES} from "../../constants/settings";
// import {MAX_WORD_LENGTH} from "../../constants/settings";
// import {ENTER_TEXT} from "../../constants/strings";
import './ifr.css';

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const InfoModal = ({isOpen, handleClose}: Props) => {
    return (
        <BaseModal title="'शब्दबंध' असे खेळा" isOpen={isOpen} handleClose={handleClose}>
            <p className="text-sm text-gray-500 dark:text-gray-300">
            <h2><b> गट तयार करण्याचा प्रवास </b></h2>
                </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            अ&#41; तुम्हाला १२ शब्दांचे संज्ञापट दिले जाईल. खेळाडूने समान विषयावर आधारित ४ शब्दांचा गट तयार करण्याचा प्रयत्न करावा.
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/gridImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            ब&#41; तुम्ही ४ शब्द निवडून सबमिट करू शकता
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/selectedItemsImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>


            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            क&#41; जर निवडलेले ४ शब्द एखाद्या गटात बसत असतील, तर तो गट दाखवला जाईल; अन्यथा, एक संधी कमी होईल. तुमच्याकडे अशा ३ संधी आहेत.
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/oneThemeSolvedImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />

            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            ड&#41; जर तुम्ही अडकलात आणि काही सूचक माहिती हवी असेल, तर फक्त हिंट बटण दाबा. ते तुम्हाला ३ शब्द वेगवेगळ्या रंगांमध्ये दाखवेल, ज्याचा अर्थ प्रत्येक शब्द वेगळ्या गटाचा आहे. 
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/hintImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>

        </BaseModal>
    )
}
