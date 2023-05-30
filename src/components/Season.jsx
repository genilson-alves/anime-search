import { useState, useEffect } from "react";
import { adjustingScore } from "./extra_functions";

export default function Season() {
  const [seasonInfo, setSeasonInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/seasons/now?q=&page=${page}`).then(
      (response) =>
        response.json().then((response) => {
          setSeasonInfo(seasonInfo.concat(response.data));
          if (response.pagination.has_next_page) {
            setPage(page + 1);
          }
        })
    );
  }, [page]);

  const sorted_seasonInfo = [...seasonInfo].sort((a, b) => b.score - a.score);

  return (
    <div className="my-3">
      <h1 className="text-center">CURRENT SEASON</h1>
      {sorted_seasonInfo && (
        <div className="container text-center season-container" key={1}>
          <div className="row row-cols-2">
            {sorted_seasonInfo.map((season) => (
              <div className="col">
                <div className="season-content content-main gy-4">
                  <a className="season-title" href={season.url} target="_blank">
                    {season.title}
                  </a>
                </div>
                <div className="content-secondary">
                  <img
                    className="season-image rounded float-start img-thumbnail"
                    src={season.images.jpg.image_url}
                    alt={season.title}
                  />
                  <div className="season-synopsis">{season.synopsis}</div>
                  <div className="season-informations">
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
          </div>
        </div>
      )}
    </div>
  );
}
