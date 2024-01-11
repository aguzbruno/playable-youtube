/* eslint-disable no-undef */
import Question from "../Question/Question";
import EndGame from "../EndGame/EndGame";
import originalJson from "../../json/question.json";
import { useState, useEffect } from "react";

export default function QuizContainer({
  questionsAskedYT,
  firstTime,
  handleTryAgain,
  oldRecord,
  refreshData,
  saveQuestionAsked
}) {
  //Separo las respuestas en un array se podria cambiar en el json
  const questions = originalJson.map((obj) => ({
    ...obj,
    answers: obj.answers.split("|"),
  }));
   //Funcion para mezclar preguntas
   const shuffleArray = (array) => {
    const shuffledArray = array.slice(); // Crear una copia del array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(shuffleArray(questions));
  const [questionNumber,setQuestionNumber] = useState(0)
  const [currentQuestion,setCurrentQuestion] = useState(shuffledQuestions[0])

  // Carga de array con indices de preguntas hechas y barajeo de preguntas
  async function loadDataAndShuffle() {
    if (questionsAskedYT?.length > 0) {
      const shuffled = shuffleArray(
        shuffledQuestions.filter((obj) => !questionsAskedYT?.includes(obj.id))
      );
      if(shuffled[questionNumber + 1]){
        setCurrentQuestion(shuffled[0])
      }else{
        //Si se queda sin preguntas restablece todo
        setShuffledQuestions(shuffleArray(questions))
      }
    }
  }

  // Función para pasar a la siguiente pregunta
  const nextQuestion = () => {
    saveQuestionAsked(currentQuestion.id)
    if(shuffledQuestions[questionNumber + 1]){
      setCurrentQuestion(shuffledQuestions[questionNumber+1])
    }else{
      //Si se queda sin preguntas restablece todo
      setShuffledQuestions(shuffleArray(questions))
    }
    setQuestionNumber((prevIndex) => prevIndex + 1);
  };

  // Función para terminar el juego e ir a la pantalla de EndGame
  const stopPlaying = () => {
    saveQuestionAsked(currentQuestion.id)
    setShowResult(true);
  }; 

  useEffect(() => {
    // Barajear aleatoriamente las preguntas al montar el componente despues de cargar si hay un juego guardado
    loadDataAndShuffle();
  }, []);

  return (
    <div>
      {!showResult ? (
        <Question
          questionNumber={questionNumber}
          question={currentQuestion}
          nextQuestion={nextQuestion}
          stopPlaying={stopPlaying}
        />
      ) : (
        <EndGame
          questionNumber={questionNumber}
          refreshData={refreshData}
          oldRecord={oldRecord}
          firstTime={firstTime}
          handleTryAgain={handleTryAgain}
        />
      )}
    </div>
  );
}
