import { getAksharAndKeyStatuses, GuessKeyMap, AksharStatus } from '../../lib/statuses'
// import { getAkshars } from '../../lib/statuses'
// import { getGuessStatuses } from '../../lib/statuses'
// import { KeyVal } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  onChar: (value: string) => void
}

export const CompletedRow = ({ guess, onChar }: Props) => {
  // const statuses = getGuessStatuses(guess);
  const guessAndKeyStatuses:GuessKeyMap = getAksharAndKeyStatuses([guess]);
  // console.log(guessAndKeyStatuses); 
  // const charstatuses = getStatuses([guess]);
  // const guessChars : CharForm[] = getAkshars(guess);

  return (
    <div className="flex justify-center mb-1">
      {
        guessAndKeyStatuses.guessMap[guess].aksharStatuses.map((letter:AksharStatus, i) => (
        <Cell key={i} value={letter.akshar.chrForm} onChar={onChar} status={letter.status} size='small' />
        )
      )
    }
    </div>
  )
}
