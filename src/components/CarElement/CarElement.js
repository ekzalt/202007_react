import React from 'react';

import { Car } from '../../models';

/**
 * @param {{ car:Car }} props
 */
const CarElement = ({ car }) => {
  const { id, model, color } = car;

  return <li>id: {id}, model: {model}, color: {color}</li>;
};

export default CarElement;
