import { useState } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Season from "./Season";
import SearchAnime from "./SearchAnime";
import SearchManga from "./SearchManga";
import TopAnime from "./TopAnime";
import TopManga from "./TopManga";

export default function Navigation() {
  const [searchName, setSearchName] = useState("Naruto");
  const [searchType, setSearchType] = useState("anime");
  const [clickKey, setClickKey] = useState(false);

  const getKey = () => {
    setClickKey(!clickKey);
  }; // Used to set a key to use as a parameter in UseEffect to only make API calls after receiving the key from the search button.

  const getType = (event) => {
    if (event.target.checked) {
      setSearchType("manga");
    } else {
      setSearchType("anime");
    }
  }; // Used to send the type of the search selected by the user.

  const getName = (event) => {
    if (event.target.value.replace(/\s/g, "").length) {
      setSearchName(event.target.value);
    } else if (!event.target.value.replace(/\s/g, "").length) {
      setSearchName("Naruto");
    } else {
      setSearchName("Naruto");
    }
  }; // Used to set the search name as "Naruto" in case of nothing is typed or is only spaces with the user trying to do a search or to set the value as the user typed.

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to={"/"} className="navbar-brand">
            <img
              src={"favicon.ico"}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            AnimeSearch
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Top
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      aria-current="page"
                      to={"/top/anime"}
                    >
                      Anime
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      aria-current="page"
                      to={"/top/manga"}
                    >
                      Manga
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
            <form className="d-flex flex-column" role="search">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Ex..Naruto"
                  aria-label="Search"
                  onChange={getName}
                />
                <Link
                  to={searchType == "anime" ? "/search/anime" : "/search/manga"}
                >
                  <button
                    className="btn btn-dark mr-3"
                    onClick={getKey}
                    type="submit"
                  >
                    Search
                  </button>
                </Link>
              </div>
              <div className="form-check form-switch d-flex gap-2 mt-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onClick={getType}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Manga
                </label>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path={"/"} element={<Season />}></Route>
        <Route path={"/top/anime"} element={<TopAnime />}></Route>
        <Route path={"/top/manga"} element={<TopManga />}></Route>
        <Route
          path={"/search/anime"}
          element={<SearchAnime searchName={searchName} clickKey={clickKey} />}
        ></Route>
        <Route
          path={"/search/manga"}
          element={<SearchManga searchName={searchName} clickKey={clickKey} />}
        ></Route>
      </Routes>
    </Router>
  );
}
