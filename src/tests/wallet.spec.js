import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('carteira', () => {
  it('dentro da carteira', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockData,
      }));

    const { store } = renderWithRouterAndRedux(<App />, {
      initialState: {
        user: {
          email: 'rayane.valak@gmail.com',
        },
      },
      initialEntries: ['/carteira'],
    });
    console.log(store.getState());

    const email = await screen.findByRole('heading');

    expect(email).toBeInTheDocument();

    const numero = screen.getByText(/0\.00/i);
    expect(numero).toBeInTheDocument();

    const tipoMoeda = screen.getByText(/brl/i);
    expect(tipoMoeda).toBeInTheDocument();

    const valorDespesa = screen.getByRole('textbox', {
      name: /valor da despesa/i,
    });
    expect(valorDespesa).toBeInTheDocument();
    userEvent.type(valorDespesa, '1');

    expect(valorDespesa).toHaveValue('1');

    const descricao = screen.getByRole('textbox', { name: /descrição/i });
    expect(descricao).toBeInTheDocument();
    userEvent.type(descricao, 'bola');

    expect(descricao).toHaveValue('bola');

    const escolhaMoeda = screen.getByRole('combobox', { name: /escolha sua moeda/i });
    expect(escolhaMoeda).toBeInTheDocument();
    userEvent.selectOptions(escolhaMoeda, 'CAD');

    expect(escolhaMoeda).toHaveValue('CAD');

    const pagamento = 'Cartão de débito';
    const formaDePagamento = screen.getByRole('combobox', { name: /opção de pagamento/i });
    expect(formaDePagamento).toBeInTheDocument();
    userEvent.selectOptions(formaDePagamento, pagamento);

    expect(formaDePagamento).toHaveValue(pagamento);

    const opcaoDespesa = screen.getByRole('combobox', { name: /opção de despesa/i });
    expect(opcaoDespesa).toBeInTheDocument();
    userEvent.selectOptions(opcaoDespesa, 'Lazer');

    expect(opcaoDespesa).toHaveValue('Lazer');

    const botao = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(botao);
    expect(botao).toBeInTheDocument();

    await waitFor(() => expect(store.getState().wallet.expenses).toEqual([
      {
        value: '1',
        description: 'bola',
        currency: 'CAD',
        method: 'Cartão de débito',
        tag: 'Lazer',
        id: 0,
        exchangeRates: mockData,
      },
    ]));
    const converterMoeda = screen.getByText(/3\.76/i);

    expect(converterMoeda).toBeInTheDocument();
  });
});
