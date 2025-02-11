import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import AuthorForm from "./AuthorForm";

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return (
      <div>
        <h2>authors</h2>
        <p>Loading data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>authors</h2>
        <p>Failed loading data. Retry some other time.</p>
      </div>
    );
  }

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      {localStorage.getItem("app-token") && (
        <AuthorForm authors={authors} setError={props.setError} />
      )}
    </div>
  );
};

export default Authors;
