import * as React from "react";

const useTypedReducer = (actions, initialState, log) => {
  const reducer = (s, action) => {
    if (!actions[action.type]) {
      throw new Error();
    }

    return actions[action.type](...action.payload)(s);
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const newActions = {};
  Object.keys(actions).forEach((actionName) => {
    newActions[actionName] = (...payload) => {
      dispatch({ type: actionName, payload });
    };
  });

  return [state, newActions];
};

export default useTypedReducer;
