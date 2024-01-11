import React, { useEffect, useRef, useState } from "react";
import ImageBanner from "../../assets/tutorial/bannerImage.png";
import TriviaCrack from "../../assets/tutorial/triviaCrack.svg";
import "./Tutorial.css";
import Topics from "./Topics/Topics";
import Certificate from "../../assets/tutorial/certificate.svg";
import Raise from "../../assets/tutorial/raise.svg";
import Star from "../../assets/tutorial/star.svg";
import InicioAppSound from '../../assets/sounds/Inicioapp_SFX.mp3'
import useAudioEnabled from "../../hooks/useAudioEnabled";

const Tutorial = ({handleTutorial}) => {
  const audioEnabled = useAudioEnabled();
  const topics = [
    {
      image: Certificate,
      text: "Answer as many questions as you can.",
      borderBottom: true,
    },
    { image: Raise, text: "The more questions you answer, the better score you will get.", borderBottom: true },
    {
      image: Star,
      text: "Come back every day to beat your record",
      borderBottom: false,
    },
  ];
  const handleClickTutorial = () => {
    handleTutorial()
  }
  useEffect(()=>{
    const audio = new Audio(InicioAppSound)
    if(audioEnabled){
      audio.play()
    }else{
      audio.pause()
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  },[])

  return (
    
    <div className="tutorial-container" >
      <div className="tutorial-banner">
        <div className="banner-container">
          <img src={ImageBanner} alt="trivia crack background"></img>
        </div>
        <div className="trivia-crack-image">
          <img src={TriviaCrack} alt="trivia crack"></img>
        </div>
      </div>
      <h1 className="tutorial-title">How to play?</h1>
      <div className="tutorial-topic-container">
      {topics.map((topic, index) => (
        <Topics
          key={index}
          image={topic.image}
          text={topic.text}
          borderBottom={topic.borderBottom}
        />
      ))}
      </div>
      <button className="understood-button" onClick={() => {handleClickTutorial()}}>
        Understood
      </button>
    </div>
  );
};

export default Tutorial;
