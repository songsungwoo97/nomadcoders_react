import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          {movie.yt_trailer_code && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title="YouTube"
              frameborder="0"
              allowfullscreen
            ></iframe>
          )}
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
