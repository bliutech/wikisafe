import { useState, useEffect } from "react";

import { marked } from "marked";
import DOMPurify from "dompurify";

import { articles } from "../articles/articles";

function Article(props) {
  const [article, setArticle] = useState("");

  useEffect(() => {
    let articlePlain = articles("ucla");
    let articleHTML = marked.parse(articlePlain);
    articleHTML = DOMPurify.sanitize(articleHTML);
    setArticle(articleHTML);
  }, [article]);

  return <div dangerouslySetInnerHTML={{ __html: article }}></div>;
}

export { Article };
