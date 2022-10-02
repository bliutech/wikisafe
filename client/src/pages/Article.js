import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { marked } from "marked";
import DOMPurify from "dompurify";

import {
  createArticle,
  getArticle,
  changeArticle,
  deleteArticle,
} from "../api/articles";

function Article(props) {
  const [article, setArticle] = useState("");
  const { articleID } = useParams();

  function getTitle(text) {
    let start = text.indexOf("#") + 1;
    let end = text.indexOf("\n\n", start);
    if (start == 0) {
      return "Unnamed Article";
    } else {
      return text.slice(start, end);
    }
  }

  function toHTML(text) {
    let textHTML = marked.parse(text);
    textHTML = DOMPurify.sanitize(textHTML); // very important for security!
    return textHTML;
  }

  useEffect(() => {
    async function handleArticle() {
      if (props.text) {
        setArticle(props.text);
      } else {
        const articlePlain = await getArticle(articleID);
        console.log(articlePlain);
        setArticle(articlePlain);
      }
    }
    handleArticle();
    document.title = getTitle(article);
  }, [props.text, articleID]);

  return <div dangerouslySetInnerHTML={{ __html: toHTML(article) }}></div>;
}

export { Article };
