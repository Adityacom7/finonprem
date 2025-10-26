import React, { useState } from 'react'

const Authorization = () => {
  const [authData, setAuthData] = useState({
    username: '',
    password: ''
  })
  const [authResult, setAuthResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData)
      })
      
      const data = await response.json()
      setAuthResult(data)
    } catch (error) {
      setAuthResult({ success: false, error: 'Login failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>Authorization Service</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={authData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={authData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Authorizing...' : 'Login'}
          </button>
        </form>

        {authResult && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '4px',
            backgroundColor: authResult.success ? '#d4edda' : '#f8d7da',
            color: authResult.success ? '#155724' : '#721c24',
            border: `1px solid ${authResult.success ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {authResult.success 
              ? `Login successful! Welcome ${authResult.user.username}`
              : `Login failed: ${authResult.error}`
            }
            {authResult.token && (
              <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Token: <strong>{authResult.token}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Authorization