import { useState, useEffect } from "react";

export default function AnimeSearch(props) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (props.animeName) {
      fetch(
        `https://api.jikan.moe/v4/anime?q=${props.animeName}&limit=10&order_by=members&sort=desc`
      )
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [props.searchKey]);

  const puttingZero = (score) => {
    return score.toString().length < 4 ? score + "0" : score;
  };

  const gettingEpisodes = (airing, episodes) => {
    if (airing) {
      return "Airing";
    } else if (!airing && episodes) {
      return episodes;
    } else {
      return "N/A";
    }
  };

  return (
    <div>
      {info.data && (
        <table className="anime-search table align-middle justify-content-center">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th className="align-center" scope="col">
                Score
              </th>
              <th className="align-center" scope="col">
                Episodes
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {info.data.map((anime) => (
              <tr>
                <td className="anime-search-image">
                  <img src={anime.images.jpg.image_url}></img>
                </td>
                <td>
                  <a
                    className="text-underline"
                    href={anime.url}
                    target="_blank"
                  >
                    {anime.title}
                  </a>
                </td>
                <td className="align-center">
                  {!anime.score ? "N/A" : puttingZero(anime.score)}
                </td>
                <td className="align-center">
                  {gettingEpisodes(anime.airing, anime.episodes)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
