import { BaseModal } from './BaseModal'
import {ABOUT_GAME_MESSAGE} from "../../constants/strings";

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title={ABOUT_GAME_MESSAGE} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-medium text-gray-500 dark:text-gray-300">
      हा खेळ "Connections" या जगप्रसिद्ध खेळावर वर आधारित आहे.</p>
        <p className="text-small text-gray-500 dark:text-gray-300">
        हा मराठी भाषेत आपल्यापर्यंत आणला आहे,<b> संदीप सोवनी, नंदिनी वाणी, आहना आगाशे व हृषिकेश नेने </b> यांनी.</p>
        <p className="text-small text-gray-500 dark:text-gray-300">
        साहाय्य आणि मार्गदर्शन: तुमच्यासारखे खूप मराठीप्रेमी 🙏.
       </p>
{/* 
      <p className="text-medium text-gray-400 dark:text-gray-200">
        खेळाचा source code {' '}
        <a
            href="https://github.com/kedarmhaswade/vardaL"
            className="underline font-bold"
        >
          इथे उपलब्ध आहे. {' '}
        </a>{' '}
        The original repository that we forked from is {' '}
        <a
          href="https://github.com/hannahcode/GAME"
          className="underline font-bold"
        >
          here!
        </a>{' '}
      </p> */}
    </BaseModal>
  )
}
