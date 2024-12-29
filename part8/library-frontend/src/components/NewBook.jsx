import { useState } from "react";

import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createNewBook] = useMutation(ADD_BOOK, {
    //refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      props.setError(messages);
    },
    update: (cache, response) => {
      const newBook = response.data.addBook;
      const possible_genres = newBook.genres.concat(null); // null is added to update all books retrived in cache
      possible_genres.map((genre) => {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: genre } },
          (data) => {
            return data
              ? {
                  allBooks: data.allBooks.concat(newBook),
                }
              : undefined; // do not update if not in cache?? will be fetched once genre button is clicked!
          }
        );
      });

      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (!data) return undefined;

        if (
          !data.allAuthors.find((author) => author.name === newBook.author.name)
        )
          return {
            allAuthors: data.allAuthors.concat(newBook.author),
          };
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    const _published = Number(published);
    createNewBook({
      variables: { title, author, genres, published: _published },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
