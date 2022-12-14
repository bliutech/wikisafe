import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getArticle, getArticles } from "../api/articles";

function getTitle(text) {
  let start = text.indexOf("#") + 1;
  let end = text.indexOf("\n\n", start);
  if (start == 0) {
    return "Unnamed Article";
  } else {
    return text.slice(start, end);
  }
}

function getDate(timestamp) {
  let time = new Date(timestamp * 1000);
  return time.toLocaleDateString("en-US");
}

function ArticleCard({ article }) {
  let [name, setName] = useState("");

  useEffect(() => {
    async function getAllArticles() {
      let currArticle = await getArticle(article.articleId);
      setName(getTitle(currArticle));
    }
    getAllArticles();
  }, []);

  const navigate = useNavigate();

  return (
    <span>
      <p>
        <b>
          <Link to={"/a/" + article.articleId}>{name}</Link>
        </b>{" "}
        <br />
        <strong>Author: </strong>
        {article.author} <br />
        <strong>Created: </strong> {getDate(article.date_created)}
        <br />
        <strong>Last Editor: </strong> {article.last_editor}
        <br />
        <strong>Last Modified: </strong> {getDate(article.date_modified)}
      </p>
    </span>
  );
}

export function Articles() {
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getAllArticles() {
      let res = await getArticles();
      setArticles(res);
    }
    getAllArticles();
  }, []);

  return (
    <>
      <h1>Articles</h1>
      <ul className="articles">
        {articles.map((article) => (
          <li key={article.articleId}>
            <ArticleCard article={article} />
          </li>
        ))}
        {console.log(articles)}
      </ul>
    </>
  );
}
