import React, { useEffect, useRef, useState } from "react";
import ImageBanner from "../../assets/tutorial/bannerImage.png";
import TriviaCrack from "../../assets/tutorial/triviaCrack.svg";
import "./Home.css";
import HomeLowScore from "../../assets/tutorial/homeLowScore.svg";
import HomeHighScore from "../../assets/tutorial/homeHighScore.svg";
import InicioAppSound from "../../assets/sounds/Inicioapp_SFX.mp3";
import useAudioEnabled from "../../hooks/useAudioEnabled";

const Home = ({ handlePlay, lastGames, record,firstTimeHome,setFirstTimeHome }) => {
  const audioEnabled = useAudioEnabled();
  const sortedLastGamesFirst = [...lastGames].reverse();
  const handleClickToPlay = () => {
    handlePlay();
    setFirstTimeHome(false)
  };
  useEffect(() => {
    if(firstTimeHome){
      const audio = new Audio(InicioAppSound);
      if (audioEnabled) {
       
        audio.play();
      }else{
        audio.pause()
      }
      return () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0; // Reiniciar la reproducción al principio
        }
      };
    }
    
  }, []);
  return (
    <div className="tutorial-container">
      <div className="tutorial-banner">
        <div className="banner-container">
          <img src={ImageBanner} alt="trivia crack background"></img>
        </div>
        <div className="trivia-crack-image">
          <img src={TriviaCrack} alt="trivia crack"></img>
        </div>
      </div>

      <div className="score-home-container">
        <div className="top-home">
          <h1 className="tutorial-title">Score Tracker</h1>
          <div className="score-box">
            <img
              src={record.correctAnswers > 0 ? HomeHighScore : HomeLowScore}
              alt="score"
            ></img>
            <div className="text-score-box">
              <p className="title">Your record</p>
              <p
                className={`record ${
                  record.correctAnswers > 0 ? "high-record" : "low-record"
                }`}
              >
                {" "}
                {record.correctAnswers} correct answers
              </p>
              <p className="date">{record.date} </p>
            </div>
          </div>
        </div>
        <div className="bottom-home">
          <p className="tutorial-title">Your last scores</p>
          <div className="table-last-scores">
            <table>
              <thead>
                <tr>
                  <th className="date-thead">Date</th>
                  <th className="answers-thead">Answers</th>
                </tr>
              </thead>
              <tbody>
                {sortedLastGamesFirst.map((game, index) => (
                  <tr className="record-item" key={index}>
                    <td className="date-record">{game.date}</td>
                    <td className="correct-answers">{game.correctAnswers}</td>
                  </tr>
                ))}
                {/* <tr className="record-item">
                    <td className="date-record">13/12/23</td>
                    <td className="correct-answers">0</td>
                  </tr> */}
              </tbody>
            </table>
          </div>
          {lastGames.length < 2 && (
            <div className="missing-score-text">
              Your game history will light up here soon. Enjoy your playtime!
            </div>
          )}
        </div>
      </div>

      <button
        className="understood-button"
        onClick={() => {
          handleClickToPlay();
        }}
      >
        Play
      </button>
    </div>
  );
};

export default Home;
