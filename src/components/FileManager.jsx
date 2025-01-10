import React from 'react'
import { Dashboard } from '@uppy/react'

const FileManager = ({ uppy, selectedJob, onBack }) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        File Manager {selectedJob ? `- ${selectedJob.name}` : ''}
      </h2>
      <Dashboard
        uppy={uppy}
        proudlyDisplayPoweredByUppy={false}
        showProgressDetails
        height={450}
        width="100%"
        allowEditing={true}
        allowFolderOperations={true}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={onBack} style={buttonStyle}>
          Back
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

export default FileManager