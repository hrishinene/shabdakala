import { saveTestStorage, loadTestStorage, TestStorage } from '../lib/localStorage'
import { generateEmojiGrid3 } from '../lib/share'

//<AGA> : initialization of temp, which will be passed to saveTestStorage function
const temp: TestStorage = {
    currentTime: '',
    randomNumber: 0
  }

const handleClickForStoring: React.MouseEventHandler<HTMLButtonElement> = () => {
    const date = new Date();
    temp.currentTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds()

    temp.randomNumber = Math.floor(Math.random() * 100)
    saveTestStorage(temp)
}
const handleClickForLoading: React.MouseEventHandler<HTMLButtonElement> = () => {
    const loaded = loadTestStorage()
    console.log(loaded)
}

const handleClickForSharing: React.MouseEventHandler<HTMLButtonElement> = () => {
    generateEmojiGrid3([['medium','easy','hard','easy'],['medium','medium','medium','medium'],['hard','hard','hard','hard'],['easy','easy','easy','easy']])}

export const Buttons=()=> {
    return (
        <div className="flex justify-center py-4">
             <div className="flex space-x-6">
            <button className="w-fit-content  h-12 px-5  rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none" onClick={handleClickForStoring}>
            Shuffle
            </button>
            <button className="w-fit-content  h-12 px-5  rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none" onClick={handleClickForLoading}>
            Deselect All
            </button>
            <button className="w-fit-content h-12 px-5 rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none" onClick={handleClickForSharing}>
            Submit
            </button>
        </div>
        </div>
    )
}

