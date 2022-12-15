
import {Routes,  Route } from "react-router-dom";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import User from "./pages/Users";
import Match from "./pages/Match";
import Global from "./pages/Global";
import Signin from "./pages/SignIn";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/user" element={<User />} />
        <Route path="/match" element={<Match />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/global" element={<Global />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;