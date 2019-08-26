import React from 'react'

const TodoItem = ({todo, handleTodoUpdate}) => {
  return (
    <li className="todo">
      <p className="todo__description">{todo.task}</p>
      <input className="todo__checkbox" type="checkbox" name="isComplete" id="is-complete" defaultChecked={todo.completed} onChange={() => handleTodoUpdate(todo)} />
    </li>
  )
}

export default TodoItem
