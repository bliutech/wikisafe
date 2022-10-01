import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { Home } from "./pages/Home.js";
import { Article } from "./pages/Article.js";

function App() {
  return (
    <div className="body">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/article"
            element={<Article link="../articles/ucla.md" />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
