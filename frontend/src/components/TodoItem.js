import React from 'react'

const TodoItem = ({todo, handleTodoUpdate, handleTodoDelete}) => {
  return (
    <li className={`todo ${todo.completed ? "completed" : ""}`}>
      <p className="todo__description">{todo.task}</p>
      <div className="todo__controls">
        <label className="todo__custom-checkbox" htmlFor={`is-complete-${todo.id}`}>
          <input type="checkbox" name="isComplete" id={`is-complete-${todo.id}`} defaultChecked={todo.completed} onChange={() => handleTodoUpdate(todo)} />
          <span><i className="fas fa-check"></i></span>
        </label>
        <label className="todo__custom-checkbox" htmlFor={`delete-todo-${todo.id}`}>
          <input type="checkbox" name="delete" id={`delete-todo-${todo.id}`} onChange={() => handleTodoDelete(todo)} />
          <span className="delete"><i className="fas fa-trash-alt"></i></span>
        </label>
      </div>
    </li>
  )
}

export default TodoItem
