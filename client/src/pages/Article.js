import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { marked } from "marked";
import DOMPurify from "dompurify";

import { articles } from "../api/articles";

function Article(props) {
  const [article, setArticle] = useState("");
  const { articleID } = useParams();

  function getTitle(text) {
    let start = text.indexOf("#") + 1;
    let end = text.indexOf("\n\n", start);
    return text.slice(start, end);
  }

  function toHTML(text) {
    let textHTML = marked.parse(text);
    textHTML = DOMPurify.sanitize(textHTML); // very important for security!
    return textHTML;
  }

  useEffect(() => {
    if (props.text) {
      setArticle(props.text);
    } else {
      let articlePlain = articles(articleID);
      setArticle(articlePlain);
    }
    document.title = getTitle(article);
  }, [article, articleID]);

  return <div dangerouslySetInnerHTML={{ __html: toHTML(article) }}></div>;
}

export { Article };
