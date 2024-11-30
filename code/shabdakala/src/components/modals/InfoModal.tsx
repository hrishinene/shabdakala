import { BaseModal } from './BaseModal'
import './ifr.css';

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
    return (
        <BaseModal title="'शब्दबंध' असे खेळा" isOpen={isOpen} handleClose={handleClose}>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                <h2><b> शब्दबंध शोधण्याचा प्रवास </b></h2>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
                अ&#41; तुम्हाला खालीलप्रमाणे १२ शब्दांचे शब्दपट दिले जाईल. तुम्हाला यातील समान विषयावर आधारित ४ शब्दांचे ३ शब्दबंध शोधायचे आहेत.
            </p>

            <div className="flex justify-center mb-4 mt-2">
                <img src="/gridImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
                ब&#41; तुम्ही ४ शब्द निवडून उत्तर नोंदवू करू शकता
            </p>

            <div className="flex justify-center mb-4 mt-2">
                <img src="/selectedItemsImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>


            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
                क&#41; जर निवडलेले ४ शब्द एका गटात बसत असतील, तर तो शब्दबंध प्रकट होईल; अन्यथा, एक संधी कमी होईल. तुमच्याकडे अशा ३ संधी आहेत.
            </p>

            <div className="flex justify-center mb-4 mt-2">
                <img src="/oneThemeSolvedImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />

            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-left text-justify">
                ड&#41; जर तुम्ही अडकलात आणि काही सूचक माहिती हवी असेल, तर फक्त संकेत बटण दाबा. ते तुम्हाला असे ३ शब्द वेगवेगळ्या रंगांमध्ये दाखवेल, जे ३ वेगळ्या शब्दबंधांमध्ये आहेत.
            </p>

            <div className="flex justify-center mb-4 mt-2">
                <img src="/hintImage.png" alt="Base Image" style={{ border: '0.5px solid black' }} />
            </div>
        </BaseModal>
    )
}
