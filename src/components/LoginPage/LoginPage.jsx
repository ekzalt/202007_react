import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { authActions } from "../../store/actions";

const LoginPage = () => {
  const defaultState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(defaultState);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.preventDefault();

      if (state.email && state.password) {
        dispatch(authActions.login(state));
        setState(defaultState);
      }
    },
    [state, setState, defaultState, dispatch]
  );

  const handleChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) =>
      setState({
        ...state,
        [e.target.name]: e.target.value,
      }),
    [state, setState]
  );

  const { email, password } = state;

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="1234567890"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
