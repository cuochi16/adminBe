
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import User from "./pages/Users";
import Match from "./pages/Match";
import Global from "./pages/Global";
import Signin from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/signin" component={Signin} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user" component={User} />
          <Route exact path="/match" component={Match} />
          <Route exact path="/global" component={Global} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;