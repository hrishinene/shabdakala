
import { MAX_CHALLENGES } from '../constants/settings'
import { CompletedRow } from './cCompletedRow'
import { EmptyRow } from './cLiveRow'

type Props = {
  guesses: string[]
  currentGuess: string
  onChar: (value: string) => void
}

export const Grid = ({ guesses, currentGuess, onChar }: Props) => {
  //<AGA> : explain what empties is actually containing? is it an array of null values? like : [_, _, _, _]
  const empties = Array.from(Array(MAX_CHALLENGES))
  const completed = Array.from(Array(1))
    // guesses.length < MAX_CHALLENGES - 1
    //   ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
    //   : []

  return (
// <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
<div className="mt-5">
      {/* {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} onChar={onChar} />
      ))} */}

      {/* {guesses.length < MAX_CHALLENGES && <CurrentRow guess={currentGuess} />} */}
      {completed.map((_, i) => (
        <CompletedRow key={i} />
        
      ))}
      
      {empties.map((_, i) => (
        <EmptyRow key={i} />
        
      ))}
      
    </div>
  )
}
