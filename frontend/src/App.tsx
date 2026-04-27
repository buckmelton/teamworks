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
  const [selectedType, setSelectedType] = useState<string>('all')
  const [nameQuery, setNameQuery] = useState<string>('')
  const normalizedNameQuery = nameQuery.trim().toLowerCase()

  const typeOptions = ['all', ...new Set(pokemon.flatMap((item) => item.types))].sort(
    (a, b) => {
      if (a === 'all') return -1
      if (b === 'all') return 1
      return a.localeCompare(b)
    },
  )

  const filteredPokemon = pokemon.filter((item) => {
    const matchesType =
      selectedType === 'all' || item.types.includes(selectedType)
    const matchesName =
      normalizedNameQuery === '' ||
      item.name.toLowerCase().includes(normalizedNameQuery)

    return matchesType && matchesName
  })

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
        <>
          <label htmlFor="type-filter">
            Filter by type:{' '}
            <select
              id="type-filter"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="name-filter">
            Filter by name:{' '}
            <input
              id="name-filter"
              type="text"
              value={nameQuery}
              onChange={(event) => setNameQuery(event.target.value)}
              placeholder="e.g. char"
            />
          </label>
          <section className="pokemon-grid">
            {filteredPokemon.map((item) => (
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
        </>
      )}
    </main>
  )
}

export default App
