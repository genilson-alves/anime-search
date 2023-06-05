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
  };

  const getType = (event) => {
    if (event.target.checked) {
      setSearchType("manga");
    } else {
      setSearchType("anime");
    }
  };

  const getName = (event) => {
    if (!event.target.value.replace(/\s/g, "").length) {
      setSearchName("Naruto");
    } else if (event.target.value.replace(/\s/g, "").length) {
      setSearchName(event.target.value);
    } else {
      setSearchName("Naruto");
    }
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
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
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Top
              </button>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/top/anime"}
                  >
                    Anime
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/top/manga"}
                  >
                    Manga
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <div className="container-fluid d-flex">
                <form className="d-flex align-items-center" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Ex..Naruto"
                    aria-label="Search"
                    onChange={getName}
                  />
                  <Link
                    to={
                      searchType == "anime" ? "/search/anime" : "/search/manga"
                    }
                  >
                    <button
                      className="btn btn-dark mr-3"
                      onClick={getKey}
                      type="submit"
                    >
                      Search
                    </button>
                  </Link>
                </form>
              </div>
              <div className="form-check form-switch d-flex align-items-center">
                <div>
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
              </div>
            </ul>
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
