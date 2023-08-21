import { useState, useEffect } from "react";
import { adjustingScore } from "./extra_functions";

export default function Season() {
  const [seasonInfo, setSeasonInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [max_page, setMaxPage] = useState([]);

  const settingPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/seasons/now?q=&sfw&page=${page}&limit=24`)
      .then((response) => response.json())
      .then((response) => {
        setSeasonInfo(seasonInfo.concat(response.data));
        setMaxPage(response.pagination.has_next_page);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const sorted_seasonInfo = [...seasonInfo].sort((a, b) => b.score - a.score); // Sorting the array using the score.

  return (
    <div className="my-3">
      <h1 className="text-center current-season">CURRENT SEASON</h1>
      {sorted_seasonInfo && (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2">
            {sorted_seasonInfo.map((season) => (
              <div className="col mb-3 d-flex" key={season.mal_id}>
                <div className="w-50">
                  <img
                    className="rounded img-thumbnail"
                    src={season.images.jpg.image_url}
                    alt={season.title}
                  />
                </div>
                <div className="w-100 d-flex flex-column justify-content-between">
                  <div className="content-main text-center">
                    <a
                      className="season-title"
                      href={season.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {season.title}
                    </a>
                  </div>
                  <div className="content-secondary">
                    <div className="season-synopsis">{season.synopsis}</div>
                  </div>
                  <div className="season-information text-center">
                    <div>
                      &#x2B50;{" "}
                      {!season.score ? "N/A" : adjustingScore(season.score)}
                    </div>
                    <div>Source: {season.source}</div>
                    <div>{season.type}</div>
                    <div>{season.status}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-100 d-flex justify-content-center">
              {max_page ? (
                <button onClick={settingPage} className="btn btn-dark w-25">
                  More
                </button>
              ) : (
                <button className="btn btn-dark w-25 disabled">More</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
