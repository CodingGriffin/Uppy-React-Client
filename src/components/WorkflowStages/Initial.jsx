import React from 'react'

const Initial = ({ onUploadNew, onManageFiles, jobHistory, onSelectJob }) => {
  return (
    <div className="workflow-options" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Select Your Workflow</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={onUploadNew} style={buttonStyle}>
          Upload New Files
        </button>
        <button onClick={onManageFiles} style={buttonStyle}>
          Manage Existing Files
        </button>
      </div>
      {jobHistory.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Previous Jobs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {jobHistory.map(job => (
              <button
                key={job.id}
                onClick={() => onSelectJob(job)}
                style={jobButtonStyle}
              >
                {job.name} - {job.date}
              </button>
            ))}
          </div>
        </div>
      )}
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

const jobButtonStyle = {
  padding: '10px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
}

export default Initial