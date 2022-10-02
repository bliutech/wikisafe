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

export { createArticle, getArticle, changeArticle, deleteArticle };
