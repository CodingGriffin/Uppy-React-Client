import React from 'react';
import { Dashboard } from '@uppy/react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const FileUploader: React.FC = () => {
  const uppy = React.useMemo(() => {
    return new Uppy({
      restrictions: {
        allowedFileTypes: null,
      },
      autoProceed: false,
    })
    .use(XHRUpload, {
      endpoint: import.meta.env.VITE_S3_ENDPOINT || '',
      headers: {
        'x-amz-acl': 'public-read',
      },
      formData: true,
      fieldName: 'file',
    });
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Upload Files and Folders</h5>
            <Dashboard
              uppy={uppy}
              plugins={['Dashboard']}
              height={450}
              width="100%"
              showProgressDetails={true}
              note="You can drag & drop folders and files here"
              proudlyDisplayPoweredByUppy={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader; 