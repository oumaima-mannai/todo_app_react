const FILTERS = [
  { key: 'all', label: 'Toutes' },
  { key: 'active', label: 'Actives' },
  { key: 'completed', label: 'Terminées' },
]

function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filtrer les tâches">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-bar__button ${
            filter === key ? 'filter-bar__button--active' : ''
          }`}
          onClick={() => onFilterChange(key)}
          id={`filter-${key}`}
          aria-pressed={filter === key}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
