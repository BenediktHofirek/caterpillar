import React, { Component } from "react";

const GameNavigation = ({ playersColors, showSettings, newGame, levelValue, changeLevel }) => {
  return (
    <div className="game-nav">
      <div className="players">
        <div className="hero">
          <div
            className="player-color"
            style={{ backgroundColor: playersColors[0].headColor }}
          />
          <span className="player-name">Player</span>
        </div>
        <div className="opponent">
          <div
            className="player-color"
            style={{ backgroundColor: playersColors[1].headColor }}
          />
          <span className="player-name">Opponent</span>
        </div>
      </div>
      <form>
        <label htmlFor="levelRange">Level: {levelValue}</label>
        <input type="range" name="levelRange" value={levelValue} onChange={changeLevel} className="custom-range" min={1} max={15} id="levelRange"/>
      </form>
      <div className="game-buttons">
        <button className="button-settings" onClick={newGame}>New Game</button>
        <button className="button-new-game" onClick={showSettings}>Settings</button>
      </div>
      
      
    </div>
  );
};

export default GameNavigation;
