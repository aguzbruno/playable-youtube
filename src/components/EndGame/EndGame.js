import React, { useCallback, useEffect } from "react";
import LoserGame from "./LoserGame/LoserGame";
import Header from "../Header/Header";

const EndGame = ({ questionNumber,oldRecord, handleTryAgain,firstTime,refreshData}) => {
  return (
    <>
      <Header />
      <LoserGame
        firstTime={firstTime}
        questionNumber={questionNumber}
        oldRecord={oldRecord}
        handleTryAgain={handleTryAgain}
        refreshData={refreshData}
      ></LoserGame>
    </>
  );
};

export default EndGame;
