import React, { useEffect, useState } from 'react';
import Todo from './Todo/Todo';
import './TodoList.scss';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('/data.json', { method: 'GET' })
      .then(response => response.json())
      .then(({ data }) => setTodos(data));
  }, []);

  console.log(todos);
  return (
    <div className="todoList">
      {todos &&
        todos.map(({ id, title, content }) => (
          <Todo key={id} title={title} content={content} />
        ))}
    </div>
  );
};

export default TodoList;
