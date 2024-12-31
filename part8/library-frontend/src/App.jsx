import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommend from "./components/Recommend";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

import { updateCache } from "./queries/cache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("app-token"));
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data.data.bookAdded);
      notify(`A new book added ${data.data.bookAdded.title}.`);

      updateCache(client.cache, { query: ALL_BOOKS }, data.data.bookAdded);
    },
  });

  const doLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={doLogout}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")}>login</button>
            <LoginForm
              show={page === "login"}
              setError={notify}
              setToken={setToken}
            />
          </>
        )}
        <br />
        <Notify errorMessage={errorMessage} />
      </div>

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} setError={notify} />

      <NewBook show={page === "add"} setError={notify} />

      <Recommend show={page === "recommend"} setError={notify} />
    </div>
  );
};

export default App;
