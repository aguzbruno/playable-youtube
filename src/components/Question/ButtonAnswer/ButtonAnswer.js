import React from "react";
import "./ButtonAnswer.css";

export const ButtonsAnswer = ({ onClick, className, text, isAnswered,isTimerStopped }) => {
  return (
    <button
      className={`${className} buttons-answer `}
      onClick={() => {
        onClick();
      }}
      disabled={isAnswered ? true : false || isTimerStopped ? true:false}
    >
      <div className="state-layer">
        <div className="label-text">{text}</div>
      </div>
    </button>
  );
};
