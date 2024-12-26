// Timer.tsx
import { useState, useEffect } from 'react';
import { iGame } from '../../lib/internal/iGame';

type Props = {
    startTime: number
    game: iGame
}
  
const Timer = ({startTime, game}: Props)=> {
  const [seconds, setSeconds] = useState(startTime);

  useEffect(() => {
    if (game.isWon() || game.isLost()) {
        // console.log("game is won or lost");
        setSeconds(game.timeSpentSeconds)
        return;
    }

    const timerId = setInterval(() => {
        // console.log("seconds: ", seconds);
        setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
        // console.log("clearing timer");
        clearInterval(timerId);
    }
  }, [game.isWon(), game.isLost()]);

  const formatTime = (totalSeconds: number) => {
    // console.log("totalSeconds: ", totalSeconds);
    // if totalSeconds is not number, return 0:00
    if (isNaN(totalSeconds)) {
      return "0:00";
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds) % 60;
    // console.log("minutes: ", minutes, "seconds: ", seconds);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    // <div className="text-xl text-red-50 dark:text-gray-500 font-extrabold p-2 rounded-2xl border-1 border-gray-500 dark:border-gray-50 text-center bg-gray-700 dark:bg-gray-100">
    // <div className="text-xl text-gray-600 dark:text-gray-50 font-extrabold">
      <div className="text-xl text-yellow-50 dark:text-yellow-800 font-bold bg-gray-800 dark:bg-gray-50 inline-block p-1 rounded">

          {/* वेळ: {formatTime(seconds)} */}
          {formatTime(seconds)}
    </div>
  );
};

export default Timer;