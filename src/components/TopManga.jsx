import { useEffect, useState } from "react";
import { puttingZero, gettingChapters } from "../components/extra_functions";
import TopNavigation from "../components/TopNavigation";

export default function TopManga() {
  const [topInfo, setTopInfo] = useState([]);
  const [pageNumber, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/manga?q=&limit=25&page=${pageNumber}`)
      .then((response) => response.json())
      .then((response) => {
        setTopInfo(response.data);
      });
  }, [pageNumber]);

  return (
    <div>
      {topInfo && (
        <table className="table align-middle justify-content-center align-center">
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
              <tr>
                <th scope="row">{top.rank}</th>
                <td>
                  <img
                    src={top.images.jpg.image_url}
                    className="img-thumbnail top-image"
                    alt={top.title}
                  />
                </td>
                <td>
                  <a
                    className="text-underline text-black"
                    targetName="_black"
                    href={top.url}
                  >
                    {top.title}
                  </a>
                </td>
                <td>&#x2B50; {!top.score ? "N/A" : puttingZero(top.score)}</td>
                <td>{top.type}</td>
                <td>{top.status}</td>
                <td>{top.chapters ? top.chapters : "N/A"}</td>
                <td>{top.volumes ? top.volumes : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <TopNavigation pageNumber={pageNumber} setPage={setPage} />
    </div>
  );
}
