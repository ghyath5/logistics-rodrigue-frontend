import * as React from "react";

import useStore from "./store";
import { isInside } from "../dom";

const useDraggable = ({ wrapperRef, onDragStart, onDragEnd }) => {
  const [store, actions] = useStore();

  const dragging = React.useRef(null);

  const stop = React.useCallback(
    (index) => {
      if (dragging.current) {
        actions.stop(dragging.current, index);
      }
      dragging.current = null;
      dragging.current.index = index;
    },
    [actions]
  );

  const onMouseMove = React.useCallback(
    (event, index) => {
      if (
        wrapperRef.current &&
        !isInside(wrapperRef.current, {
          left: event.clientX,
          top: event.clientY,
        })
      ) {
        // if it reaches either side of end, stop the dragging
        // put the item back
        if (onDragEnd) {
          onDragEnd(event);
        }
        stop(index);
        return;
      }
      if (dragging.current) {
        actions.move([dragging.current], {
          x: event.clientX,
          y: event.clientY,
        });
      }
    },
    [actions, onDragEnd, wrapperRef, stop]
  );

  const onMouseUp = React.useCallback(
    (event, index) => {
      if (onDragEnd) {
        onDragEnd(event, index);
      }
      if (dragging.current) {
        actions.stop([dragging.current]);
      }
    },
    [actions, onDragEnd]
  );

  const onMouseDown = React.useCallback(
    (event, id, index) => {
      const coordinates = { x: event.clientX, y: event.clientY };
      event.stopPropagation();
      if (onDragStart) {
        onDragStart(event);
      }

      dragging.current = id;
      dragging.current = index;
      actions.start(id, coordinates, index, true);
    },
    [actions, onDragStart]
  );

  const clearStore = React.useCallback(() => {
    actions.clear();
    dragging.current = null;
  }, [actions]);

  return {
    store,
    handlers: { onMouseDown, onMouseMove, onMouseUp },
    clearStore,
  };
};

export default useDraggable;
