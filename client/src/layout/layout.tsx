import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <div>
          <Link to="/"><p>Sleep Tracker</p></Link>
          <nav>
            <ul>
              <li><Link to="/">Entries</Link></li>
              <li><Link to="/create">Add Entry</Link></li>
            </ul>
          </nav>
        </div>
      </header>      
      <main>
        <Outlet />
      </main>
      <footer>Made by Jack Boyd</footer>
    </div>
  );
};

export default Layout;
