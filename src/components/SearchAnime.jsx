import { useState, useEffect } from "react";
import { adjustingScore } from "./extra_functions";

export default function SearchAnime(props) {
  const [searchInfo, setSearchInfo] = useState([]);

  useEffect(() => {
    if (props.animeName) {
      fetch(
        `https://api.jikan.moe/v4/anime?q=${props.animeName}&limit=10&order_by=members&sort=desc`
      )
        .then((response) => response.json())
        .then((response) => {
          setSearchInfo(response.data);
        });
    }
  }, [props.clickKey]);

  return (
    <div>
      {searchInfo && (
        <table className="table align-middle text-center">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th scope="col">Score</th>
              <th scope="col">Episodes</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {searchInfo.map((search) => (
              <tr>
                <td>
                  <img
                    className="img-thumbnail top-image"
                    src={search.images.jpg.image_url}
                  ></img>
                </td>
                <td>
                  <a className="title-link" href={search.url} target="_blank">
                    {search.title}
                  </a>
                </td>
                <td>
                  &#x2B50;
                  {!search.score ? "N/A" : adjustingScore(search.score)}
                </td>
                <td>
                  {search.airing
                    ? "Airing"
                    : search.episodes
                    ? search.episodes
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
