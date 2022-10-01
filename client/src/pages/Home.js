import { Link } from "react-router-dom";


function Home() {
    document.title = "WikiSafe";

    return (
      <div>
        <h1>WikiSafe</h1>

        <figcaption>A crowdsourced knowledge database powered by ML and blockchain.</figcaption>

        <p>
          Team <b>Peanut Butter & Jelly Jsandwich</b>&mdash;Prateik, Benson, Jeffrey, and Jordan.
        </p>

        <p>Here is a link to the <Link to="/article">test article</Link>.</p>
      </div>
    );
}


export { Home };