import React from 'react';

import { TaskList } from '../index';
import './App.css';

class App extends React.Component {
  state = {
    clicks: 0,
    tasks: [],
    filter: '',
  };

  increment = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };

  decrement = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };

  addTask = () => {
    const id = Math.round(Math.random() * 100_000_000_000_000);
    const task = { id, text: `task ${id}` };

    this.setState({ tasks: [...this.state.tasks, task] });
  };

  deleteTask = () => {
    this.setState({ tasks: this.state.tasks.slice(0, -1) });
  };

  readFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { clicks, tasks, filter } = this.state;

    return (
      <main>
        <section>
          <p>clicks: {clicks}</p>
          <button onClick={this.increment}>increment</button>
          <button onClick={this.decrement}>decrement</button>
        </section>
        <section>
          <TaskList tasks={tasks} filter={filter} />
          <button onClick={this.addTask}>Add Task</button>
          <button onClick={this.deleteTask}>Delete Task</button>
          <label htmlFor="filter">filter:</label>
          <input id="filter" name="filter" placeholder="123" onChange={this.readFilter} />
        </section>
      </main>
    );
  }
}

export default App;
