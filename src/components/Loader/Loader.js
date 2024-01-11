import LoaderImage from "../../assets/loader.jpg";
import TriviaCrack from "../../assets/tutorial/triviaCrack.svg";
import TriviaCrackLoader from "../../assets/triviaCrackLoader.svg";

import "./Loader.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import { useEffect } from "react";
export default function Loader({ setLoading }) {


  function onGameInitialized() {
    // eslint-disable-next-line no-undef
    ytgame.game.firstFrameReady();
   
  }
  useEffect(()=>{
    onGameInitialized()
  },[])
  
  return (
    <div className="tutorial-banner">
      <div className="loader-image-container">
        <img src={LoaderImage} alt="trivia crack background"></img>
      </div>
      <div className="loader-trivia-crack-image">
        <img src={TriviaCrack} alt="trivia crack"></img>
        <img src={TriviaCrackLoader} alt="trivia crack"></img>
      </div>
      <div className="loading-label-progess-bar">
        <p className="loading-label">Loading...</p>
        <ProgressBar setLoading={setLoading}></ProgressBar>
      </div>
    </div>
  );
}
