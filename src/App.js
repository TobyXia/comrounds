import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "./Home";
import Rounds from "./Rounds"
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from 'react-bootstrap/Dropdown'

function App() {
  return (
      <Router>
          <div style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <SplitButton

                  id={`dropdown-split-variants-${"info"}`}
                  variant={"info"}
                  title={"My account"}

                  style={{marginTop:"10px",marginLeft:"10px",alignSelf:"flex-end"}}
              >
                  <Dropdown.Item eventKey="1">CEs: 4.5 hrs</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Upcoming</Dropdown.Item>
                  <Dropdown.Item eventKey="3" active>
                      this dropdown is non-func
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Sign-out</Dropdown.Item>
              </SplitButton>
          </div>
          <div>

              <Route exact path="/" component={Homepage}/>

              <Route exact path="/postalCode/:id" component={Rounds} />

          </div>
      </Router>
  );
}

export default App;
