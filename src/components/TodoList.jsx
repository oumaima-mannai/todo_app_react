import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list--empty">
        <span className="empty-icon">📋</span>
        <p>Aucune tâche à afficher</p>
      </div>
    )
  }

  return (
    <ul className="todo-list" id="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
