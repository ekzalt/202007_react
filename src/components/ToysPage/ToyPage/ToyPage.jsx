import React, { useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Category, Toy } from "../../../models";
import { toyActions } from "../../../store/actions";
import { ToyItem } from "../../index";

/**
 * @typedef IMainState
 * @property {boolean} loading
 */

/**
 * @typedef IAuthState
 * @property {boolean} logged
 * @property {string} token
 * @property {Error=} error
 */

/**
 * @typedef ICategoryState
 * @property {Category[]} list
 * @property {Error=} error
 */

/**
 * @typedef IToyState
 * @property {Toy[]} list
 * @property {Error=} error
 */

const ToyPage = () => {
  const dispatch = useDispatch();
  /** @type {IMainState} */
  const mainState = useSelector((state) => state.main, shallowEqual);
  /** @type {IAuthState} */
  const auth = useSelector((state) => state.auth, shallowEqual);
  /** @type {ICategoryState} */
  const categoryState = useSelector((state) => state.category, shallowEqual);
  /** @type {IToyState} */
  const toyState = useSelector((state) => state.toy, shallowEqual);
  const { toyId } = useParams();
  const toy = toyState.list.find((t) => t.id === toyId);

  const updateToy = useCallback(
    /**
     * @param {Toy} toyData
     */
    (toyData) => {
      if (auth.token) {
        dispatch(toyActions.updateToy(auth.token, toyData));
      }
    },
    [dispatch, auth]
  );

  let content = "";

  if (mainState.loading) {
    content = <p>Loading...</p>;
  } else {
    if (toy) {
      content = (
        <ToyItem
          toy={toy}
          categories={categoryState.list}
          updateToy={updateToy}
        />
      );
    } else {
      content = <p>Not Found</p>;
    }
  }

  return (
    <div>
      <h2>Toy</h2>
      <div>{content}</div>
    </div>
  );
};

export default ToyPage;
