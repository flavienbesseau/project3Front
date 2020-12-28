import "./App.css";
import PreSurvey from "./PreSurvey";
import Survey from "./Survey";

// import Survey from "./Survey";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PreSurvey />
        </Route>
        <Route path="/surveys/:id" component={Survey} />
      </Switch>
    </Router>
  );
}

export default App;
