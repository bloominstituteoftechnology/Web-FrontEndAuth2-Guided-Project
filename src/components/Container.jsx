import React from 'react';
import { Route, NavLink, withRouter, Redirect } from 'react-router-dom';
import Login from './Login';
import Quotes from './Quotes';
import axios from 'axios';
import './Container.less';

export function Container(props) {
  const onLogout = () => {
    localStorage.clear();
    props.history.replace('/login');
  };

  const onLogin = ({ username, password }) => {
    axios.post(
      'http://localhost:5000/login',
      { username, password }
    )
      .then(res => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/');
      })
      .catch(error => {
        localStorage.clear();
        alert(error.response.data.message);
      });
  };

  return (
    <div className='container'>
      <nav>
        <span>
          <NavLink exact to='/'>Quotes</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </span>

        <button onClick={onLogout}>Logout</button>
      </nav>

      <main>
        <Route
          path='/login'
          render={props => <Login {...props} onLogin={onLogin}/>}
        />
        <Route
          exact
          path='/'
          render={props => protectRoute(Quotes, props)}
        />
      </main>
    </div>
  );
}

function protectRoute(Component, props) {
  // Not really secure. Any token would pass the test.
  if (localStorage.getItem('token')) {
    return <Component {...props} />;
  }
  return <Redirect to='/login' />;
}

export default withRouter(Container);
