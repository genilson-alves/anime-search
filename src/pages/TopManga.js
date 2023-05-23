import { useEffect, useState } from "react";
import { puttingZero, gettingChapters } from "../components/functions";

export default function TopManga() {
  const [topInfo, setTopInfo] = useState([]); // Setting the fetched data
  const [pageNumber, setPage] = useState(1); // Setting page number

  const nextPage = () => {
    if (pageNumber <= 0) {
      setPage(1);
    } else {
      setPage(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber <= 1) {
      setPage(1);
    } else {
      setPage(pageNumber - 1);
    }
  };

  // Fetching the data

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
              <th scope="col">Type</th>
              <th scope="col">Score</th>
              <th scope="col">Status</th>
              <th scope="col">Volumes</th>
              <th scope="col">Chapters</th>
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
                <td>{top.type}</td>
                <td>&#x2B50; {!top.score ? "N/A" : puttingZero(top.score)}</td>
                <td>{top.status}</td>
                <td>{top.chapters ? top.chapters : "N/A"}</td>
                <td>{top.volumes ? top.volumes : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav aria-label="navigation">
        {
          <ul className="pagination pagination-sm justify-content-center">
            {pageNumber == 1 ? (
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
            ) : (
              <ul className="pagination pagination-sm justify-content-center">
                <li class="page-item">
                  <a class="page-link" onClick={previousPage}>
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" onClick={previousPage}>
                    {pageNumber - 1}
                  </a>
                </li>
              </ul>
            )}
            <li className="page-item active" aria-current="page">
              <a className="page-link">{pageNumber}</a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={nextPage}>
                {pageNumber + 1}
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        }
      </nav>
    </div>
  );
}
