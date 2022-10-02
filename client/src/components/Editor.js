import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Article } from "../pages/Article";

import {
  createArticle,
  getArticle,
  changeArticle,
  deleteArticle,
} from "../api/articles";

function Editor() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const username = cookies.username;

  const [editorText, setEditorText] = useState(null);
  const { articleID } = useParams();

  const navigate = useNavigate();

  function handleEditorText(event) {
    setEditorText(event.target.value);
  }

  useEffect(() => {
    async function handleText() {
      if (editorText === null) {
        const articlePlain = await getArticle(articleID);
        setEditorText(articlePlain);
      }
    }
    handleText();
  }, [editorText, articleID]);

  function handleCancel() {
    return;
  }

  async function handleSave() {
    let callback = () => window.location.reload();
    changeArticle(articleID, editorText, username, (callback = callback));
  }

  return (
    <div>
      <textarea
        className="editor"
        value={editorText === null ? "" : editorText}
        onChange={handleEditorText}
      ></textarea>
      <br />
      <div className="editor-button">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="editor-preview">
        <Article text={editorText} />
      </div>
    </div>
  );
}

export { Editor };
