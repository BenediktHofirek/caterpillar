import React, { Component } from "react";
import AdSense from 'react-adsense';
import { Route, Switch, Redirect } from "react-router-dom";
import CaterpillarGame from "./components/caterpillarGame";
import "./App.css";

class App extends Component {
  state = {
    client: "ca-pub-1157366739872118"
  };

  render() {
    const {client} = this.state;
    return (
      <React.Fragment>
        <Switch>
          <Route />
        </Switch>
        <header>
          <h1>Caterpillar</h1>
        </header>
        <AdSense.Google client={client} slot="" className="google-adsense"/>
        <div className="caterpillar-game">
          <CaterpillarGame />
        </div>
        <AdSense.Google client={client} slot="" className="google-adsense"/>
        <footer>{"© 2019 Benedikt Hofirek. All rights reserved."}</footer>
      </React.Fragment>
    );
  }
}

export default App;
