import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service.js'
import { toyLabels } from '../services/toy.service.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedSetFilter = useRef(utilService.debounce(onSetFilterBy, 300))
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false)

  //   console.log(filterByToEdit, 'filter by to edit')

  useEffect(() => {
    debouncedSetFilter.current(filterByToEdit)
    // console.log('useEffect updated', filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    console.log('filter changed')
  }
  function handleLabelCheckbox({ target }) {
    const { checked, value } = target

    setFilterByToEdit(prev => {
      const labels = prev.labels || []
      const newLabels = checked ? [...labels, value] : labels.filter(label => label !== value)

      return { ...prev, labels: newLabels }
    })
  }

  return (
    <section className="toy-filter">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="By name"
          value={filterByToEdit.name || ''}
          onChange={handleChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="maxPrice"
          name="price"
          placeholder="By max price"
          value={filterByToEdit.price || ''}
          onChange={handleChange}
        />
        <label htmlFor="inStock">Stock Status:</label>
        <select name="inStock" value={filterByToEdit.inStock || ''} onChange={handleChange}>
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Not in stock</option>
        </select>

        {/* label filter */}
        <div className="label-dropdown">
          <div className="dropdown-toggle" onClick={() => setIsLabelDropdownOpen(prev => !prev)}>
            <span>Labels</span>
            <span>{isLabelDropdownOpen ? '▲' : '▼'}</span>
          </div>

          {isLabelDropdownOpen && (
            <div className="dropdown-content">
              {toyLabels.map(label => (
                <label key={label}>
                  <input
                    type="checkbox"
                    value={label}
                    checked={filterByToEdit.labels?.includes(label) || false}
                    onChange={handleLabelCheckbox}
                  />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
