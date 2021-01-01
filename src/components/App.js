import "./App.css";
import PreSurvey from "./PreSurvey";
import Survey from "./Survey";

// import Survey from "./Survey";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalId: undefined,
      specialtyId: undefined,
      experienceId: undefined,
    };
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            Page d'accueil
          </Route>
          <Route exact path="/presurvey">
            <PreSurvey />
          </Route>
          <Route path="/survey" component={Survey} />
        </Switch>
      </Router>
    );
  }
}

export default App;
