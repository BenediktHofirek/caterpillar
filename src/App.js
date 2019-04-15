import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CaterpillarGame from "./components/caterpillarGame";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route />
        </Switch>
        <header>
          <h1>Caterpillar</h1>
        </header>
        <div className="caterpillar-game">
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
