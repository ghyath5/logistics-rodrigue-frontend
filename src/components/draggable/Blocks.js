import * as React from "react";
import styled from "styled-components";
import { useSprings, animated } from "@react-spring/web";

import { Stack } from "../../utils/styled";
import AppBlock from "./AppBlock";
import useDraggable from "../../utils/useDraggable";
import { animate, getIndex, getPositionToIndexMapping } from "./utils";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";

const AnimatedWrapper = styled(animated.div)`
  position: absolute;
  border-radius: 4px;
  background: transparent;
  min-width: 200px;
`;

const AppWrapper = styled(Stack)`
  flex-grow: 2;
  overflow: auto;
  flex-wrap: wrap;
  position: relative;
`;

const getColor = (i) => {
  const colors = [
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)",
  ];

  return colors[i % 4];
};

const QucikPick = ({ rowSize, setRowSize, totalBlocks, blocksData }) => {
  const getApps = useCallback(() => {
    const appsZ = blocksData?.map((a, i) => ({
      width: 1,
      position: -1,
      id: a._id,
      name: a.firstname + " " + a._id.toString().slice(-4),
      background: getColor(i),
    }));

    return getIndex(appsZ, rowSize);
  }, [blocksData, rowSize, totalBlocks]);

  const apps = useMemo(getApps, [getApps]);

  const order = useRef(
    apps.map((a, index) => ({
      index,
      id: a.id,
      width: a.width,
      position: a.position,
    }))
  );

  const positionToIndexMap = useRef(
    getPositionToIndexMapping(order.current, rowSize)
  );

  const wrapperRef = useRef(null);
  const [clHeight, setclHeight] = useState(0);
  const startPosition = useRef({ x: 0, y: 0 });
  const draggingIndex = useRef(-1);

  const [springs, setSprings] = useSprings(
    apps.length,
    animate(rowSize, order.current)
  );

  const onDragStart = useCallback((event) => {
    startPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const { store, handlers, clearStore } = useDraggable({
    wrapperRef,
    single: true,
    onDragStart,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setRowSize(Math.floor(wrapperRef.current.clientWidth / 200));
      setclHeight((totalBlocks / rowSize) * 180);
    });
    setRowSize(Math.floor(wrapperRef.current.clientWidth / 200));
    totalBlocks > 5
      ? setclHeight((totalBlocks / rowSize) * 180)
      : setclHeight((5 / rowSize) * 180);
  }, [rowSize]);

  useEffect(() => {
    if (!store?.elements?.id) {
      return;
    }
    const gap = {
      x: store.elements.translate.x,
      y: store.elements.translate.y,
    };

    // draggingIndex.current will contain the current index, where index is intial
    // render index, which might differ in order array
    // so we need position of that element in order array
    const prevIndex = order.current.findIndex(
      (a) => draggingIndex.current === a.index
    );
    const currentElement = order.current[prevIndex];
    const oldPosition = currentElement.position;

    // down-up : 3
    let y = Math.round(gap.y / 130);
    if (Math.abs(y) > 0.5) {
      y = y * rowSize;
    }

    // this might lead to problem.
    const x = Math.round(gap.x / 200) * (gap.x > 0 ? 1 : 1);

    const z = y + x + oldPosition;
    // how much block has moved
    let newPosition = Math.round(z);
    const movement = newPosition - oldPosition > 0 ? "FORWARD" : "BACKWARD";

    let newOrder = [...order.current];

    const changeOrder = (prev, dirtyNewIndex, newPosition, width) => {
      let newI = dirtyNewIndex;
      // only elements with width 1
      // are allowed to attached in empty spaces
      // reason being, allowing everything will
      // complicate the process a lot, but ROI will be very low
      if (dirtyNewIndex === -1 && width === 1) {
        // search in the order where it fits as per the new position

        let i =
          newOrder.findIndex((a) => a.position > newPosition) +
          (movement === "BACKWARD" ? 0 : -1);

        if (i < 0) {
          i = order.current.length - 1;
        }

        const newElementProps = {
          ...newOrder[prev],
          position: newPosition,
        };
        newI = i;
        // remove it from previous index and insert to new index
        newOrder.splice(prev, 1);
        newOrder.splice(newI, 0, newElementProps);
        newOrder = getIndex(newOrder, rowSize);
      } else {
        // remove it from previous index and insert to new index
        newOrder.splice(prev, 1);
        newOrder.splice(newI, 0, { ...order.current[prev] });
        // get latest positions as per there width
        newOrder = getIndex(newOrder, rowSize);
      }
    };

    // if the element has some width, this will same as prevIndex
    let newIndex = positionToIndexMap.current[newPosition];

    if (newPosition < 0) {
      // do nothing
      newIndex = prevIndex;
    } else if (prevIndex !== newIndex) {
      // these are special checks in case of different width
      // check new element width
      // newIndex can't be used directly here
      const newPositionElement =
        order.current[positionToIndexMap.current[newPosition]];
      // if element exist and it has width more than 2
      // if it doesn't "empty space"
      // them move block freely in else case
      if (newPositionElement && newPositionElement.width > 1) {
        if (Math.abs(newPosition - oldPosition) < newPositionElement.width) {
          // do nothing
        } else {
          changeOrder(prevIndex, newIndex, newPosition, currentElement.width);
        }
      } else {
        changeOrder(prevIndex, newIndex, newPosition, currentElement.width);
      }
    }

    setSprings(
      animate(
        rowSize,
        newOrder,
        order.current,
        gap.x,
        gap.y,
        draggingIndex.current,
        store.dragging
      )
    );
    if (!store.dragging) {
      clearStore();
      order.current = newOrder;
      positionToIndexMap.current = getPositionToIndexMapping(
        order.current,
        rowSize
      );
    }
  }, [store, clearStore, setSprings, rowSize]);

  return (
    <Stack style={{ height: clHeight }} fullHeight flexDirection="column">
      <AppWrapper ref={wrapperRef}>
        {springs.map((props, i) => {
          const dragId = apps[i].id;
          return (
            <AnimatedWrapper key={i} style={props}>
              <AppBlock
                {...handlers}
                onMouseDown={(event) => {
                  draggingIndex.current = i;
                  handlers.onMouseDown(event, dragId, i);
                }}
                style={{
                  width: 200 * apps[i].width - 8,
                  height: 130,
                  background: apps[i].background,
                }}
                name={apps[i].name}
              />
            </AnimatedWrapper>
          );
        })}
      </AppWrapper>
    </Stack>
  );
};

export default QucikPick;
