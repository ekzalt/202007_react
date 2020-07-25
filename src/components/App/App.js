import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Car } from '../../models';
import { CarList } from '../index';
import './App.css';

class App extends React.Component {
  state = {
    clicks: 0,
    /** @type {Car[]} */
    cars: [],
    filter: '',
  };

  modelRef = React.createRef();
  colorRef = React.createRef();

  increment = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };

  decrement = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };

  /**
   * @param {Event} e
   */
  addCar = (e) => {
    e.preventDefault();

    if (!this.modelRef.current.value || !this.colorRef.current.value) {
      return;
    }

    const car = new Car({
      id: uuidv4(),
      model: this.modelRef.current.value,
      color: this.colorRef.current.value,
    });

    this.setState({ cars: [...this.state.cars, car] });
  };

  /**
   * @param {Event} e
   */
  deleteCar = (e) => {
    e.preventDefault();
    this.setState({ cars: this.state.cars.slice(1) });
  };

  /**
   * @param {Event} e
   */
  readFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { clicks, cars, filter } = this.state;

    return (
      <main>
        <section>
          <p>clicks: {clicks}</p>
          <button onClick={this.increment}>increment</button>
          <button onClick={this.decrement}>decrement</button>
        </section>
        <section>
          <CarList cars={cars} filter={filter} />
          <form>
            <label htmlFor="model">model:</label>
            <input ref={this.modelRef} id="model" name="model" placeholder="BMW" />
            <label htmlFor="color">color:</label>
            <input ref={this.colorRef} id="color" name="color" placeholder="red" />
            <button onClick={this.addCar}>Add Car</button>
            <button onClick={this.deleteCar}>Delete Car</button>
          </form>
          <div>
            <label htmlFor="filter">color filter:</label>
            <input id="filter" name="filter" placeholder="blue" onChange={this.readFilter} />
          </div>
        </section>
      </main>
    );
  }
}

export default App;
