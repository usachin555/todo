import { useReducer } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
       return action.payload.trim() !== "" ? [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
        },
      ] : state;
    case "DELETE_TASK":
      return state.filter((d) => d.id !== action.payload);

    case "RESET_TODOS":
      return init(action.payload);

    default:
      return state;
  }
}

function init(initialState) {
  return initialState;
}

const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, initialState, init);
  return (
    <>
      <h4>Todo List {todos.length}</h4>
      Add New Task:
      <input
        type="text"
        onBlur={(e) => dispatch({ type: "ADD_TASK", payload: e.target.value })}
      />
      (to add submit first)
      <input type="submit" />
      <button
        onClick={() => dispatch({ type: "RESET_TODOS", payload: initialState })}
      >
        Reset
      </button>
      <hr></hr>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.name}
          <span>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TASK", payload: todo.id })
              }
            >
              Delete
            </button>
          </span>
        </li>
      ))}
    </>
  );
};

export default Todos;
