import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Form } from "../components/Form";

import {
  createArticle,
  getArticle,
  changeArticle,
  deleteArticle,
} from "../api/articles";

function New() {
  document.title = "New Article";

  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const username = cookies.username;

  const [articleID, setArticleID] = useState(null);
  const [articleTitle, setArticleTitle] = useState(null);

  const navigate = useNavigate();

  const formEntries = [
    {
      label: "Article ID",
      placeholder: "Create a unique article ID. This cannot be changed.",
      onChange: setArticleID,
      onKeyPress: handleEnter,
    },
    {
      label: "Article Title",
      placeholder: "Create a concise article title. This can be changed.",
      onChange: setArticleTitle,
      onKeyPress: handleEnter,
    },
  ];

  function handleEnter(key) {
    if (key == "Enter") {
      handleCreate();
    }
  }

  async function handleCreate() {
    let callback = () => navigate(`/e/${articleID}`);
    createArticle(
      articleID,
      `# ${articleTitle}`,
      username,
      (callback = callback)
    );
  }

  return (
    <div>
      <h1>Create New Article</h1>
      <Form
        formEntries={formEntries}
        buttonText="Create"
        onClick={handleCreate}
      />
    </div>
  );
}

export { New };
