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

function serializeSubPart(key, value) {
  if (typeof value !== 'object') {
    return [[key, value]]
  }
  
  if (Array.isArray(value)) {
    return value.flatMap(val => serializeSubPart(`${key}[]`, val))
  }
  
  return Object.entries(value).flatMap(([subkey, val]) => 
    serializeSubPart(key ? `${key}[${subkey}]` : subkey, val)
  )
}

function serialize(data) {
  return new URLSearchParams(serializeSubPart(null, data))
}

export default function UppyUploader() {
  const [uppy] = useState(() => {
    const uppy = new Uppy({
      id: 'uppy',
      autoProceed: false,
      debug: true,
      restrictions: {
        maxFileSize: 1024 * 1024 * 1024, // 1GB
        maxNumberOfFiles: 10,
        allowedFileTypes: null // allow all file types
      }
    })

    uppy
      .use(DashboardPlugin, {
        inline: true,
        target: 'body',
        height: 470,
        width: '100%'
      })
      .use(AwsS3, {
        id: 'aws-s3',
        shouldUseMultipart: (file) => file.size > 100 * 0x100000,

        async getTemporarySecurityCredentials({ signal }) {
          const response = await fetch("http://45.144.28.239:8082/s3/sts", { signal })
          console.log(response)
          if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
          return response.json()
        },

        async getUploadParameters(file, options) {
          const response = await fetch("http://45.144.28.239:8082/s3/sign", {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: serialize({
              filename: file.name,
              contentType: file.type,
            }),
            signal: options.signal,
          })
          console.log(response)

          if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
          const data = await response.json()

          return {
            method: data.method,
            url: data.url,
            fields: {},
            headers: {
              "Content-Type": file.type,
            },
          }
        },

        // Multipart upload methods
        async createMultipartUpload(file, signal) {
          const metadata = Object.fromEntries(
            Object.entries(file.meta || {})
              .filter(([, value]) => value != null)
              .map(([key, value]) => [key, value.toString()])
          )

          const response = await fetch("http://45.144.28.239:8082/s3/multipart", {
            method: "POST",
            headers: { accept: "application/json" },
            body: serialize({
              filename: file.name,
              type: file.type,
              metadata,
            }),
            signal,
          })

          if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
          return response.json()
        },

        async signPart(file, options) {
          const { uploadId, key, partNumber, signal } = options

          if (!uploadId || !key || !partNumber) {
            throw new Error("Cannot sign without a key, an uploadId, and a partNumber")
          }

          const filename = encodeURIComponent(key)
          const response = await fetch(
            `http://45.144.28.239:8082/s3/multipart/${uploadId}/${partNumber}?key=v2/test/${filename}`,
            { signal }
          )

          if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
          return response.json()
        },

        async listParts(file, { key, uploadId }, signal) {
          console.log("here");
          signal?.throwIfAborted();

          const filename = encodeURIComponent(key);
          const response = await fetch(
            `http://45.144.28.239:8082/s3/multipart/${uploadId}?key=v2/test/${filename}`,
            { signal }
          );

          if (!response.ok)
            throw new Error("Unsuccessful request", { cause: response });

          const data = await response.json();

          return data;
        },

        async completeMultipartUpload(file, { key, uploadId, parts }, signal) {
          const filename = encodeURIComponent(key)
          const uploadIdEnc = encodeURIComponent(uploadId)
          
          const response = await fetch(
            `http://45.144.28.239:8082/s3/multipart/${uploadIdEnc}/complete?key=v2/test/${filename}`,
            {
              method: "POST",
              headers: { accept: "application/json" },
              body: serialize({ parts }),
              signal,
            }
          )

          if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
          return response.json()
        },
      })
      // .use(GoogleDrive, {
      //   target: Dashboard,
      //   companionUrl: 'http://45.144.28.239:8082'
      // })
      .use(Dropbox, {
        target: DashboardPlugin,
        companionUrl: COMPANION_URL,
        companionAllowedHosts: COMPANION_ALLOWED_HOSTS,
        // companionKeysParams: {
        //   key: "whc8tg2pockrsqj",
        //   credentialsName: 'credential_for_uppy_test_with_dropbox',
        // },
      })
      .use(Webcam, {
        target: DashboardPlugin
      })
      .use(ScreenCapture, {
        target: DashboardPlugin
      })

    return uppy
  })

  useEffect(() => {
    uppy.on('complete', (result) => {
      console.log('Upload complete! Files:', result.successful)
    })

    uppy.on('upload-success', (file) => {
      console.log('Upload success! File:', file.meta['name'])
    })

    return () => uppy.destroy({ removeUploadedFiles: true })
  }, [uppy])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Uploader</h1>
      {/* <Dashboard
        uppy={uppy}
        id="dashboard"
        inline={true}
        height={470}
        width="100%"
        showProgressDetails={true}
      /> */}
    </div>
  )
} 