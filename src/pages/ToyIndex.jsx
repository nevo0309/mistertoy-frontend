// import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate'
// import { toyService } from '../services/toy.service'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadToys, removeToy, setFilterBy } from '../store/toy/toyAction.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const [isFilterShown, setIsFilterShown] = useState(true)

  function toggleFilter() {
    setIsFilterShown(prev => !prev)
  }
  useEffect(() => {
    loadToys().catch(err => {
      showErrorMsg('Cannot load toys!', err)
    })
  }, [])
  console.log('filter by in toy index', filterBy)

  useEffectOnUpdate(() => {
    loadToys().catch(err => {
      showErrorMsg('Cannot load toys!', err)
    })
  }, [filterBy])

  //   useEffect(() => {
  //     loadToys().catch(err => {
  //       showErrorMsg('Cannot load cars!', err)
  //     })
  //   }, [filterBy])
  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        console.log('✅ Toy removed')
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy', err)
      })
  }

  console.log('toys:', toys)
  if (!toys) return 'loading toys...'
  return (
    <section className="toy-index">
      <h1 className="main-title">🧸 Luxe Toy Collection</h1>
      <button className="toggle-filter-btn" onClick={toggleFilter}>
        {isFilterShown ? 'Hide Filter' : 'Show Filter'}
      </button>
      {isFilterShown && <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />}
      <button className="action-btn add-btn">
        <Link to={`/toy/edit/`}>Add new toy</Link>
      </button>
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
  )
}
