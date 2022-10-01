import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import { Edit } from "./pages/Edit";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

import { NavigationBar } from "./components/NavigationBar";

function App() {
  return (
    <div>
      <div>
        <HashRouter>
          <NavigationBar />

          <div className="content">
            <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/a/:articleID" element={<Article />} />
                <Route path="/e/:articleID" element={<Edit />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
