import {Cell} from '../grid/Cell'
import {BaseModal} from './BaseModal'
// import {MAX_CHALLENGES} from "../../constants/settings";
// import {MAX_WORD_LENGTH} from "../../constants/settings";
import {ENTER_TEXT} from "../../constants/strings";
import './ifr.css';

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const InfoModal = ({isOpen, handleClose}: Props) => {
    return (
        <BaseModal title="'शब्दक' असे खेळा" isOpen={isOpen} handleClose={handleClose}>
            {/* <div className={`iframe-container`}>
                <iframe src="https://www.youtube.com/embed/jU-BLLsCosA" title="शब्दक-३ 'कसा खेळाल?"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div> */}

            <p className="text-sm text-gray-500 dark:text-gray-300">
            <h2><b> गट तयार करण्याचा प्रवास </b></h2>
                </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            अ&#41; तुम्हाला १२ शब्दांचे संज्ञापट दिले जाईल. खेळाडूने समान विषयावर आधारित ४ शब्दांचा गट तयार करण्याचा प्रयत्न करावा.
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/base_image.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>

            {/* <div className="flex justify-center mb-1 mt-4">
                <Cell value="स्वा" status="correct"/>
                <Cell value="व" status="absent"/>
                <Cell value="ड" status="absent"/>
            </div> */}

            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            ब&#41; तुम्ही ४ शब्द निवडून सबमिट करू शकता
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/selected.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>

            <p className="text-sm text-gray-500 text-left text-justify">
            क&#41; जर निवडलेले ४ शब्द एखाद्या गटात बसत असतील, तर तो गट दाखवला जाईल; अन्यथा, एक संधी कमी होईल. तुमच्याकडे अशा ३ संधी आहेत.
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/one_solved.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>

            {/* <div className="flex justify-center mb-1 mt-4">
                <Cell value="स" status="absent"/>
                <Cell value="द" status="absent"/>
                <Cell value="न्व" status="present"/>
            </div> */}
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
            ड&#41; जर तुम्ही अडकलात आणि काही सूचक माहिती हवी असेल, तर फक्त हिंट बटण दाबा. ते तुम्हाला ३ शब्द वेगवेगळ्या रंगांमध्ये दाखवेल, ज्याचा अर्थ प्रत्येक शब्द वेगळ्या गटाचा आहे. 
            </p>

            <div className="flex justify-center mb-4 mt-2">
            <img src="/hint.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>

            {/* <p className="text-sm text-gray-500">
                (म्हणजे शब्द "अन्वय" असू शकेल, पण "कदर" किंवा "दाहक" नक्कीच नाही)
            </p>

            <div className="flex justify-center mb-1 mt-4">
                <Cell value="ल" status="absent"/>
                <Cell value="व" status="absent"/>
                <Cell value="ण" status="absent"/>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                यापैकी कुठलेच अक्षर शब्दात कुठल्याही रूपात नाही.
            </p> */}
        </BaseModal>
    )
}
