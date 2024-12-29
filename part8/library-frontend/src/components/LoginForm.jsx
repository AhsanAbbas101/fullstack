import { useState, useEffect } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";
const LoginForm = ({ show, setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("app-token", token);
    }
  }, [result.data]);

  const doLogin = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  if (!show) return null;

  return (
    <div>
      <form onSubmit={doLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
