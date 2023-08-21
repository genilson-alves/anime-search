import { useState, useEffect } from "react";
import { adjustingScore } from "./extra_functions";

export default function SearchAnime(props) {
  const [searchInfo, setSearchInfo] = useState([]);

  useEffect(() => {
    if (props.searchName) {
      fetch(
        `https://api.jikan.moe/v4/anime?q=${props.searchName}&limit=10&order_by=members&sort=desc`
      )
        .then((response) => response.json())
        .then((response) => {
          setSearchInfo(response.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.clickKey]);

  const ids = searchInfo.map(({ mal_id }) => mal_id);
  const filtered = searchInfo.filter(
    ({ mal_id }, index) => !ids.includes(mal_id, index + 1)
  ); // Used to filter the content in case of duplicate IDs.

  return (
    <div>
      {filtered && (
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
            {filtered.map((search) => (
              <tr key={search.mal_id}>
                <td>
                  <img
                    className="img-thumbnail top-image"
                    src={search.images.jpg.image_url}
                    alt="img-thumbnail"
                  />
                </td>
                <td>
                  <a
                    className="title-link"
                    href={search.url}
                    target="_blank"
                    rel="noreferrer"
                  >
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
