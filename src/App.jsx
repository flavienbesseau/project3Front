import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PreSurvey from "./components/PreSurvey";
import Survey from "./components/Survey";
import ChartJs from "./components/ChartJs";

import "./scss/main.scss";
import Form from "./components/Forms/Form";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ProvideAuth } from "./contexts/ProvideAuth";
import PageNotFound from "./routes/PageNotFound";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/essaiChartJs" component={ChartJs} />
          <Route exact path="/presurvey" component={PreSurvey} />
          <Route path="/survey" component={Survey} />
          <Route exact path="/authentication" component={Form} />
          <ProtectedRoute path="/authentication/dashboard/:id">
            <Dashboard />
          </ProtectedRoute>
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
