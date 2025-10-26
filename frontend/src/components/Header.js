import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            PayPlus
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}>
              Dashboard
            </Link>
            <Link to="/payment" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/payment' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}>
              Payment
            </Link>
            <Link to="/tokenization" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/tokenization' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}>
              Tokenization
            </Link>
            <Link to="/authorization" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/authorization' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}>
              Authorization
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header