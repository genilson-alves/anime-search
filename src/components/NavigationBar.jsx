import { useState } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentSeason from "./CurrentSeason";
import AnimeSearch from "./AnimeSearch";
import TopA from "../pages/TopAnime";
import TopM from "../pages/TopManga";

export default function NavigationBar() {
  const [animeName, setAnimeName] = useState("");
  const [searchKey, setButtonKey] = useState(false);

  const settingKey = () => {
    setButtonKey(!searchKey);
  };

  const gettingName = (event) => {
    setAnimeName(event.target.value);
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
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Ex..Naruto"
                    aria-label="Search"
                    onChange={gettingName}
                  />
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
        <Route path={"/"} element={<CurrentSeason />}></Route>
        <Route path={"/top/anime"} element={<TopA />}></Route>
        <Route path={"/top/manga"} element={<TopM />}></Route>
        <Route
          path={"/search"}
          element={<AnimeSearch searchKey={searchKey} animeName={animeName} />}
        ></Route>
      </Routes>
    </Router>
  );
}
