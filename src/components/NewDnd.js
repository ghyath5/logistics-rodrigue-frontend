import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BtnContained from "./layout/BtnContained";
import axios from "../axios";
import { useLocation, useNavigate } from "react-router-dom";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
  // "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  // "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)"
  // "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)"
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging
    ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    : "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, parts) => ({
  background: isDraggingOver
    ? "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)"
    : "white",
  padding: grid,
  width: 1000 / parts,
  margin: "auto",
});

function NewDnd({ data, wrapperRef }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState([]);
  const [reqError, setReqError] = useState("");

  useEffect(() => {
    if (data && data.length > 30) {
      handleSetState(4);
    } else if (data && data.length > 20) {
      handleSetState(3);
    } else if (data && data.length > 10) {
      handleSetState(2);
    } else {
      setState([data]);
    }
  }, []);

  const handleUpdateRoute = () => {
    let body = [];
    state.map((st) => st.map((itm) => body.push(itm._id.toString())));
    axios
      .put(`/routes/${location.state?.id}`, {
        customers: body,
      })
      .then(() => {
        navigate("/regions");
      })
      .catch((err) => {
        err.response.status === 400 && setReqError(err.response?.data?.error);
      });
  };

  const handleSetState = (parts) => {
    const chunkSize = Math.ceil(data.length / parts);
    const result = [];

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      result.push(chunk);
    }
    setState(result);
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div ref={wrapperRef}>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, state.length)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              textTransform: "capitalize",
                            }}
                            className=" draggedItem fw-bold"
                          >
                            <div className="text-center">
                              <p>{item.firstname + " " + item.lastname}</p>
                              <p>{item.businessname}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <div className="mt-3 mb-1 w-100 d-flex justify-content-center">
        <p className="errorText"> {reqError !== "" && reqError}</p>
      </div>
      <div className="my-3 text-center">
        <BtnContained title={"SAVE REGION"} handleClick={handleUpdateRoute} />
      </div>
    </div>
  );
}
export default NewDnd;
