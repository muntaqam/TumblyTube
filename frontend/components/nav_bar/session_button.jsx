import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { avatarFromInitials } from "../../util/avatar_util";
import AccountCircle from "@material-ui/icons/AccountCircle";

class SessionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
    };
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { currentUser } = this.props;
    const { showDropDown } = this.state;
    let display;

    if (currentUser) {
      display = (
        <div className='navbar__session'>
          <img
            className='navbar__session__avatar'
            src={avatarFromInitials(currentUser, 32)}
            alt='avatar'
            onClick={() => this.setState({ showDropDown: !showDropDown })}
          />
          {showDropDown && (
            <div className='navbar__session__dd'>
              <div className='navbar__session__dd__user'>
                <img
                  src={avatarFromInitials(currentUser, 50)}
                  alt='avatar'
                  className='navbar__session__avatar navbar__session__avatar--dd'
                />
                <div className='navbar__session__dd__info'>
                  <div className='navbar__session__dd__info__name'>
                    {currentUser.username}
                  </div>
                  <div className='navbar__session__dd__info__email'>
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <div
                className='navbar__session__dd__signout'
                onClick={this.handleLogout.bind(this)}
              >
                <ExitToAppIcon
                  id='signout-button'
                  className='navbar__icon navbar__icon--signout'
                />
                <div className='navbar__session__dd__signout-text'>
                  Sign out
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      display = (
        <Link to='/login' className='navbar__session__login'>
          <AccountCircle id='signin-button' />
          <div className='navbar__session__login__text'>SIGN IN</div>
        </Link>
      );
    }

    return display;
  }
}

export default SessionButton;
