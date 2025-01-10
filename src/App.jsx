import React, { useState, useEffect } from 'react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { useUppy, useFileManagerUppy } from './hooks/useUppy'
import Initial from './components/WorkflowStages/Initial'
import FileUpload from './components/WorkflowStages/FileUpload'
import Proofing from './components/WorkflowStages/Proofing'
import Revision from './components/WorkflowStages/Revision'
import Approved from './components/WorkflowStages/Approved'
import FileManager from './components/FileManager'

function App() {
  const [workflowState, setWorkflowState] = useState('initial')
  const [jobHistory, setJobHistory] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [showFileManager, setShowFileManager] = useState(false)

  const uppy = useUppy()
  const fileManagerUppy = useFileManagerUppy()

  useEffect(() => {
    uppy.on('complete', (result) => {
      console.log('Upload complete:', result.successful)
      setWorkflowState('proofing')
    })
  }, [uppy])

  useEffect(() => {
    const mockJobs = [
      { id: 1, name: 'Previous Job 1', date: '2024-03-20', files: [] },
      { id: 2, name: 'Previous Job 2', date: '2024-03-15', files: [] },
    ]
    setJobHistory(mockJobs)
  }, [])

  const loadExistingFiles = async (jobId) => {
    console.log('Loading files for job:', jobId)
    const files = [
      { name: 'file1.pdf', size: 1024, type: 'application/pdf' },
      { name: 'file2.jpg', size: 2048, type: 'image/jpeg' },
    ]
    
    files.forEach(file => {
      fileManagerUppy.addFile({
        name: file.name,
        type: file.type,
        data: new Blob([]),
        size: file.size,
        isRemote: true,
        remote: {
          serverUrl: COMPANION_URL,
          url: `s3://bucket-name/${jobId}/${file.name}`,
        },
      })
    })
  }

  const handleSelectJob = (job) => {
    setSelectedJob(job)
    loadExistingFiles(job.id)
    setShowFileManager(true)
  }

  const renderWorkflowStage = () => {
    switch (workflowState) {
      case 'initial':
        return (
          <Initial
            onUploadNew={() => setWorkflowState('uploading')}
            onManageFiles={() => setShowFileManager(true)}
            jobHistory={jobHistory}
            onSelectJob={handleSelectJob}
          />
        )
      case 'uploading':
        return (
          <FileUpload
            uppy={uppy}
            onBack={() => setWorkflowState('initial')}
          />
        )
      case 'proofing':
        return (
          <Proofing
            onRequestRevision={() => setWorkflowState('revision')}
            onApprove={() => setWorkflowState('approved')}
          />
        )
      case 'revision':
        return <Revision uppy={uppy} />
      case 'approved':
        return (
          <Approved
            onStartNew={() => setWorkflowState('initial')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      {showFileManager ? (
        <FileManager
          uppy={fileManagerUppy}
          selectedJob={selectedJob}
          onBack={() => {
            setShowFileManager(false)
            setSelectedJob(null)
          }}
        />
      ) : (
        renderWorkflowStage()
      )}
    </div>
  )
}

export default App