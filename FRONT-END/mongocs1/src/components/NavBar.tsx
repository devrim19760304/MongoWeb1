import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <ul
          className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
          data-twe-navbar-nav-ref
        >
          <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
            <Link to="/">Home</Link>
          </li>
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <Link to="/alldata">All Data</Link>
          </li>

          <li className="mb-4 lg:mb-0 lg:pe-2">
            <Link to="/addnew">Add New Data</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
