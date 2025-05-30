import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <ul className="toy-list">
      {toys.map(toy => (
        <li key={toy._id} className="toy-item">
          <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
          <div className="btn-group">
            <button className="buy-btn">Add to Cart 🛒</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
