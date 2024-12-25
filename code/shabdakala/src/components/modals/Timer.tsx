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
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
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