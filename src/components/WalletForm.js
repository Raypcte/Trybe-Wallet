import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { pegarMoedas } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pegarMoedas());
  }

  render() {
    const { moedas } = this.props;
    return (
      <div>
        <label htmlFor="value">
          valor da despesa
          <input data-testid="value-input" type="text" id="value" />
        </label>

        <label htmlFor="description">
          descrição
          <input data-testid="description-input" type="text" id="description" />
        </label>

        <label htmlFor="moeda">
          Escolha sua moeda
          <select data-testid="currency-input" id="moeda">
            {moedas.map((moeda) => (
              <option key={ moeda } value={ moeda }>{moeda}</option>
            ))}

          </select>
        </label>

        <label htmlFor="pagamento">
          Opção de pagamento
          <select data-testid="method-input" id="pagamento">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="Despesas">
          Opção de Despesa
          <select data-testid="tag-input" id="Despesas">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

      </div>
    );
  }
}
const mapStateToProps = (global) => ({
  moedas: global.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  moedas: propTypes.arrayOf(propTypes.string).isRequired,

};

export default connect(mapStateToProps)(WalletForm);
