import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { solution } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  GUESS_DISTRIBUTION_SUBTEXT,
  SHARE_TEXT,
  GAME_ENCODE_URL_RANDOM,
} from '../../constants/strings'

import {FORM_LINK} from "../../constants/settings";
type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <h5 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
        {GUESS_DISTRIBUTION_SUBTEXT}
      </h5>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-7 bg-red-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-xl"
            onClick={(e) => {
            e.preventDefault();
            window.location.href=GAME_ENCODE_URL_RANDOM;
            }}
            >
            खेळत रहा...
            </button>
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost)
              handleShare()
            }}
          >
            {SHARE_TEXT}
          </button>
          <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
          >
            <a href={FORM_LINK} rel="noopener noreferrer"> तुमची प्रतिक्रिया? </a>
          </button>
        </div>
      )}
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 dark:text-white">
        <h5 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
        हा शब्द <b><u><a href="https://bruhadkosh.org"> बृहद्कोशाच्या</a></u></b> सौजन्याने आपल्यापर्यंत आणण्यात येत आहे. एकाच वेळी अनेक कोशांत या शब्दाचा अर्थ पाहण्यासाठी इथे क्लिक करा: <b><u><a href={'https://bruhadkosh.org/words?shodh=' + solution}>{solution}</a></u></b>
        </h5>
        </div>
      )}
    </BaseModal>
  )
}
