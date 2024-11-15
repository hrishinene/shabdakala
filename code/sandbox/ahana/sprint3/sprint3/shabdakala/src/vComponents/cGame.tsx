import {Grid} from './cGrid'
import { MistakesRemaining } from './cMistakesRemaining'
import {Buttons} from "./cButtons"

type Props = {
    cGame_twoD_word_list: string[][]
    cGame_mistake : number
    // game_guesses: string[]
    // game_currentGuess: string
    // onChar: (value: string) => void
  }
  
  export const CGame = ({cGame_twoD_word_list,cGame_mistake}: Props) => {
  
    return (
  // <div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
  <div className="mt-5">
     <Grid twoD_word_list = {cGame_twoD_word_list}/>
     <MistakesRemaining mistake={cGame_mistake}></MistakesRemaining>
     <Buttons></Buttons>
      </div>
    )
  }