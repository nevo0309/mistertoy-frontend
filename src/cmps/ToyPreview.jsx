export function ToyPreview({ toy, onRemoveToy }) {
  return (
    <article className="toy-preview">
      <h3 className="toy-name">{toy.name}</h3>
      <p className="toy-price">
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
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
        <button className="action-btn">Edit</button>
        <button className="action-btn">Details</button>
        <button className="action-btn" onClick={() => onRemoveToy(toy._id)}>
          Delete
        </button>
      </div>
    </article>
  )
}
