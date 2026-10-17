import { useState } from 'react'

function TodoForm({ onAdd, inputRef }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="todo-form__input"
        placeholder="Nouvelle tâche..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="todo-input"
        autoFocus
      />
      <button type="submit" className="todo-form__button" id="todo-add-btn">
        Ajouter
      </button>
    </form>
  )
}

export default TodoForm
