import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
  const stock = toy.inStock ? 'In stock' : 'Out of stock'
  const stockClass = toy.inStock ? 'in-stock' : 'no-stock'
  return (
    <article className="toy-preview">
      <h3 className="toy-name">{toy.name}</h3>
      <p className="toy-price">
        Price: <span>{toy.price.toLocaleString()}$</span>
      </p>
      <p className={stockClass}>{stock}</p>

      <div className="toy-labels">
        Labels:
        <div className="labels-container">
          {toy.labels.map(label => (
            <span className="label" key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <hr />

      <div className="action-links">
        <Link className="action-btn" to={`/toy/edit/${toy._id}`}>
          Edit
        </Link>
        <Link className="action-btn" to={`/toy/detail/${toy._id}`}>
          Details
        </Link>
        <button className="action-btn" onClick={() => onRemoveToy(toy._id)}>
          Delete
        </button>
      </div>
    </article>
  )
}
