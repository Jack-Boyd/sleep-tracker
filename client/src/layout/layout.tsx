import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header className="flex flex-row mx-auto max-w-screen-xl">
        <div className="flex flex-wrap justify-between items-center w-full px-4 lg:px-6 pt-4 pb-8">
          <Link to="/"><p className="font-bold text-xl">Sleep Tracker</p></Link>
          <nav className="bg-white border-gray-200">
            <ul className="flex justify-center flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li><Link to="/">Entries</Link></li>
              <li><Link to="/create">Add Entry</Link></li>
            </ul>
          </nav>
        </div>
      </header>      
      <main>
        <Outlet />
      </main>
      <footer className="text-center my-10">Made by Jack Boyd</footer>
    </div>
  );
};

export default Layout;
