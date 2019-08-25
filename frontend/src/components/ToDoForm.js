import React, { useState } from 'react'

const ToDoForm = ({handleSubmit}) => {
  const [newTodo, setNewTodo] = useState("")

  const handleChange = (e) => {
    const value = e.target.value;
    setNewTodo(value);
  }

  return (
    <form className="todos__form" onSubmit={(e) => handleSubmit(e, newTodo)}>
      <div className="todos__form-input">
        <input type="text" name="new-todo" value={newTodo} onChange={handleChange}/>
        <label htmlFor="new-todo">Add new todo</label>
      </div>
      <button type="submit" className="todos__form-btn">+</button>
    </form>
  )
}

export default ToDoForm
