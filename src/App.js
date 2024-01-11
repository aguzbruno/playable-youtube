import { useEffect, useState } from "react";
import "./App.css";
import QuizContainer from "./components/QuizContainer/QuizContainer";
import Tutorial from "./components/Tutorial/Tutorial";
import Loader from "./components/Loader/Loader";
import InicioAppSound from "./assets/sounds/Inicioapp_SFX.mp3";
import Home from "./components/Home/Home";
import { todayString } from "./utils/todayString";

function App() {
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);
  const [firstTimeHome, setFirstTimeHome] = useState(false);
  const [play, setPlay] = useState(false);
  const [oldRecord, setOldRecord] = useState({
    correctAnswers: 0,
    date: todayString(),
  });
  const [questionsAskedYT, setQuestionsAskedYT] = useState([]); //Array de ids de preguntas ya hechas
  const [lastGames, setLastGames] = useState([]); //Array de partidas

  //Guardar partida y guardar en youtube
  const refreshData = (correctAnswers,winner) => {
    const today = todayString();
    const lastScore = {
      correctAnswers: correctAnswers ? correctAnswers : 0,
      date: today,
    };

    if (winner) {
      setOldRecord({ correctAnswers: correctAnswers, date: today });
    }

    const lastGamesLimited =
      lastGames.length >= 3
        ? [...lastGames.slice(1), lastScore]
        : [...lastGames, lastScore];
    setLastGames(lastGamesLimited);
    saveDataToYoutube(
      correctAnswers ? lastScore : oldRecord,
      lastGamesLimited,
      questionsAskedYT
    );
  };

  async function loadDataFromYoutube() {
    // Generally, it is best to wait for this data to avoid race conditions or
    // the need to merge with conflicting data.
    const data = await ytgame.game.loadData();
    if (data && data !== "") {
      // Process data to resume game state.
      try {
        const playableSave = JSON.parse(data);
        setQuestionsAskedYT(playableSave.questionsAsked); //Array de ids de preguntas
        const record = playableSave.record; // Record

        if (record) {
          setOldRecord(record);
          setFirstTimeHome(true);
          setFirstTime(false);
        }
        const lastGamesPlayable = playableSave.lastGames; //Array de fechas
        if (lastGamesPlayable) {
          setLastGames(lastGamesPlayable);
        }
      } catch (e) {
        // This isn't ideal, so log an error.
        console.error(e);
        // Send an error to YouTube when this happens.
        ytgame.health.logError();
      }
    }
  }

  const saveDataToYoutube = (newRecord, lastGames, questionsAsked) => {
    const playableSave = {
      record: newRecord,
      lastGames: lastGames,
      questionsAsked,
    };
    ytgame.game.saveData(JSON.stringify(playableSave)).then(
      () => {
        // Handle data save success.
      },
      (e) => {
        // Handle data save failure.
        console.error(e);
        // Send an error to YouTube when this happens.
        ytgame.health.logError();
      }
    );
  };
  const saveQuestionsAskedToYoutube = (questionsAsked) => {
    const playableSave = {
      record: oldRecord,
      lastGames: lastGames,
      questionsAsked,
    };
    ytgame.game.saveData(JSON.stringify(playableSave)).then(
      () => {
        // Handle data save success.
      },
      (e) => {
        // Handle data save failure.
        console.error(e);
        // Send an error to YouTube when this happens.
        ytgame.health.logError();
      }
    );
  };

  const handleTutorial = () => {
    setPlay(true);
  };
  const handlePlay = () => {
    setPlay(true);
  };
  const handleTryAgain = () => {
    setFirstTime(false);
    setFirstTimeHome(false);
    setPlay(false);
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const saveQuestionAsked = (questionId) => {
    if (questionsAskedYT?.length < 999) {
      setQuestionsAskedYT([...questionsAskedYT, questionId]);
      saveQuestionsAskedToYoutube([...questionsAskedYT, questionId]);
    } else {
      //Lo vacio cuando llega al maximo de preguntas
      setQuestionsAskedYT([]);
    }
  };

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line no-undef
      ytgame.game.gameReady();
    }
  }, [loading]);

  useEffect(() => {
    loadDataFromYoutube();
  }, []);

  useEffect(() => {
    if (questionsAskedYT.length > 0) {
      setFirstTime(false);
    }
  }, []);

  return (
    <div className="App">
      <main>
        {loading ? (
          <Loader setLoading={handleLoading}></Loader>
        ) : play ? (
          <QuizContainer
            saveQuestionAsked={saveQuestionAsked}
            oldRecord={oldRecord.correctAnswers}
            refreshData={refreshData}
            questionsAskedYT={questionsAskedYT}
            firstTime={firstTime}
            handleTryAgain={handleTryAgain}
          />
        ) : firstTime ? (
          <Tutorial handleTutorial={handleTutorial} />
        ) : (
          <>
            <Home
              setFirstTimeHome={setFirstTimeHome}
              firstTimeHome={firstTimeHome}
              handlePlay={handlePlay}
              lastGames={lastGames}
              record={oldRecord}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
