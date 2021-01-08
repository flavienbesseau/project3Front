import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Component } from "react";
import PreSurvey from "./PreSurvey";
import Survey from "./Survey";
import "../style/app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Route path="/survey">
            <Survey />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
