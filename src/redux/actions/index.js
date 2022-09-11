// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const SALVAR_MOEDAS = 'SALVAR_MOEDAS';
export const ADICIONAR_DESPESA = 'ADICIONAR_DESPESA';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

const salvarMoedas = (moedas) => ({
  type: SALVAR_MOEDAS,
  moedas,
});

export const pegarMoedas = () => (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endPoint)
    .then((resposta) => resposta.json())
    .then((moedas) => {
      dispatch(salvarMoedas(moedas));
      return moedas;
    });
};

export const adicionarDespesa = (despesa) => ({
  type: ADICIONAR_DESPESA,
  despesa,
});
