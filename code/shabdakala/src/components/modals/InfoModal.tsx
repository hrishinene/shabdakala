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
            <div className={`iframe-container`}>
                <iframe src="https://www.youtube.com/embed/jU-BLLsCosA" title="शब्दबंध (Demo) 'कसा खेळाल?"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-300">
            <h2><b> काही उदाहरणे </b></h2>
                एक लपलेला शब्द ओळखा! प्रत्येक प्रयात्नानंतर कळ दाबली की घरांची
                पार्श्वभूमी बदलेल त्यावरून तुम्ही त्या शब्दाच्या किती जवळ आहात ते कळेल.
            </p>

            <div className="flex justify-center mb-1 mt-4">
                <button value="स्वा"/>
                <button value="व"/>
                <button value="ड"/>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                शब्दात 'स' आहे आणि तो याच ठिकाणी आहे, आणि त्याचे रूप "स्वा" असे आहे 

            </p>
            <p className="text-sm text-gray-500">
                (म्हणजे शब्द "स्वागत" किंवा "स्वातंत्र्य" असू शकेल, पण "संवाद" नक्कीच नाही.)
            </p>

            <div className="flex justify-center mb-1 mt-4">
                <button value="स"/>
                <button value="द"/>
                <button value="न्व"/>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                शब्दात 'न' आहे, आणि त्याचे रूप "न्व" असे आहे, पण तो या ठिकाणी नाहीये!
            </p>
            <p className="text-sm text-gray-500">
                (म्हणजे शब्द "अन्वय" असू शकेल, पण "कदर" किंवा "दाहक" नक्कीच नाही)
            </p>

            <div className="flex justify-center mb-1 mt-4">
                <button value="ल"/>
                <button value="व"/>
                <button value="ण"/>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                यापैकी कुठलेच अक्षर शब्दात कुठल्याही रूपात नाही.
            </p>
        </BaseModal>
    )
}
