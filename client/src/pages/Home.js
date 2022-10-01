import { Link } from "react-router-dom";

function Home() {
  document.title = "Home";

  return (
    <div>
      <h1>Peanut Butter & Jelly Jsandwich</h1>
      <p>
        <i>A crowdsourced knowledge database powered by blockchain.</i>
      </p>

      <p>Team: Prateik, Benson, Jeffrey, and Jordan</p>

      <p>
        Here is a link to the <Link to="/article">test article</Link>.
      </p>
    </div>
  );
}

export { Home };
