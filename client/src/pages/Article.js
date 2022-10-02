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

import { getSummary } from "../api/ml";

function Article(props) {
  const [article, setArticle] = useState("");
  const { articleID } = useParams();

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

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
    document.title = getTitle(article);
    return textHTML;
  }

  useEffect(() => {
    async function handleArticle() {
      if (props.text) {
        setArticle(props.text);
      } else {
        const articlePlain = await getArticle(articleID);
        setArticle(articlePlain);
      }
    }
    handleArticle();
  }, [props.text, articleID]);

  async function handleSummary() {
    setLoading(true);
    const summaryRaw = await getSummary(article);
    setLoading(false);
    setSummary(summaryRaw);
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: toHTML(article) }}></div>
      <h1>TL;DR</h1>
      <figcaption>
        Did not want to read all that? Check out the summary by clicking the
        button below :)
      </figcaption>
      <button onClick={handleSummary}>{loading ? "loading..." : "Summary"}</button>
      <div dangerouslySetInnerHTML={{ __html: toHTML(summary) }}></div>
    </div>
  );
}

export { Article };
