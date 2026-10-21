import { useState, useEffect } from 'react'

const API = 'http://localhost:8000'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  async function fetchUser() {
    try {
      const res = await fetch(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        setError('')
      } else {
        logout()
      }
    } catch (e) {
      setError('Failed to fetch user')
    }
  }

  async function register(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (res.ok) {
        setMessage('Registered! Now login.')
        setPassword('')
      } else {
        const data = await res.json()
        setError(data.detail || 'Registration failed')
      }
    } catch (e) {
      setError('Network error')
    }
  }

  async function login(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    const form = new FormData()
    form.append('username', email)
    form.append('password', password)
    try {
      const res = await fetch(`${API}/token`, {
        method: 'POST',
        body: form
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.access_token)
        setToken(data.access_token)
        setMessage('Logged in!')
      } else {
        setError('Invalid email or password')
      }
    } catch (e) {
      setError('Network error')
    }
  }

  function logout() {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    setMessage('Logged out')
  }

  return (
    <div className="container">
      <h1>React + FastAPI Auth</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <p>User ID: {user.id}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
          <h2>Register / Login</h2>
          <form onSubmit={register}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
          <form onSubmit={login} style={{ marginTop: '1rem' }}>
            <button type="submit">Login</button>
          </form>
        </>
      )}
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
    </div>
  )
}

export default App
