import React from "react";
import Dictionary from "./Dictionary";
import DailyWords from "./DailyWords";
import "./FullDictionary.css";

function FullDictionary() {
  return (
    <div className="full-dictionary-container">
      <Dictionary />
      <DailyWords />
    </div>
  );
}

export default FullDictionary;
