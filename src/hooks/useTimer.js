import { useEffect, useState } from "react";

export default function useTimer (secondsOfExpire, onTimeExpired, stopTimer,setCurrentSeconds){
  const [clipPathValue, setClipPathValue] = useState("inset(0px 0px 0px 0px)");

  useEffect(() => {
    if (!stopTimer) {
      setClipPathValue("inset(0px 0px 0px 0px)");
      const increment = 10 / secondsOfExpire;
      let seconds = 0;
      let previousSecond = 0;

      const timer = setInterval(() => {
        seconds += 1 / 10;
    
        setClipPathValue((prevValue) => {
          const currentClipPathValue = prevValue.split(" ");
          const currentRight = parseFloat(currentClipPathValue[3]);
          const formattedValue = Math.round(currentRight * 100) / 100;

          if (!isNaN(formattedValue) && formattedValue < 100) {
            const currentSecond = Math.floor(seconds);
           
            if (seconds > 10 && currentSecond > previousSecond) {
              if(setCurrentSeconds){
                setCurrentSeconds( Math.floor(seconds))
               }
              previousSecond = currentSecond;
            }
            if(currentSecond > 10){
              
              
              
              
            }
            return `inset(0px 0px 0px ${formattedValue + increment}%)`;
          } else {
            
         
            

            handleStopTimer();
            return prevValue;
          }
        });
      }, 100);

      // Cleanup: Detener el temporizador y pausar el audio cuando el componente se desmonta
      return () => {
        clearInterval(timer);
      };
    }
  }, [stopTimer]);

  const handleStopTimer = () => {
    onTimeExpired();
  };

  return clipPathValue;
};
