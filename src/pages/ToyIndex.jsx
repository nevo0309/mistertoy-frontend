// import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate'
// import { toyService } from '../services/toy.service'
import { useSelector } from 'react-redux'
import { loadToys, removeToy } from '../store/toy/toyAction'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { useEffect } from 'react'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)

  useEffect(() => {
    loadToys().catch(err => {
      showErrorMsg('Cannot load cars!', err)
    })
  }, [])

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

  //   useEffectOnUpdate(() => {
  //     loadToys().catch(err => {
  //       showErrorMsg('Cannot load cars!', err)
  //     })
  //   }, [])
  console.log('toys:', toys)
  if (!toys) return 'loading toys...'
  return (
    <section className="toy-index">
      <h1 className="main-title">🧸 Luxe Toy Collection</h1>
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
  )
}
