import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { Toy } from "../../../models";
import classes from "./ToyCard.module.css";

/**
 * @param {{ toy:Toy, deleteToy:(toy:Toy)=>void }} props
 */
const ToyCard = (props) => {
  const { toy, deleteToy } = props;

  const handleDelete = useCallback(
    /**
     * @param {Event} e
     */
    (e) => deleteToy(toy),
    [toy, deleteToy]
  );

  return (
    <div className={classes.ToyCard}>
      <Link to={`toys/${toy.id}`}>
        <div>
          <p>name: {toy.name}</p>
          <p>description: {toy.description}</p>
          <p>category: {toy.category.name}</p>
          <p>price: {toy.price}</p>
          <p>quantity: {toy.quantity}</p>
          <p>total cost: {toy.totalCost}</p>
        </div>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ToyCard;
