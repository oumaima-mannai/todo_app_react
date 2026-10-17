import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete }) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleDelete = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onDelete(todo.id)
    }, 280)
  }

  return (
    <li
      className={`todo-item ${isRemoving ? 'todo-item--removing' : ''}`}
      id={`todo-${todo.id}`}
    >
      <label className="todo-item__checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Marquer "${todo.text}" comme ${todo.completed ? 'non terminée' : 'terminée'}`}
        />
        <span className="checkmark"></span>
      </label>

      <span
        className={`todo-item__text ${
          todo.completed ? 'todo-item__text--done' : ''
        }`}
      >
        {todo.text}
      </span>

      <button
        className="todo-item__delete"
        onClick={handleDelete}
        aria-label={`Supprimer "${todo.text}"`}
      >
        Supprimer
      </button>
    </li>
  )
}

export default TodoItem
