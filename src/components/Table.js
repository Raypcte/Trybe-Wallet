import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends Component {
  render() {
    const { despesas } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            despesas.length && despesas.map((despesa) => (
              <tr key={ despesa.id }>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>{despesa.value}</td>
                <td>
                  {Math.round(
                    +(despesa.exchangeRates[despesa.currency].ask) * 100,
                  ) / 100}
                </td>
                <td>
                  {(+despesa.exchangeRates[despesa.currency].ask
                  * +despesa.value).toFixed(2)}
                </td>
                <td>{despesa.currency}</td>
                <td>{}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  despesas: propTypes.arrayOf(propTypes.shape({})).isRequired,
};

const mapStateToProps = (global) => ({
  despesas: global.wallet.expenses,
});
export default connect(mapStateToProps)(Table);
