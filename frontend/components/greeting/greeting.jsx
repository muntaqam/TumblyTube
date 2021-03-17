import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {

  const welcome = () => {
    return (
      <div className="header-group">
        <h2 className="header-name">Welcome, {currentUser.username}!</h2>
        <button className="header-btn" onClick={logout}>Log out</button>
      </div>
    );
  };
  const requireLoggedin = () => {
    return (
      <div className="requireLoggedin-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  };

  return currentUser ? welcome() : requireLoggedin();
};

export default Greeting;