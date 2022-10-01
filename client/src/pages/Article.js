import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { marked } from "marked";
import DOMPurify from "dompurify";

import { articles } from "../articles/articles"


function Article() {
  const [article, setArticle] = useState("");
  const { articleID } = useParams();

  function getTitle(text) {
    function getStart(text) {
      let start = text.indexOf("<h1");
      for (let i = start + 3; i < text.length; ++i) {
        if (text[i] == ">") {
          return i;
        }
      }
    }
    let start = getStart(text) + 1;
    let end = text.indexOf("</h1>", start);
    return text.slice(start, end);
  }

  useEffect(() => {
    let articlePlain = articles(articleID)
    let articleHTML = marked.parse(articlePlain)
    articleHTML = DOMPurify.sanitize(articleHTML)

    setArticle(articleHTML);
    document.title = getTitle(article);
  }, [article, articleID]);

  return (
    <div dangerouslySetInnerHTML={{__html: article}}>
    </div>
  );
}


export { Article };