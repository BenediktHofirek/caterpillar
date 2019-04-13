import React, { Component } from "react";
import CaterpillarGame from "./components/caterpillarGame";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Caterpillar</h1>
        </header>
        <div className="game-board">
          <CaterpillarGame />
        </div>
        <footer>
          <nav>
            <a href="#">About</a>
          </nav>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
