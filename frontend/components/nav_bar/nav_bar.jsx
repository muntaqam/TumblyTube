import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ currentUser, logout }) => {
  return (
    <div className="navbar">
      <section className="navbar__session__btn">
        {currentUser ? (
          <div>
            <h3>Hello, {currentUser.username}</h3>
            <button
              className="navbar__session__btn navbar__session__btn--logout"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="navbar__session__btn navbar__session__btn--login"
            >
              Sign in
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default NavBar;
