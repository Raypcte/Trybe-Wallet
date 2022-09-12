import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('tela do login', () => {
  it('testar formulario do login', () => {
    renderWithRouterAndRedux(<App />);

    const campoEmail = screen.getByRole('textbox', { name: /e-mail/i });

    expect(campoEmail).toBeInTheDocument();
    userEvent.type(campoEmail, 'alguem@gmail.com');

    expect(campoEmail).toHaveValue('alguem@gmail.com');
  });

  it('campo de senha', () => {
    renderWithRouterAndRedux(<App />);

    const senha = screen.getByLabelText(/senha/i);

    expect(senha).toBeInTheDocument();
    userEvent.type(senha, '123456');

    expect(senha).toHaveValue('123456');
  });

  it('botao de entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const botao = screen.getByRole('button', { name: /entrar/i });

    expect(botao).toBeInTheDocument();

    expect(botao).toBeDisabled();
    const campoEmail = screen.getByRole('textbox', { name: /e-mail/i });

    expect(campoEmail).toBeInTheDocument();
    userEvent.type(campoEmail, 'rayanevalak@gmail.com');

    const senha = screen.getByLabelText(/senha/i);

    expect(senha).toBeInTheDocument();
    userEvent.type(senha, '123456');

    expect(botao).toBeEnabled();

    userEvent.click(botao);
    expect(history.location.pathname).toBe('/carteira');
  });
});
