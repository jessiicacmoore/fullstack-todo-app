import React from 'react'
import axios from 'axios';

const TodoItem = ({todo}) => {
  const handleChange = () => {
    
  }

  return (
    <li className="todos__list-item">
      <p className="todo-description">{todo.task}</p>
      <input type="checkbox" name="completed" id="todo-is-complete" defaultChecked={todo.completed} />
    </li>
  )
}

export default TodoItem
