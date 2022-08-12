import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo/Todo';
import './TodoList.scss';

const TodoList = () => {
  const token = localStorage.getItem('TOKEN') || '';
  const [todos, setTodos] = useState([]);

  const getTodo = () => {
    fetch('http://localhost:8080/todos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
    })
      .then(response => response.json())
      .then(({ data }) => setTodos(data));
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    getTodo();
  }, []);

  return (
    <div className="todoList">
      <AddTodo />
      {todos?.map(({ id, title, content }) => (
        <Todo key={id} title={title} content={content} />
      ))}
    </div>
  );
};

export default TodoList;
