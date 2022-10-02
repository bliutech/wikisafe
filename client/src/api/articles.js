const base = "http://localhost:5000";
const showError = true;

async function createArticle(
  articleID,
  articleText,
  username,
  callback = () => {}
) {
  let date = ~~(Date.now() / 1000);
  let object = {
    article_id: articleID,
    new_text: articleText,
    user: username,
    date: date,
  };
  const response = await fetch(`${base}/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then(() => callback())
    .catch((error) => {
      if (showError) {
        window.alert(error);
      }
      return;
    });
}

async function getArticle(articleID, callback = () => {}) {
  const response = await fetch(`${base}/article?article_id=${articleID}`);

  if (!response.ok) {
    // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const object = await response.json();
  return object["response"];
}

async function changeArticle(
  articleID,
  articleText,
  username,
  callback = () => {}
) {
  let date = ~~(Date.now() / 1000);
  let object = {
    article_id: articleID,
    new_text: articleText,
    user: username,
    date: date,
  };
  const response = await fetch(`${base}/article`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then(() => callback())
    .catch((error) => {
      if (showError) {
        window.alert(error);
      }
      return;
    });
}

async function deleteArticle(articleID, callback = () => {}) {
  let object = { article_id: articleID };
  const response = await fetch(`${base}/article`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  if (!response.ok) {
    // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
}

function articles(name) {
  switch (name) {
    case "ucla":
      return `
`;

    case "mit":
      return `
      # Massachusetts Institute of Technology

      ![MIT Great Dome](https://news.mit.edu/sites/default/files/download/201810/MIT-Computer-Announce-01-PRESS.jpg)
      <figcaption> MIT Great Dome, a famous building on campus.</figcaption>

      The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. Established in 1861, MIT has since played a key role in the development of modern technology and science, ranking among the top academic institutions in the world.

      ## Campus

      MIT's 166-acre (67.2 ha) campus in the city of Cambridge spans approximately a mile along the north side of the Charles River basin. The campus is divided roughly in half by Massachusetts Avenue, with most dormitories and student life facilities to the west and most academic buildings to the east. The bridge closest to MIT is the Harvard Bridge, which is known for being marked off in a non-standard unit of length &ndash; the smoot.

`;
  }
}

export { createArticle, getArticle, changeArticle, deleteArticle };
