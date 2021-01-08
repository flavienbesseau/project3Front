import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Navbar from "./NavBar";
import Home from "./Home";
import PreSurvey from "./PreSurvey";
import Survey from "./Survey";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/presurvey">
            <PreSurvey />
          </Route>
          <Route path="/survey">
            <Survey />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
