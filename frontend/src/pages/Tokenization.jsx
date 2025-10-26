import React, { useState } from 'react'

const Tokenization = () => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/token/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData)
      })
      
      const data = await response.json()
      setToken(data.token)
    } catch (error) {
      console.error('Tokenization failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>Tokenization Service</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
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
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={cardData.expiryDate}
              onChange={handleChange}
              required
              placeholder="MM/YY"
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
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={cardData.cvv}
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
            {loading ? 'Tokenizing...' : 'Tokenize Card'}
          </button>
        </form>

        {token && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '4px',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb'
          }}>
            <h3>Token Created Successfully!</h3>
            <p>Token: <strong>{token}</strong></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tokenization