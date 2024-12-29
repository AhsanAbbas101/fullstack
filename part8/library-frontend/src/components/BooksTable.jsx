import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const BooksTable = ({ genre }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre,
    },
  });

  if (loading) {
    return <p>Loading data</p>;
  }

  if (error) {
    var messages = error.graphQLErrors.map((e) => e.message).join("\n");
    messages += error.networkError;
    return (
      <div>
        <p>Error loading data.</p>
        <p>{messages}</p>
      </div>
    );
  }

  const books = data.allBooks;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
