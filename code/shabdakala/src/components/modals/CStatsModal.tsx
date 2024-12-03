import { loadShabdabandhaStatsFromLocalStorage as loadSBStatsFromLocalStorage, ShabdabandhaStats } from '../../lib/localStorage'
import { shareShabdabandhaStatus as shareSBStatus} from '../../lib/share'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  GUESS_DISTRIBUTION_SUBTEXT,
  SHARE_TEXT,
} from '../../constants/strings'
import {FORM_LINK, Tomorrow} from "../../constants/settings";
import { iGame } from '../../lib/internal/iGame'
import { SBStatBar } from '../stats/SBStatBar'
import { SBHistogram } from '../stats/SBHistogram'
import Countdown from 'react-countdown'
type Props = {
  isOpen: boolean
  handleClose: () => void
  handleShare: () => void
};

export const CStatsModal = ({
  isOpen,
  handleClose,
  handleShare,
}: Props) => {
  const gameStats = loadSBStatsFromLocalStorage();
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <SBStatBar gameStats={gameStats} />
      </BaseModal>
    )
  }

  // Load the game
  var game = iGame.loadGame();
  // alert("game won: " + game?.isWon() + " game lost: " + game?.isLost());
  if (game === null) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <SBStatBar gameStats={gameStats} />
      </BaseModal>
    )
  }

  var i=0;
  var contributors=""
  var contributorsArray: string[]=[]
  // console.log("Calling Stats Modal");
  // add sharedBy to contributorsArray
  game.combo.tuples.forEach((tuple) => {
    contributorsArray.push(tuple.sharedBy);
  });
  // sort contributorsArray and remove duplicates
  contributorsArray = contributorsArray.filter((item, index) => contributorsArray.indexOf(item) === index)
  contributorsArray.sort()
  // console.log("Contributors Array = " + contributorsArray);
  // finally add to contributors with comma
  contributorsArray.forEach((contributor) => {
    if (contributors.length > 0) {
      contributors = contributors + ", "
    }
    contributors = contributors.concat(contributor)
  });

  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <SBStatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <h5 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
        {GUESS_DISTRIBUTION_SUBTEXT}
      </h5>
      <SBHistogram gameStats={gameStats} />

      {(game?.isWon() || game?.isLost()) && (
        <div className="mt-5 sm:mt-6 dark:text-white">
        <h5 className="text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        आजचे शब्दबंध तयार करण्यात यांचा सहभाग होता:
        </h5>
        <h5 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
          {contributors}
        </h5>
        </div>
      )}

      {(game?.isLost() || game?.isWon()) && (
        <div className="mt-5 sm:mt-6 columns-1 dark:text-white">
          <div>
            
          <div>
            <h5 className='text-base leading-6 font-medium text-gray-900 dark:text-gray-100'>पुन्हा आपली भेट</h5>
            <Countdown

              className="text-base font-medium text-gray-900 dark:text-gray-100"
              date={Tomorrow}

              daysInHours={true}
            />
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              if (game) {
                shareSBStatus(game)
              }

              handleShare()
            }}
          >
            {SHARE_TEXT}
          </button>
          <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
          >
            <a href={FORM_LINK} rel="noopener noreferrer">प्रतिक्रिया आणि साहाय्य</a>
          </button>
          </div>

        </div>
      )}
    </BaseModal>
  )
}
//पी. सायली, सौरभ कुलकर्णी आणि AI प्रणाली (Chat GPT आणि तत्सम) 