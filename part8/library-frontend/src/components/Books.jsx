import { useState } from "react";
import Genres from "./Genres";
import BooksTable from "./BooksTable";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}

      <br />
      <BooksTable genre={genre} />
      <Genres setGenre={setGenre} />
    </div>
  );
};

export default Books;
