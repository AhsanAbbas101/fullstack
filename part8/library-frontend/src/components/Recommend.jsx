import { useQuery } from "@apollo/client";
import BooksTable from "./BooksTable";
import { LOGGED_USER } from "../queries";

const Recommend = (props) => {
  const result = useQuery(LOGGED_USER);

  if (!props.show) {
    return null;
  }

  if (result.error) return <div>error fetching your genre.</div>;
  if (result.loading) return <div>fetcing your favorite genre...</div>;

  const genre = result.data.me.favoriteGenre;
  return (
    <div>
      <h2>Recommendations</h2>
      {genre && (
        <p>
          books in your favorite genre <strong>{genre}</strong>
        </p>
      )}

      <br />
      <BooksTable genre={genre} />
    </div>
  );
};

export default Recommend;
