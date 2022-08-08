import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [authType, setAuthType] = useState('로그인');
  const [inputValue, setInputValue] = useState({ id: '', password: '' });

  const navigate = useNavigate();

  const handleCheckInput = event => {
    const {
      target: { name, value },
    } = event;
    setInputValue({ ...inputValue, [name]: value });
  };
  const { id, password } = inputValue;

  const isIdValid = id.includes('@') & id.includes('.');
  const isPasswordValid = password.length > 8;
  const isInputValid = isIdValid && isPasswordValid;

  const goToMain = event => {
    event.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: id,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('TOKEN', data.token);
          alert(data.message);
          navigate('/todos');
        } else {
          alert('로그인 실패');
        }
      });
  };

  const goToSignUp = event => {
    event.preventDefault();
    fetch('/users/create', {
      method: 'POST',
      body: JSON.stringify({
        email: id,
        password: password,
      })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem('TOKEN', data.token);
            alert(data.message);
            navigate('/todos');
          } else {
            alert('회원가입 실패');
            navigate('/auth');
          }
        }),
    });
  };

  const selectAuthType = {
    로그인: goToMain,
    회원가입: goToSignUp,
  };

  return (
    <div className="login">
      <article className="loginContainer">
        <h1 className="title">wanted</h1>
        <div className="subTitleBox">
          <h2
            className={`subTitle ${authType === '회원가입' ? 'selected' : ''}`}
            onClick={() => setAuthType('회원가입')}
          >
            회원가입
          </h2>
          <h2
            className={`subTitle ${authType === '로그인' ? 'selected' : ''}`}
            onClick={() => setAuthType('로그인')}
          >
            로그인
          </h2>
        </div>
        <form className="formWrapper" onChange={handleCheckInput}>
          <input
            className="authInput"
            placeholder="id를 입력해주세요"
            name="id"
          />
          <input
            className="authInput"
            placeholder="비밀번호를 입력해주세요"
            name="password"
          />
          <button
            className={`authButton ${isInputValid ? 'active' : ''}`}
            disabled={!isInputValid}
            onClick={selectAuthType[authType]}
          >
            {authType}
          </button>
        </form>
      </article>
    </div>
  );
};

export default Login;
