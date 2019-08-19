import React from 'react'
import { link } from 'fs';

const TodosView = ({user}) => {
  console.log(user)
  return (
    <main>
      <div className="todos">
        <h1>todos</h1>
        <ul className="todos__list">
          
        </ul>
      </div>
    </main>
  )
}

export default TodosView
