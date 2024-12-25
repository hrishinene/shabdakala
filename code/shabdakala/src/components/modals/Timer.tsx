// Timer.tsx
import { useState, useEffect } from 'react';

type Props = {
    startTime: number
}
  
const Timer = ({startTime}: Props)=> {
  const [seconds, setSeconds] = useState(startTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

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
    <div className="text-xl text-red-50 dark:text-gray-500 font-extrabold p-2 rounded-2xl border-1 border-gray-500 dark:border-gray-50 text-center bg-gray-700 dark:bg-gray-100">
    {/* <div className="text-xl text-gray-600 dark:text-gray-50 font-extrabold"> */}
          {/* वेळ: {formatTime(seconds)} */}
          {formatTime(seconds)}
    </div>
  );
};

export default Timer;