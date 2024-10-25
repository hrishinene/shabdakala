import {Grid} from './cGrid'
import { MistakesRemaining } from './cMistakesRemaining'
import {Buttons} from "./cButtons"

type Props = {
    game_guesses: string[]
    game_currentGuess: string
    onChar: (value: string) => void
  }
  
  export const CGame = ({game_guesses,game_currentGuess, onChar }: Props) => {
  
    return (
  // <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
  <div className="mt-5">
     <Grid guesses={game_guesses} currentGuess={game_currentGuess} onChar={onChar} />
     <MistakesRemaining></MistakesRemaining>
     <Buttons></Buttons>
      </div>
    )
  }