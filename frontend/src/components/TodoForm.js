import React, {useState} from 'react'

const TodoForm = ({handleNewTodo}) => {
  const [newTodo, setNewTodo] = useState("");
  const handleInputChange = (e) => setNewTodo(e.target.value);

  return (
    <form className="todos__form" onSubmit={(e) => handleNewTodo(e, newTodo)} >
      <label className="todos__form__custom-input" htmlFor="new-todo">
        <input
          type="text"
          name="todo"
          id="new-todo"
          value={newTodo}
          onChange={handleInputChange}
          required
        />
        <span>New Todo</span>
      </label>
      <button className="todos__form__btn btn" type="submit">+</button>
    </form>
  );
}

export default TodoForm
