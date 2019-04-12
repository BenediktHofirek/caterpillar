import React, { Component } from "react";
import CaterpillarGame from "./components/caterpillarGame";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <div className="row">
          <CaterpillarGame />
        </div>
      </div>
    );
  }
}

export default App;
