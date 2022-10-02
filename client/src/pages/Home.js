import { Link } from "react-router-dom";

function Home() {
  document.title = "Wikisafe";

  return (
    <div>
      <h1>Wikisafe</h1>

      <figcaption>
        A crowdsourced knowledge database powered by ML and blockchain.
      </figcaption>

      <div className="home-image-container">
        <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/57f3a284-9cc1-4447-90c2-518971a3a8a5/out-0.png" />
        <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/1e326180-9e4d-425f-b903-5bd97a1770dd/out-0.png" />
        <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/928234b0-22b4-4938-8552-1af213b7294f/out-0.png" />
      </div>
      <div className="home-image-container">
        <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/d10cccc4-087e-4938-9f68-676a95df7a5b/out-0.png" />
        <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/10b64689-e067-4d22-a7fc-75930297ade5/out-0.png" />
        <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/53b59cf5-6175-4b75-89fa-47dac185ec88/out-0.png" />
      </div>

      <p>
        Team <b>Peanut Butter & Jelly Jsandwich</b>&mdash;Prateik, Benson,
        Jeffrey, and Jordan.
      </p>
    </div>
  );
}

export { Home };
