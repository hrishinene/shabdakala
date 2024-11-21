import { MAX_WORD_LENGTH } from '../../constants/settings'
import { CharForm } from '../../lib/statuses'
import { getAkshars } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
}

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess : CharForm[] = getAkshars(guess);
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter.chrForm} size='big' />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} size='big'/>
      ))}
    </div>
  )
}
