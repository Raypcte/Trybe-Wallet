import { SALVAR_MOEDAS, ADICIONAR_DESPESA } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALVAR_MOEDAS:
    return {
      ...state,
      currencies: Object.keys(action.moedas)
        .filter((moeda) => moeda !== 'USDT'),
    };
  case ADICIONAR_DESPESA:
    return {
      ...state,
      expenses: [...state.expenses, action.despesa],
    };

  default:
    return state;
  }
};

export default walletReducer;
