import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class SessionButton extends React.Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { currentUser, logout } = this.props;
    let display;
    if (currentUser) {
      display = (
        <div className="navbar__session">
          <button className="navbar__session__avatar">
            {currentUser.username[0].toUpperCase()}
          </button>
          <div className="navbar__session__dd">
            <div className="navbar__session__dd__user">
              <div className="navbar__session__avatar navbar__session__avatar--dd">
                {currentUser.username[0].toUpperCase()}
              </div>
              <div className="navbar__session__dd__info">
                <div className="navbar__session__dd__info__name">
                  {currentUser.username}
                </div>
                <div className="navbar__session__dd__info__email">
                  {currentUser.email}
                </div>
              </div>
            </div>
            <div
              className="navbar__session__dd__signout"
              onClick={this.handleLogout.bind(this)}
            >
              <ExitToAppIcon
                id="signout-button"
                className="navbar__icon navbar__icon--signout"
              />
              <div className="navbar__session__dd__signout-text">Sign out</div>
            </div>
          </div>
        </div>
      );
    } else {
      display = (
        <Link to="/login" className="navbar__session__login">
          <AccountCircleIcon
            id="signin-button"
            className="navbar__icon navbar__icon--signin"
          />
          <div className="navbar__session__login__text">SIGN IN</div>
        </Link>
      );
    }
    return display;
  }
}

export default SessionButton;
