import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import { COMPANION_URL, COMPANION_ALLOWED_HOSTS } from '@uppy/transloadit';
import DashboardPlugin from '@uppy/dashboard'
import AwsS3 from '@uppy/aws-s3'
import Webcam from '@uppy/webcam'
import Dropbox from '@uppy/dropbox'
import ScreenCapture from '@uppy/screen-capture'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import React from 'react';

interface UploadDashboardProps {
  uppy: Uppy;
}

export const UppyUploader: React.FC<UploadDashboardProps> = ({ uppy }) => {
// export default function UppyUploader() {

  // useEffect(() => {
  //   uppy.on('complete', (result) => {
  //     console.log('Upload complete! Files:', result.successful)
  //   })

  //   uppy.on('upload-success', (file) => {
  //     console.log('Upload success! File:', file.meta['name'])
  //   })

  //   return () => uppy.destroy({ removeUploadedFiles: true })
  // }, [uppy])

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">File Uploader</h1> */}
      <Dashboard
        uppy={uppy}
        id="dashboard"
        // inline={true}
        height={470}
        width="100%"
        showProgressDetails={true}
      />
    </div>
  )
} 