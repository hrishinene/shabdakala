import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats, loadShabdabandhaStatsFromLocalStorage as loadSBStatsFromLocalStorage, ShabdabandhaStats } from '../../lib/localStorage'
import { shareShabdabandhaStatus as shareSBStatus, shareStatus } from '../../lib/share'
import { solution, tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  GUESS_DISTRIBUTION_SUBTEXT,
  SHARE_TEXT,
  GAME_ENCODE_URL_RANDOM,
} from '../../constants/strings'

import {FORM_LINK} from "../../constants/settings";
import { iGameProto } from '../../lib/internal/iGameProto'
import { SBStatBar } from '../stats/SBStatBar'
import { SBHistogram } from '../stats/SBHistogram'
import Countdown from 'react-countdown'
type Props = {
  isOpen: boolean
  handleClose: () => void
  handleShare: () => void
}

export const CStatsModalProto = ({
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
  var game = iGameProto.loadGame();
  // alert("game won: " + game?.isWon() + " game lost: " + game?.isLost());

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
      {(game?.isLost() || game?.isWon()) && (
        <div className="mt-5 sm:mt-6 columns-1 dark:text-white">
          <div>
            <h5>पुन्हा आपली भेट</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div>

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
      {(game?.isWon() || game?.isLost()) && (
        <div className="mt-5 sm:mt-6 dark:text-white">
        <h5 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
        हे शब्दबंध आपल्यासाठी बनवण्यात यांचा सहभाग होता:
        </h5>
        <h6 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
            पी. सायली, सौरभ कुलकर्णी आणि AI प्रणाली (Chat GPT आणि तत्सम) 
        </h6>
        </div>
      )}
    </BaseModal>
  )
}
