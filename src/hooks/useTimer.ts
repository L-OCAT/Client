import { useState, useEffect } from 'react';

const useTimer = (initialTime: number) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resetTimer = () => setRemainingTime(initialTime);

  return { remainingTime, resetTimer };
};

const useFormatTime = () => {
    const formatTime = (timeInSeconds: number) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${String(minutes)}분 ${String(seconds)}초`;
    };
  
    return formatTime;
};

export { useTimer, useFormatTime }