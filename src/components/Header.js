import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  soma = () => {
    const { despesa } = this.props;
    let soma = 0;
    despesa.forEach((item) => {
      soma += item.value * item.exchangeRates[item.currency].ask;
    });
    return soma.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{email}</h2>
        <p data-testid="total-field">{this.soma()}</p>
        <p data-testid="header-currency-field">BRL</p>

      </div>
    );
  }
}

Header.propTypes = ({
  email: propTypes.string.isRequired,
  despesa: propTypes.arrayOf(propTypes.shape({})).isRequired,
});

const mapStateToProps = (estado) => ({
  email: estado.user.email,
  despesa: estado.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
