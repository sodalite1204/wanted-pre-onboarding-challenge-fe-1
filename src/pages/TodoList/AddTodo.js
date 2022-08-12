import React, { useState } from 'react';
import './AddTodo.scss';

const AddTodo = () => {
  const token = localStorage.getItem('TOKEN') || '';
  const [todo, setTodo] = useState({ title: '', content: '' });

  const { title, content } = todo;

  const handleInput = event => {
    const {
      target: { name, value },
    } = event;
    setTodo({ ...todo, [name]: value });
  };

  const postTodo = event => {
    event.preventDefault();
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.details) {
          alert('에러가 발생했습니다. 다시 시작해주세요!');
        }
      });
  };

  return (
    <div className="addTodo">
      <div className="titleWrapper">
        <form className="todoForm" onChange={handleInput}>
          <input
            className="addTodoTitle"
            type="text"
            placeholder="타이틀을 입력하세요"
            name="title"
          />
          <textarea name="content" />
          <button onClick={postTodo}>추가</button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
