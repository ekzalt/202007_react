import React from 'react';

import { Car } from '../../models';
import { CarElement } from '../index';

/**
 * @param {{ cars:Car[], filter:string }} props
 */
const CarList = ({ cars = [], filter = '' }) => {
  const carElements = cars
    .filter(({ color }) => (filter ? color.match(filter) : color))
    .map(car => <CarElement key={car.id} car={car} />);

  return (
    <>
      <p>cars: {cars.length}</p>
      <ul>{carElements}</ul>
    </>
  );
};

export default CarList;
