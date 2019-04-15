import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const GameNavigation = ({
  playersColors,
  showSettings,
  newGame,
  levelValue,
  changeLevel
}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar game-nav">
        <div className="players">
          <div className="player-information hero">
            <div
              className="player-color"
              style={{ backgroundColor: playersColors[0].headColor }}
            />
            <span className="player-name">Player</span>
          </div>
          <div className="player-information opponent">
            <div
              className="player-color"
              style={{ backgroundColor: playersColors[1].headColor }}
            />
            <span className="player-name">Opponent</span>
          </div>
        </div>
        <form className="form-inline">
          <label htmlFor="levelRange">Level: {levelValue}</label>
          <input
            type="range"
            name="levelRange"
            value={levelValue}
            onChange={changeLevel}
            className="custom-range"
            min={1}
            max={15}
            id="levelRange"
          />
        </form>
        <div className="game-buttons">
          <button
            className="btn m-2 btn-primary button-settings"
            onClick={newGame}
          >
            New Game
          </button>
          <button
            className="btn m-2 btn-primary button-new-game"
            onClick={showSettings}
          >
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
};

export default GameNavigation;
