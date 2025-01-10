import { useMemo } from 'react'
import Uppy from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'

const COMPANION_URL = 'http://companion.uppy.io'

export const useUppy = (options = {}) => {
  return useMemo(() => {
    const instance = new Uppy({ 
      debug: true,
      allowMultipleUploadBatches: true,
      restrictions: {
        allowedFileTypes: null,
        maxFileSize: null,
      },
      ...options
    })
    .use(AwsS3, {
      companionUrl: COMPANION_URL,
      acl: 'private',
      timeout: 60000
    })

    return instance
  }, [])
}

export const useFileManagerUppy = (options = {}) => {
  return useMemo(() => {
    const instance = new Uppy({ 
      debug: true,
      allowMultipleUploadBatches: true,
      ...options
    })
    .use(AwsS3, {
      companionUrl: COMPANION_URL,
    })

    instance.setOptions({
      allowEditing: true,
      allowFolderOperations: true,
    })

    return instance
  }, [])
}