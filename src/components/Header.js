import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{email}</h2>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>

      </div>
    );
  }
}

Header.propTypes = ({
  email: propTypes.string.isRequired,
});

const mapStateToProps = (estado) => ({
  email: estado.user.email,
});

export default connect(mapStateToProps)(Header);
