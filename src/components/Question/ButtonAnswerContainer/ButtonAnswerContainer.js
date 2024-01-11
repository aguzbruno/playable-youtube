import React, { useEffect, useState } from "react";
import { ButtonsAnswer } from "../ButtonAnswer/ButtonAnswer";
import "./ButtonAnswerContainer.css";

export default function ButtonAnswerContainer({
  isTimerStopped,
  answers,
  correct_answer,
  onAnswer,
  questionNumber,
}) {

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [classNames, setClassNames] = useState(false);

  // Resetear el estado de los botones cuando cambia la pregunta
  useEffect(() => {
    setClassNames(false);
    setIsAnswered(false);
  }, [questionNumber]);

  // Función para manejar la respuesta del usuario
  const handleButtonClick = (index) => {
    setClassNames(true);
    setSelectedAnswer(index);
    setIsAnswered(true);
    onAnswer(index);
  };

  return (
    <div className="buttons-answer-container">
      {answers?.map((answer, index) => (
        <ButtonsAnswer
          key={index}
          isTimerStopped={isTimerStopped}
          onClick={() => handleButtonClick(index)}
          isAnswered={isAnswered}
          className={
            classNames
              ? correct_answer === index
                ? "correct"
                : selectedAnswer === index
                ? "incorrect"
                : "default"
              : "default"
          }
          text={answer}
        />
      ))}
    </div>
  );
}
