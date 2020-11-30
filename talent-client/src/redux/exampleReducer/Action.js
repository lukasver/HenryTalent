export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

//======================================================================
//Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR
//======================================================================

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};
