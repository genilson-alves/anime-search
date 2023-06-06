import { useState, useEffect } from "react";
import { adjustingScore } from "./extra_functions";

export default function SearchManga(props) {
  const [searchInfo, setSearchInfo] = useState([]);

  useEffect(() => {
    if (props.searchName) {
      fetch(
        `https://api.jikan.moe/v4/manga?q=${props.searchName}&limit=10&order_by=members&sort=desc`
      )
        .then((response) => response.json())
        .then((response) => {
          setSearchInfo(response.data);
        });
    }
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
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Chapters</th>
              <th scope="col">Volumes</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filtered.map((search) => (
              <tr key={search.mal_id}>
                <td>
                  <img
                    src={search.images.jpg.image_url}
                    className="img-thumbnail top-image"
                    alt={search.title}
                  />
                </td>
                <td>
                  <a className="title-link" target="_black" href={search.url}>
                    {search.title}
                  </a>
                </td>
                <td>
                  &#x2B50;
                  {!search.score ? "N/A" : adjustingScore(search.score)}
                </td>
                <td>{search.type}</td>
                <td>{search.status}</td>
                <td>{search.chapters ? search.chapters : "N/A"}</td>
                <td>{search.volumes ? search.volumes : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
