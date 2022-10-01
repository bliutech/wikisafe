import { Link } from "react-router-dom";


function NavigationBar() {
  return (
    <header className="navigation-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/a/ucla">Articles</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </header>
  );
}


export { NavigationBar };