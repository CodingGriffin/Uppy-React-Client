import React from 'react'

const Approved = ({ onStartNew }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Job Approved</h2>
      <p>Your files have been approved and sent to production.</p>
      <button onClick={onStartNew} style={buttonStyle}>
        Start New Job
      </button>
    </div>
  )
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#1b5dab',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
}

export default Approved