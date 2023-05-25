import { useState, useEffect } from "react";

export default function CurrentSeason() {
  const [animeInfo, setSeasonInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/seasons/now?q=&page=${page}`).then(
      (response) =>
        response.json().then((response) => {
          setSeasonInfo(animeInfo.concat(response.data));
          if (response.pagination.has_next_page) {
            setPage(page + 1);
          }
        })
    );
  }, [page]);

  return (
    <div className="current-season">
      <h1 className="text-center">CURRENT SEASON</h1>
      {animeInfo && (
        <div className="container text-center season-container">
          <div className="row row-cols-2">
            {animeInfo.map((season) => (
              <div className="col season-div">
                <div className="content-main gy-4">
                  <a className="title" href={season.url} target="_blank">
                    {season.title}
                  </a>
                </div>
                <div className="content-secondary ">
                  <img
                    className="rounded float-start img-thumbnail"
                    src={season.images.jpg.image_url}
                    alt={season.title}
                  />
                  <div className="synopsis">{season.synopsis}</div>
                  <div className="content">
                    <div>&#x2B50; {season.score}</div>
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
