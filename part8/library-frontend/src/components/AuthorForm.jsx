import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const AuthorForm = ({ authors, setError }) => {
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    //refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (!data) return undefined;

        const updatedAuthor = response.data.editAuthor;
        return {
          allAuthors: data.allAuthors.map((author) =>
            author.name === updatedAuthor.name
              ? { ...author, born: updatedAuthor.born }
              : author
          ),
        };
      });
    },
  });

  const handleUpdate = (event) => {
    event.preventDefault();

    const name = event.target.selectedAuthor.value;
    const born = Number(event.target.born.value);

    if (name !== "") updateAuthor({ variables: { name, setBornTo: born } });

    event.target.selectedAuthor.value = "";
    event.target.born.value = "";
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("error updating.");
    }
  }, [result.data]);

  if (!authors) return null;

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <label>
          Select author:
          <select name="selectedAuthor">
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input type="text" name="born" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
