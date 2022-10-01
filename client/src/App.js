import { HashRouter, Routes, Route } from "react-router-dom";

import './App.css';

import { Home } from "./pages/Home";
import { Article } from "./pages/Article"
import { Edit } from "./pages/Edit"

import { NavigationBar } from "./components/NavigationBar"


function App() {
  return (
    <div>
      <div>
        <HashRouter>
          <NavigationBar />

          <div className="content">
            <div className="body">
              <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/a/:articleID" element={ <Article /> }/>
                <Route path="/e/:articleID" element={ <Edit /> }/>
              </Routes>
            </div>
          </div>
        </HashRouter>
      </div>
    </div>
  );
}


export default App;
