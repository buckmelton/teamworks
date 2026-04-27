import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

type Pokemon = {
  id: number
  name: string
  sprite: string | null
  types: string[]
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pokemon`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as Pokemon[]
        setPokemon(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown error while fetching API',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void fetchPokemon()
  }, [])

  return (
    <main className="app">
      <h1>Original 151 Pokemon</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!isLoading && !error && (
        <section className="pokemon-grid">
          {pokemon.map((item) => (
            <article className="pokemon-card" key={item.id}>
              <h2>{item.name}</h2>
              {item.sprite ? (
                <img src={item.sprite} alt={item.name} />
              ) : (
                <div className="sprite-placeholder">No image</div>
              )}
              <p>Types: {item.types.join(', ')}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
