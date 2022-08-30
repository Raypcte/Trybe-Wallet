import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    botao: true,
  };

  digitar = (event) => {
    const valor = event.target.value;
    console.log(valor);
    this.setState({
      [event.target.id]: valor,
    }, () => {
      const { email, senha } = this.state;

      // peguei desse link : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
      const regex = /\S+@\S+\.\S+/;
      console.log(regex.test(valor));
      const numero = 6;

      const validaCampos = regex.test(email) && senha.length >= numero;
      this.setState({
        botao: !validaCampos,
      });
    });
  };

  redirecionar = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { botao, email, senha } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            type="email"
            id="email"
            value={ email }
            onChange={ this.digitar }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid="password-input"
            type="password"
            id="senha"
            value={ senha }
            onChange={ this.digitar }
          />
        </label>

        <button type="button" disabled={ botao } onClick={ this.redirecionar }>
          Entrar
        </button>

      </div>
    );
  }
}

export default connect()(Login);
