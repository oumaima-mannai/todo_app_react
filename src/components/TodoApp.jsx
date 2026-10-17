import { useReducer, useState, useMemo, useRef, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import TodoForm from './TodoForm'
import FilterBar from './FilterBar'
import TodoList from './TodoList'

const ACTIONS = {
  ADD: 'add',
  TOGGLE: 'toggle',
  DELETE: 'delete',
  SET: 'set',
}

function todosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        },
      ]
    case ACTIONS.TOGGLE:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    case ACTIONS.DELETE:
      return state.filter((todo) => todo.id !== action.payload.id)
    case ACTIONS.SET:
      return action.payload
    default:
      return state
  }
}

function TodoApp() {
  const [savedTodos, setSavedTodos] = useLocalStorage('todos', [])

  const [todos, dispatch] = useReducer(todosReducer, savedTodos)

  const [filter, setFilter] = useState('all')

  const inputRef = useRef(null)

  useEffect(() => {
    setSavedTodos(todos)
  }, [todos, setSavedTodos])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const remainingCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length
  }, [todos])

  const handleAdd = (text) => {
    dispatch({ type: ACTIONS.ADD, payload: { text } })
    inputRef.current?.focus()
  }

  const handleToggle = (id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id } })
  }

  const handleDelete = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: { id } })
  }

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Mes tâches</h1>

      <TodoForm onAdd={handleAdd} inputRef={inputRef} />

      <FilterBar filter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <div className="todo-footer">
        {remainingCount} tâche{remainingCount !== 1 ? 's' : ''} restante{remainingCount !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default TodoApp
