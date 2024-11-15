import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  onChar: (value: string) => void
}

export const Grid = ({ guesses, currentGuess, onChar }: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
// <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
<div>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} onChar={onChar} />
      ))}
      {guesses.length < MAX_CHALLENGES && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
