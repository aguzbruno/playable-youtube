import React, { useEffect, useState } from "react";
import "../EndGame.css";
import NewRecordAnimation from "../../../assets/animations/WinCharacters-Optimized.json";
import LoserGameAnimation from "../../../assets/animations/LoseCharacters-Optimized.json";
import Lottie from "lottie-react";
import NewRecordSound from "../../../assets/sounds/Partida_gana_SFX.mp3";
import LoserGameSound from "../../../assets/sounds/Partida_perdio_SFX.mp3";
import { todayString } from "../../../utils/todayString";
import useAudioEnabled from "../../../hooks/useAudioEnabled";

const arePropsEqual = (prevProps, nextProps) => {
  // Siempre devuelve true para evitar re-renderizaciones
  return true;
};
const LoserGame = React.memo(
  ({
    questionNumber,
    oldRecord,
    handleTryAgain,
    firstTime,
    refreshData
  }) => {
    const gameOrLose = [
      {
        id: 0,
        title: "You lost your streak! ",
        animation: LoserGameAnimation,
        label: "Don't worry, you can keep trying to beat a new record.",
      },
      {
        id: 1,
        title: "new record!",
        animation: NewRecordAnimation,
        label: `You have beaten your record of ${oldRecord} correct answers`,
      },
      {
        id: 2,
        title: "your first streak!",
        animation: NewRecordAnimation,
        label: `Keep playing to break new streaks every day!`,
      },
      {
        id: 3,
        title: "first try!",
        animation: LoserGameAnimation,
        label: `Don't worry! Keep training to improve yourself every day`,
      },
    ];
    const audioEnabled = useAudioEnabled();
    const winner = questionNumber > oldRecord ? true : false;
    const handleCurrentGame = () => {
      if (firstTime) {
        if (winner) {
          return gameOrLose.find((game) => game.id === 2);
        } else {
          return gameOrLose.find((game) => game.id === 3);
        }
      } else {
        if (winner) {
          return gameOrLose.find((game) => game.id === 1);
        } else {
          return gameOrLose.find((game) => game.id === 0);
        }
      }
    };
    const currentGame = handleCurrentGame();

    const sendScore = () => {
      if (winner) {
        ytgame.engagement.sendScore({ value: questionNumber });
      }
    };


    useEffect(() => {
      const audio = new Audio(  winner ? NewRecordSound : LoserGameSound);
      if (audioEnabled) {
        audio.play();
      }
      return () => {
        if (audio) {
          audio.pause();
        }
      };
    }, []);

    useEffect(() => {
      refreshData(questionNumber,winner)
      sendScore();
      
    }, []);

    return (
      <div className="end-game-container">
        <div
          className={`end-game-title-mobile  ${
            !winner ? "no-margin-bottom" : " "
          }`}
        >
          {currentGame.title}
        </div>
        <div
          className={`end-game-subtitle-mobile ${
            !winner ? "red-subtitle" : "green-subtitle"
          }`}
        >
          {questionNumber} correct answers
        </div>
        <Lottie
          animationData={currentGame.animation}
          style={!winner ? { maxWidth: "250px" } : {}}
        />

        <div className="end-game-bottom">
          <div className="end-game-title-landscape">{currentGame.title}</div>
          <div
            className={`end-game-subtitle-landscape ${
              !winner ? "red-subtitle" : "green-subtitle"
            }`}
          >
            {questionNumber} correct answers
          </div>
          <p className="end-game-bottom-label">{currentGame.label}</p>

          <button
            className="end-game-button"
            onClick={() => {
              handleTryAgain();
            }}
          >
            Try again
          </button>
        </div>
      </div>
    );
  },
  arePropsEqual
);

export default LoserGame;
