import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import { Edit } from "./pages/Edit";
import { New } from "./pages/New";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

import { NavigationBar } from "./components/NavigationBar";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <NavigationBar />

          <div className="content">
            <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/a/:articleID" element={<Article />} />
                <Route path="/e/:articleID" element={<Edit />} />
                <Route path="/new" element={<New />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
