import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import PreSurvey from "./components/PreSurvey";
import Survey from "./components/Survey";
import DataChart from "./components/DataChart";

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
          <Route path="/essaiChartJs/:hospitalId" component={DataChart} />
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
