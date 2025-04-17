import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { saveToy } from '../store/toy/toyAction'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyLabels } from '../services/toy.service.js'

export function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(toy => setToyToEdit(toy))
      .catch(err => {
        console.log('Had issues in toy edit', err)
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    if (type === 'number') {
      value = value === '' ? '' : +value
    }
    setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
  }
  function handleLabelCheckboxChange({ target }) {
    const { value, checked } = target
    setToyToEdit(prevToy => {
      const labels = checked
        ? [...prevToy.labels, value]
        : prevToy.labels.filter(label => label !== value)

      return { ...prevToy, labels }
    })
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    if (!toyToEdit.name || toyToEdit.price === '' || isNaN(toyToEdit.price)) {
      showErrorMsg('Please fill in all fields correctly')
      return
    }
    saveToy(toyToEdit)
      .then(() => {
        showSuccessMsg('Toy Saved!')
        navigate('/toy')
      })
      .catch(err => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Had issues in toy details')
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={toyToEdit.name}
          name="name"
          id="name"
          placeholder="Enter brand..."
          onChange={handleChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          value={toyToEdit.price}
          name="price"
          id="price"
          placeholder="Ender price..."
          onChange={handleChange}
        />

        <label>Labels:</label>
        <div className="labels-checkboxes">
          {toyLabels.map(label => (
            <label key={label}>
              <input
                id="labels"
                type="checkbox"
                name="labels"
                value={label}
                checked={toyToEdit.labels.includes(label)}
                onChange={handleLabelCheckboxChange}
              />
              {label}
            </label>
          ))}
        </div>

        <div className="btn-group">
          <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
          <Link to="/toy">Cancel</Link>
        </div>
      </form>
    </section>
  )
}
