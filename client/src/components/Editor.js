import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Article } from "../pages/Article";

import { articles } from "../api/articles";


function Editor() {
  const [editorText, setEditorText] = useState(null);
  const { articleID } = useParams();

  function handleEditorText(event) {
    setEditorText(event.target.value);
  }

  useEffect(() => {
    if (editorText === null) {
      let articlePlain = articles(articleID);
      setEditorText(articlePlain);
    }
  }, [editorText, articleID]);

  function handleCancel() {
    return;
  }

  function handleSave() {
    return;
  }

  return (
    <div>
      <textarea
        className="editor"
        value={editorText === null? "": editorText}
        onChange={handleEditorText}
      >
      </textarea><br/>
      <div className="editor-button">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="editor-preview">
        <Article key={editorText} text={editorText}/>
      </div>
    </div>
  );
}


export { Editor };