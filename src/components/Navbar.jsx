import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeSearch from "./AnimeSearch";
import TopAnime from "../pages/TopAnime";
import Season from "./Season";
import { useState } from "react";

export default function Navbar() {
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
              src="favicon.ico"
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/top"}
                >
                  Top
                </Link>
              </li>
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
        <Route path={"/"} element={<Season />}></Route>
        <Route path={"/top"} element={<TopAnime />}></Route>
        <Route
          path={"/search"}
          element={<AnimeSearch searchKey={searchKey} animeName={animeName} />}
        ></Route>
      </Routes>
    </Router>
  );
}
