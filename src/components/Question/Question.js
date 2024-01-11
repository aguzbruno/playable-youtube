import React, { useEffect, useState } from "react";
import "./Question.css";
import ButtonAnswerContainer from "./ButtonAnswerContainer/ButtonAnswerContainer";
import Header from "../Header/Header";
import useTimer from "../../hooks/useTimer";
import Lottie from "lottie-react";
import CorrectAnimation from "../../assets/animations/correct1.json";
import IncorrectAnimation from "../../assets/animations/incorrect.json";
import TimesUpAnimation from "../../assets/animations/timesup.json";
import { categoryInfo } from "../../utils/categoryInfo";
import CorrectAudio from "../../assets/sounds/Correcto_SFX.mp3";
import IncorrectAudio from "../../assets/sounds/Incorrecto_SFX.mp3";
import useAudioEnabled from "../../hooks/useAudioEnabled";
import CuentaRegresiva from "../../assets/sounds/Cuentaregresiva_SFX.mp3";
import FinTiempo from "../../assets/sounds/Finalizatiempo_SFX.mp3";

const ANIMATION_DURATION = 2000;

export default function Question({
  question,
  stopPlaying,
  questionNumber,
  nextQuestion,
}) {
  const audioEnabled = useAudioEnabled();
  const audioCuentaRegresiva = new Audio(CuentaRegresiva);
  const audioFinTiempo = new Audio(FinTiempo);
  //Estado para manejar la animación de correcto, incorrecto y tiempo agotado
  const [questionState, setQuestionState] = useState({
    status: null,
    stopTimerExternal: false,
  });
  const [currentSeconds, setCurrentSeconds] = useState(0);

  // Custom Hook para manejo del timer
  const clipPathValue = useTimer(
    15,
    () => handleTimesUp(),
    questionState.stopTimerExternal,
    setCurrentSeconds
  );

  // Función para manejar la respuesta
  const handleAnswer = (answer) => {
    //Audio de correcto e incorrecto
    if (audioEnabled) {
      if (answer === question?.correct_answer) {
        const audio = new Audio(CorrectAudio);
        audio.play();
      } else {
        const audio = new Audio(IncorrectAudio);
        audio.play();
      }
    }

    setQuestionState((prevState) => ({
      ...prevState,
      stopTimerExternal: true,
      status: answer === question?.correct_answer ? "correct" : "incorrect",
    }));

    // Esperar a que termine la animación para pasar a la siguiente pregunta o a la pantalla de EndGame
    setTimeout(() => {
      if (answer === question?.correct_answer) {
        nextQuestion();
      } else {
        stopPlaying();
      }

      // Reiniciar el estado de la pregunta
      setQuestionState((prevState) => ({
        ...prevState,
        status: null,
        stopTimerExternal: false,
      }));
    }, ANIMATION_DURATION);
  };

  // Función para manejar el tiempo agotado
  const handleTimesUp = () => {
    if (ytgame.system.isAudioEnabled()) {
      audioFinTiempo.play();
    } else {
      // Disable audio.
      audioFinTiempo.pause();
    }
    setQuestionState((prevState) => ({
      ...prevState,
      stopTimerExternal: true,
      status: "timesUp",
    }));

    // Esperar a que termine la animación para pasar a la pantalla de EndGame
    setTimeout(() => {
      stopPlaying();
    }, ANIMATION_DURATION);
  };

  useEffect(() => {
    if (
      currentSeconds > 10 &&
      currentSeconds < 15 &&
      ytgame.system.isAudioEnabled()
    ) {
      audioCuentaRegresiva.play();
    } else {
      audioCuentaRegresiva.pause();
    }
  }, [currentSeconds]);

  return (
    <>
      <Header backgroundColor={categoryInfo[question?.category]?.headerColor} />
      <div className="question-container">
        <div className="question-data-container">
          {questionState.status && (
            <div className="animation-container">
              {questionState.status === "correct" && (
                <Lottie loop={false} animationData={CorrectAnimation} />
              )}
              {questionState.status === "incorrect" && (
                <Lottie loop={false} animationData={IncorrectAnimation} />
              )}
              {questionState.status === "timesUp" && (
                <Lottie loop={false} animationData={TimesUpAnimation} />
              )}
            </div>
          )}

          <div className="timer-bar">
            <div className="background" style={{ clipPath: clipPathValue }} />
          </div>
          <div className="question-title">
            {questionState.status && <div className="animation-active"></div>}
            {question && <p>{question.text}</p>}
          </div>

          <div className="bottom-question-data-container">
            <div
              className="category-label"
              style={{
                backgroundColor:
                  categoryInfo[question?.category]?.backgroundColor ||
                  "#ffffff",
                color: categoryInfo[question?.category]?.textColor || "#ffffff",
              }}
            >
              <img
                src={categoryInfo[question?.category]?.image}
                alt={question?.category}
              ></img>
              {categoryInfo[question?.category]?.label}
            </div>
            <div className="number-question-label">
              Question {questionNumber + 1}
            </div>
          </div>
        </div>

        <ButtonAnswerContainer
          isTimerStopped={questionState.stopTimerExternal}
          answers={question?.answers}
          correct_answer={question?.correct_answer}
          onAnswer={handleAnswer}
          questionNumber={questionNumber}
        />
      </div>
    </>
  );
}
