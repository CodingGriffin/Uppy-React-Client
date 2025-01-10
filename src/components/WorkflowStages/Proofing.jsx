import React from 'react'

const Proofing = ({ onRequestRevision, onApprove }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Review Proof</h2>
      <div style={{ margin: '20px 0' }}>
        <div style={{ 
          border: '1px solid #ccc',
          padding: '20px',
          margin: '20px auto',
          maxWidth: '600px'
        }}>
          Proof Preview
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button
          onClick={onRequestRevision}
          style={{...buttonStyle, backgroundColor: '#dc3545'}}
        >
          Request Revision
        </button>
        <button
          onClick={onApprove}
          style={{...buttonStyle, backgroundColor: '#28a745'}}
        >
          Approve
        </button>
      </div>
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

export default Proofing