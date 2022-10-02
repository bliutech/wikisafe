import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import logo from "../logo.jpg";

function NavigationBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const username = cookies.username;

  const [pathname, setPathname] = useState(window.location.pathname);
  const navigate = useNavigate();

  function onClick(link) {
    navigate(link);
    setPathname(window.location.pathname);
  }

  function handleSignOut() {
    removeCookie("username", { path: "/" });
    window.location.reload();
  }

  function editOrNew() {
    let articleIDArticle = pathname.indexOf("/a/");
    let articleIDEdit = pathname.indexOf("/e/");
    let articleID = "";
    if (articleIDArticle > -1) {
      articleID = pathname.slice(articleIDArticle + 3);
    } else if (articleIDEdit > -1) {
      articleID = pathname.slice(articleIDEdit + 3);
    } else {
      return <li onClick={() => onClick("/new")}>New</li>;
    }
    return <li onClick={() => onClick(`/e/${articleID}`)}>Edit</li>;
  }

  if (username) {
    return (
      <header className="navigation-bar">
        <img src={logo} className="logo" />
        <div>
          <ul>
            <li onClick={() => onClick("/")}>Home</li>
            <li onClick={() => onClick("/a/ucla")}>Articles</li>
            {editOrNew()}
            <li onClick={() => onClick("/stablediffusion")}>
              Can't Find an Image?
            </li>
            <li onClick={() => onClick("/about")}>About</li>
          </ul>
        </div>
        <div className="navigation-account">
          <ul>
            <li className="username">
              <b>{username}</b>
            </li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
      </header>
    );
  } else {
    return (
      <header className="navigation-bar">
        <img src={logo} className="logo" />
        <div>
          <ul>
            <li onClick={() => onClick("/")}>Home</li>
            <li onClick={() => onClick("/a/ucla")}>Articles</li>
            <li onClick={() => onClick("/stablediffusion")}>
              Can't Find an Image?
            </li>
            <li onClick={() => onClick("/about")}>About</li>
          </ul>
        </div>
        <div className="navigation-account">
          <ul>
            <li onClick={() => onClick("/signin")}>Sign In</li>
            <li onClick={() => onClick("/signup")}>Sign Up</li>
          </ul>
        </div>
      </header>
    );
  }
}

export { NavigationBar };
