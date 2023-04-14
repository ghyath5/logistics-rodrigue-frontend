import useTypedReducer from "../useTypedReducer";

const getInitialElementState = () => ({
  translate: { x: 0, y: 0 },
  initial: { x: 0, y: 0 },
  last: { x: 0, y: 0 },
});

export const initialState = { dragging: false };

const reducer = {
  start: (id, coordinate, index, single) => (state) => {
    return {
      dragging: true,
      elements: {
        ...getInitialElementState(),
        id,
        index,
        initial: coordinate,
        selected: true,
      },
      ...(single ? { id } : {}),
    };
  },
  move: (id, coordinate) => (state) => {
    const elements = state.elements;
    if (!state.elements) {
      return state;
    }

    return {
      ...state,
      elements: {
        ...elements,
        translate: {
          x: elements.last.x + coordinate.x - elements.initial.x,
          y: elements.last.y + coordinate.y - elements.initial.y,
        },
      },
    };
  },
  stop: (id, index) => (state) => {
    const elements = state.elements;
    if (!state.elements) {
      return state;
    }

    return {
      elements: { ...elements, last: elements.translate, index },
      dragging: false,
    };
  },

  clear: () => () => initialState,
};

const useStore = () => {
  return useTypedReducer(reducer, { ...initialState });
};

export default useStore;
