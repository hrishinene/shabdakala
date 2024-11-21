import {KeyValue} from '../../lib/keyboard'
import {KeyVal2, getAksharAndKeyStatuses, GuessKeyMap } from '../../lib/statuses'
import {Key} from './Key'
import {useEffect} from 'react'
import {ENTER_TEXT, DELETE_TEXT} from '../../constants/strings'

type Props = {
    onChar: (value: string) => void
    onDelete: () => void
    onEnter: () => void
    guesses: string[]
}
export const Keyboard = ({onChar, onDelete, onEnter, guesses}: Props) => {
    const guessAndKeyStatuses: GuessKeyMap = getAksharAndKeyStatuses(guesses);
    // const charStatuses:{ [key: string]: CharStatus2 }  = getStatuses(guesses)

    // console.log("<HVN>charStatuses = ", JSON.stringify(charStatuses));

    const onClick = (value: KeyValue) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else {
            onChar(value)
        }
    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                onEnter()
            } else if (e.code === 'Backspace') {
                onDelete()
            } else {
                const key = e.key.toUpperCase()
                if (key.length === 1 && key >= 'A' && key <= 'Z') {
                    onChar(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onEnter, onDelete, onChar])

    return (
//<div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
<div>
<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "अ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'अ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "आ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'आ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "इ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'इ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ई").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ई').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "उ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'उ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ऊ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ऊ').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ए").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ए').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ऐ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ऐ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ओ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ओ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "औ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'औ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "अं").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'अं').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "अः").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'अः').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value="ENTER" onClick={onClick}> {ENTER_TEXT} </Key>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "क").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'क').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ख").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ख').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ग").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ग').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "घ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'घ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ङ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ङ').status}/>
<Key value="DELETE" onClick={onClick}> {DELETE_TEXT} </Key>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "च").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'च').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "छ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'छ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ज").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ज').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "झ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'झ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ञ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ञ').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ट").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ट').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ठ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ठ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ड").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ड').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ढ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ढ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ण").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ण').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "त").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'त').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "थ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'थ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "द").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'द').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ध").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ध').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "न").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'न').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "प").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'प').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "फ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'फ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ब").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ब').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "भ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'भ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "म").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'म').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "य").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'य').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "र").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'र').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ल").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ल').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "व").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'व').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "श").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'श').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ष").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ष').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "स").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'स').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ह").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ह').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ळ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ळ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "क्ष").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'क्ष').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "ज्ञ").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'ज्ञ').status}/>
<Key value={KeyVal2(guessAndKeyStatuses.keyMap, "श्र").akshar.chrForm} onClick={onClick} status={KeyVal2(guessAndKeyStatuses.keyMap, 'श्र').status}/>
</div>

</div>
    )
}
