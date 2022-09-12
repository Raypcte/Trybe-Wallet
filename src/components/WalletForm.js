import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { pegarMoedas, adicionarDespesa } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pegarMoedas());
  }

  adicionar = async () => {
    const { dispatch } = this.props;
    const moedinha = await dispatch(pegarMoedas());
    // console.log(moedinha);
    this.setState({
      exchangeRates: moedinha,
    }, async () => {
      const { id } = this.state;
      await dispatch(adicionarDespesa(this.state));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        id: id + 1,
      });
    });
  };

  atualiza = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { moedas } = this.props;
    return (
      <div>
        <label htmlFor="value">
          valor da despesa
          <input
            onChange={ this.atualiza }
            data-testid="value-input"
            type="text"
            id="value"
            value={ value }
          />
        </label>

        <label htmlFor="description">
          descrição
          <input
            onChange={ this.atualiza }
            data-testid="description-input"
            type="text"
            id="description"
            value={ description }
          />
        </label>

        <label htmlFor="currency">
          Escolha sua moeda
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ this.atualiza }
            value={ currency }
          >
            {moedas.map((moeda) => (
              <option key={ moeda } value={ moeda }>{moeda}</option>
            ))}

          </select>
        </label>

        <label htmlFor="method">
          Opção de pagamento
          <select
            data-testid="method-input"
            id="method"
            onChange={ this.atualiza }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Opção de Despesa
          <select
            data-testid="tag-input"
            onChange={ this.atualiza }
            id="tag"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="button" onClick={ this.adicionar }>
          Adicionar despesa
        </button>

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
