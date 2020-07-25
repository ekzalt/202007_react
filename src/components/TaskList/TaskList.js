import React from 'react';

import { TaskElement } from '../index';

const TaskList = ({ tasks = [], filter = '' }) => {
  const elements = tasks
    .filter(({ text }) => (filter ? text.match(filter) : text))
    .map(({ id, text }) => <TaskElement key={id} text={text} />);

  return (
    <>
      <p>tasks: {tasks.length}</p>
      <ul>{elements}</ul>
    </>
  );
};

export default TaskList;
