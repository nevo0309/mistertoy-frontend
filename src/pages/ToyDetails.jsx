import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.remote.js'
import { PopUp } from '../cmps/PopUp.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
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

      <section>
        <PopUp
          header={<h3>Chat About {toy.name}s</h3>}
          footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
          onClose={() => setIsChatOpen(false)}
          isOpen={isChatOpen}
        >
          <Chat />
        </PopUp>
      </section>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="open-chat">
          Chat
        </button>
      )}
    </section>
  )
}
