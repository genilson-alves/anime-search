import { useState, useEffect } from "react";
import { puttingZero } from "./extra_functions";

export default function SearchManga(props) {
  const [searchInfo, setSearchInfo] = useState([]);

  useEffect(() => {
    if (props.animeName) {
      fetch(
        `https://api.jikan.moe/v4/manga?q=${props.animeName}&limit=10&order_by=members&sort=desc`
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
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Chapters</th>
              <th scope="col">Volumes</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {searchInfo.map((search) => (
              <tr>
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
                  {!search.score ? "N/A" : puttingZero(search.score)}
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
