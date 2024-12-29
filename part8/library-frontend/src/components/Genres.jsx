import { useQuery } from "@apollo/client";
import { ALL_GENRES } from "../queries";

const Genres = ({ setGenre }) => {
  const result = useQuery(ALL_GENRES);

  if (result.error) return null;

  if (result.loading) return <p>Fetching genres...</p>;

  const allGenres = result.data.allGenres;

  return (
    <div>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Genres;
