import { useState } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Season from "./Season";
import Search from "./Search";
import TopAnime from "../pages/TopAnime";
import TopManga from "../pages/TopManga";

export default function Navigation() {
  const [animeName, setAnimeName] = useState("");
  const [clickKey, setClickKey] = useState(false);
  const [searchType, setSearchType] = useState("anime");

  const settingKey = () => {
    setClickKey(!clickKey);
  };

  const gettingName = (event) => {
    setAnimeName(event.target.value);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      setSearchType("manga");
    } else {
      setSearchType();
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
              <div className="container-fluid">
                <form className="d-flex align-items-center" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Ex..Naruto"
                    aria-label="Search"
                    onChange={gettingName}
                  />
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      onClick={handleChange}
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label"
                      for="flexCheckDefault"
                    ></label>
                  </div>
                  <Link to={"/search"}>
                    <button
                      className="btn btn-dark"
                      onClick={settingKey}
                      type="submit"
                    >
                      Search
                    </button>
                  </Link>
                </form>
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
          path={"/search"}
          element={
            <Search
              clickKey={clickKey}
              animeName={animeName}
              searchType={searchType}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}
