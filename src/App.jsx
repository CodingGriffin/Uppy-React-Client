import React, { useState } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import AwsS3 from '@uppy/aws-s3'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

// Default companion URL - replace with your actual URL in production
const COMPANION_URL = 'http://companion.uppy.io'

function App() {
  const [activeView, setActiveView] = useState('upload') // 'upload' or 'view'
  
  const uppy = React.useMemo(() => {
    return new Uppy({ 
      debug: true,
      allowMultipleUploadBatches: true,
      restrictions: {
        allowedFileTypes: null, // Allow all file types
        maxFileSize: null, // No size limit
      }
    })
    .use(AwsS3, {
      companionUrl: COMPANION_URL,
      // Make sure to configure these in production
      acl: 'private',
      timeout: 60000
    })
  }, [])

  // Configure Uppy to handle folders
  uppy.setOptions({
    onBeforeFileAdded: (currentFile) => {
      // Handle empty folders by creating a 0-byte placeholder file
      if (currentFile.data.size === 0 && currentFile.data.type === '') {
        currentFile.meta.isEmptyFolder = true
      }
      return currentFile
    }
  })

  // Log upload results
  uppy.on('complete', (result) => {
    console.log('Upload complete! We\'ve uploaded these files:', result.successful)
  })

  const viewerUppy = React.useMemo(() => {
    return new Uppy({ debug: true })
    .use(AwsS3, {
      companionUrl: COMPANION_URL,
    })
  }, [])

  return (
    <div className="app">
      <div className="nav-buttons" style={{ margin: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setActiveView('upload')}
          style={{ 
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: activeView === 'upload' ? '#1b5dab' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Upload Files
        </button>
        <button 
          onClick={() => setActiveView('view')}
          style={{ 
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: activeView === 'view' ? '#1b5dab' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Files
        </button>
      </div>

      {activeView === 'upload' ? (
        <div>
          <h2 style={{ textAlign: 'center' }}>Upload Folders & Files</h2>
          <Dashboard
            uppy={uppy}
            proudlyDisplayPoweredByUppy={false}
            showProgressDetails
            height={450}
            width="100%"
            note="You can drag & drop both files and folders here"
          />
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: 'center' }}>View Uploaded Files</h2>
          <Dashboard
            uppy={viewerUppy}
            proudlyDisplayPoweredByUppy={false}
            showProgressDetails
            height={450}
            width="100%"
            disabled={true}
            disableLocalFiles={true}
          />
        </div>
      )}
    </div>
  )
}

export default App