import React, { useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import { authActions, mainActions } from "../../store/actions";
import {
  NotFoundPage,
  LoginPage,
  DashboardPage,
  CategoriesPage,
  ToyPage,
  ToysPage,
  TransactionPage,
  TransactionsPage,
} from "../index";
import "./App.css";

/**
 * @typedef IAuthState
 * @property {boolean} logged
 * @property {string} token
 * @property {Error=} error
 */

const App = () => {
  /** @type {IAuthState} */
  const auth = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  // useEffect instead of componentDidMount and componentDidUpdate
  useEffect(() => {
    dispatch(mainActions.init());
  }, [dispatch]);

  const handleLogout = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.preventDefault();
      dispatch(authActions.logout(auth.token));
    },
    [dispatch, auth]
  );

  const { logged } = auth;

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/toys">Toys</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              {logged ? (
                <Link to="/logout" onClick={handleLogout} >Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/dashboard">
            {!logged && <Redirect to="/login" />}
            <DashboardPage />
          </Route>
          <Route exact path="/categories">
            {!logged && <Redirect to="/login" />}
            <CategoriesPage />
          </Route>
          <Route exact path="/toys/:toyId">
            {!logged && <Redirect to="/login" />}
            <ToyPage />
          </Route>
          <Route exact path="/toys">
            {!logged && <Redirect to="/login" />}
            <ToysPage />
          </Route>
          <Route exact path="/transactions/:txId">
            {!logged && <Redirect to="/login" />}
            <TransactionPage />
          </Route>
          <Route exact path="/transactions">
            {!logged && <Redirect to="/login" />}
            <TransactionsPage />
          </Route>
          <Route exact path="/login">
            {logged && <Redirect to="/dashboard" />}
            <LoginPage />
          </Route>
          <Route exact path="/login">
            {logged && <Redirect to="/dashboard" />}
            <LoginPage />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/">
            {logged ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
