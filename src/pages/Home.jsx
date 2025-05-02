import { Link } from 'react-router-dom'

export function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Welcome to Luxe Toys</h1>
        <p>
          Discover a world of high-quality, beautifully designed toys that spark imagination and
          joy.
        </p>
        <Link to="/toy" className="home-btn">
          Start Buying Now
        </Link>
      </div>
    </section>
  )
}
