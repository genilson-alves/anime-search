import { useEffect, useState } from "react";
import { puttingZero } from "../components/extra_functions";
import TopNavigation from "../components/TopNavigation";

export default function TopAnime() {
  const [topInfo, setTopInfo] = useState([]); // Setting the fetched data
  const [pageNumber, setPage] = useState(1); // Setting page number

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/anime?q=&limit=25&page=${pageNumber}`)
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
              <th scope="col">Episodes</th>
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
                <td>
                  {top.airing ? "Airing" : top.episodes ? top.episodes : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <TopNavigation pageNumber={pageNumber} setPage={setPage} />
    </div>
  );
}
