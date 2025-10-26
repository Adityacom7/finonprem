import React, { useState, useEffect } from 'react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPayments: 0,
    successfulPayments: 0,
    failedPayments: 0,
    tokensCreated: 0
  })

  useEffect(() => {
    // Mock data for demo
    setStats({
      totalPayments: 1247,
      successfulPayments: 1201,
      failedPayments: 46,
      tokensCreated: 893
    })
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <div className="card">
          <h3>Total Payments</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
            {stats.totalPayments}
          </p>
        </div>
        <div className="card">
          <h3>Successful Payments</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {stats.successfulPayments}
          </p>
        </div>
        <div className="card">
          <h3>Failed Payments</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
            {stats.failedPayments}
          </p>
        </div>
        <div className="card">
          <h3>Tokens Created</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
            {stats.tokensCreated}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard