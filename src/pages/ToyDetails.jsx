import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .get(toyId)
      .then(toy => setToy(toy))
      .catch(err => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }

  if (!toy) return <div>Loading...</div>
  const stock = toy.inStock ? 'In stock' : 'Out of stock'
  const stockClass = toy.inStock ? 'in-stock' : 'no-stock'
  return (
    <section className="toy-details">
      <h1>Toy vendor: {toy.name}</h1>
      <h5>Price: {toy.price}$</h5>
      <p className={stockClass}>{stock}</p>

      <p className="toy-desctibe">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore,
        aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo
        veritatis corrupti perspiciatis repellat, enim quibusdam!
      </p>

      <div className="action-links">
        <Link className="action-btn" to={`/toy/edit/${toy._id}`}>
          Edit
        </Link>
        <Link className="action-btn" to="/toy">
          Back
        </Link>
        <Link className="action-btn" to={`/toy/detail/${toy.prevToyId}`}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <Link className="action-btn" to={`/toy/detail/${toy.nextToyId}`}>
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  )
}
