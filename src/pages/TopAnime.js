import { useEffect, useState } from "react";

export default function TopAnime() {
  const [topInfo, setTopInfo] = useState([]); // Setting the fetched data
  const [pageNumber, setPage] = useState(1); // Setting page number

  // Adjusting wrong scores

  const puttingZero = (score) => {
    if (score.toString().length == 1) {
      return `${score}.00`;
    } else if (score.toString().length == 3) {
      return `${score}0`;
    } else {
      return score;
    }
  };

  // Adjusting wrong episode numbers

  const gettingEpisodes = (airing, episodes) => {
    if (airing) {
      return "Airing";
    } else if (!airing && episodes) {
      return episodes;
    } else {
      return "N/A";
    }
  };

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
    fetch(`https://api.jikan.moe/v4/top/anime?q=&limit=25&page=${pageNumber}`)
      .then((response) => response.json())
      .then((response) => {
        setTopInfo(response);
      });
  }, [pageNumber]);

  return (
    <div>
      {topInfo.data && (
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
            {topInfo.data.map((top) => (
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
                <td>{!top.score ? "N/A" : puttingZero(top.score)}</td>
                <td>{gettingEpisodes(top.airing, top.episodes)}</td>
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
