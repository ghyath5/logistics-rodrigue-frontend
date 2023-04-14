export const getPositionIndex = (pos, ROW_SIZE) => {
  const col = pos % ROW_SIZE;
  const row = Math.floor(pos / ROW_SIZE);

  return { row, col };
};

export const getPosition = ({ row, col }) => {
  return {
    x: col * 200,
    y: row * 140,
  };
};

export const getIndex = (apps, ROW_SIZE) => {
  let position = 0;
  let currentRowSize = ROW_SIZE;

  return apps.map((a) => {
    let tempPosition = 0;
    if (currentRowSize < a.width) {
      position += currentRowSize;
      currentRowSize = ROW_SIZE;
    }
    tempPosition = position;
    position += a.width;
    currentRowSize -= a.width;

    return { ...a, position: tempPosition };
  });
};

export const animate = (ROW_SIZE, order, oldOrder, x, y, current, active) => {
  // let rowPosition = 0;
  // let currentRowSize = ROW_SIZE;
  return (index) => {
    // console.log(order, oldOrder);
    // const width = (oldOrder || order)[index].width;

    // if (currentRowSize < width) {
    //   rowPosition = 0;
    //   currentRowSize = ROW_SIZE;
    // }
    // console.log(index, width, rowPosition);

    if (current === index && active) {
      const z = getPosition({
        ...getPositionIndex(
          (oldOrder || order).find((a) => a.index === current).position,
          ROW_SIZE
        ),
        // rowPosition
      });
      // rowPosition++;
      // currentRowSize -= width;
      // console.log(z);
      return {
        x: (x || 0) + z.x,
        y: (y || 0) + z.y,
        scale: 1.1,
        zIndex: 10,
        immediate: (n) =>
          n === "y" || n === "zIndex" || n === "x" || n === "background",
      };
    }

    const z2 = getPosition({
      ...getPositionIndex(
        order.find((a) => a.index === index).position,
        ROW_SIZE
      ),
      // rowPosition
    });
    // console.log(z2);
    // rowPosition++;
    // currentRowSize -= width;
    return {
      ...z2,
      zIndex: 1,
      scale: 1,
      background: "transparent",
    };
  };
};

export const getPositionToIndexMapping = (order, rowSize) => {
  const map = {};
  let iter = 0;
  let availableRowSize = rowSize;
  order.forEach((o, i) => {
    if (availableRowSize < o.width) {
      for (let j = 0; j < availableRowSize; j++) {
        map[iter] = -1;
        iter++;
      }
      availableRowSize = rowSize;
    }
    for (let j = 0; j < o.width; j++) {
      map[iter] = i;
      iter++;
      availableRowSize--;
    }
  });

  return map;
};
