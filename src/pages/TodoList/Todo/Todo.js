import React from 'react';
import './Todo.scss';

const Todo = ({ title, content }) => {
  return (
    <div className="todo">
      <div className="titleWrapper">
        <h2 className="todoTitle">{title}</h2>
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div className="todoContent">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Todo;
