import React, {useState} from 'react'

const TodoForm = ({handleNewTodo}) => {
  const [newTodo, setNewTodo] = useState("");
  const handleInputChange = (e) => setNewTodo(e.target.value);

  return (
    <form className="todos__form" onSubmit={(e) => handleNewTodo(e, newTodo)} >
      <label htmlFor="new-todo">
        <input
          type="text"
          name="todo"
          id="new-todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <span>New Todo</span>
      </label>
      <button type="submit">+</button>
    </form>
  );
}

export default TodoForm
