import { useState, useEffect } from "react";
import { puttingZero } from "./extra_functions";

export default function Search(props) {
  const [searchInfo, setSearchInfo] = useState([]);

  useEffect(() => {
    if (props.animeName) {
      fetch(
        `https://api.jikan.moe/v4/${props.searchType}?q=${props.animeName}&limit=10&order_by=members&sort=desc`
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
            {searchInfo.map((anime) => (
              <tr>
                <td>
                  <img
                    className="anime-search-image"
                    src={anime.images.jpg.image_url}
                  ></img>
                </td>
                <td>
                  <a className="title-link" href={anime.url} target="_blank">
                    {anime.title}
                  </a>
                </td>
                <td>
                  &#x2B50; {!anime.score ? "N/A" : puttingZero(anime.score)}
                </td>
                <td>
                  {anime.airing
                    ? "Airing"
                    : anime.episodes
                    ? anime.episodes
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
