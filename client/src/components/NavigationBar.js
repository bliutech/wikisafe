import { Link } from "react-router-dom";


function NavigationBar() {
  return (
    <header className="navigation-bar">
      <img src="logo.jpg" className="logo"/>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/a/ucla">Articles</Link></li>
        <li><Link to="/e/ucla">Edit</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </header>
  );
}


export { NavigationBar };