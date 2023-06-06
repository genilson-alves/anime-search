import { useEffect, useState } from "react";
import { adjustingScore } from "./extra_functions";
import PageNavigation from "./PageNavigation";

export default function TopManga() {
  const [topInfo, setTopInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/manga?q=&limit=25&page=${page}`)
      .then((response) => response.json())
      .then((response) => {
        setTopInfo(response.data);
      });
  }, [page]);

  return (
    <div>
      {topInfo && (
        <div className="table-responsive">
          <table className="table align-middle text-center">
            <thead>
              <tr>
                <th scope="col">Rank</th>
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
              {topInfo.map((top) => (
                <tr key={top.mal_id}>
                  <th scope="row">{top.rank}</th>
                  <td>
                    <img
                      src={top.images.jpg.image_url}
                      className="img-thumbnail top-image"
                      alt={top.title}
                    />
                  </td>
                  <td>
                    <a className="title-link" target="_black" href={top.url}>
                      {top.title}
                    </a>
                  </td>
                  <td>
                    &#x2B50; {!top.score ? "N/A" : adjustingScore(top.score)}
                  </td>
                  <td>{top.type}</td>
                  <td>{top.status}</td>
                  <td>{top.chapters ? top.chapters : "N/A"}</td>
                  <td>{top.volumes ? top.volumes : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PageNavigation page={page} setPage={setPage} />
    </div>
  );
}
