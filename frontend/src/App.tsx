import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/hello`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as { message?: string }
        setMessage(data.message ?? 'No message returned')
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown error while fetching API',
        )
      }
    }

    void fetchHello()
  }, [])

  return (
    <main className="app">
      <h1>Teamworks Fullstack Starter</h1>
      <p>Backend URL: {API_BASE_URL}</p>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <p className="message">API says: {message}</p>
      )}
    </main>
  )
}

export default App
