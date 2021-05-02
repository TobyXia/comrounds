import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "./Home";
import Rounds from "./Rounds"


function App() {
  return (
      <Router>
          <div>

              <Route exact path="/" component={Homepage}/>

              <Route exact path="/postalCode/:id" component={Rounds} />

          </div>
      </Router>
  );
}

export default App;
