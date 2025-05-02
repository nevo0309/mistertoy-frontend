import { Map } from '../cmps/Map.jsx'
import { toyService } from '../services/toy.service.remote.js'
import { useEffect, useState } from 'react'

export function About() {
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    toyService
      .getGoogleApi()
      .then(apiKey => {
        setApiKey(apiKey)
        if (apiKey) console.log('API key loaded successfully')
      })
      .catch(err => {
        console.error('Failed to load API key', err)
      })
  }, [])

  if (!apiKey) return <div className="about-loading">Loading..</div>

  return (
    <section className="about-layout">
      <div className="about-text">
        <h1>About Luxe Toys</h1>
        <p>
          Luxe Toys brings premium-quality, imaginative playthings to children of all ages. With
          stores in several major cities across Israel, we are proud to combine play and elegance.
        </p>
        <p>
          Visit any of our branches below to explore a world of joy and wonder. Use the interactive
          map to find the branch closest to you!
        </p>
      </div>

      <Map apiKey={apiKey} />
    </section>
  )
}
