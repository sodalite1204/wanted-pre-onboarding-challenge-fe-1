import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div className="login">
      <article className="loginContainer">
        <h1 className="title">wanted</h1>
        <div className="subTitleBox">
          <h2 className="subTitle">회원가입</h2>
          <h2 className="subTitle">로그인</h2>
        </div>
        <form className="formWrapper">
          <input className="authInput" />
          <input className="authInput" />
          <button className="authButton">로그인</button>
        </form>
      </article>
    </div>
  );
};

export default Login;
