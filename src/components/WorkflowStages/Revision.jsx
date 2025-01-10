import React from 'react'
import { Dashboard } from '@uppy/react'

const Revision = ({ uppy }) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Upload Revision Files</h2>
      <Dashboard
        uppy={uppy}
        proudlyDisplayPoweredByUppy={false}
        showProgressDetails
        height={450}
        width="100%"
        note="Upload additional or revised files"
      />
    </div>
  )
}

export default Revision