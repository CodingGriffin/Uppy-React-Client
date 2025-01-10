import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const FileBrowser: React.FC = () => {
  const [files, setFiles] = useState<Array<{ key: string; size: number; lastModified: Date }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const s3Client = new S3Client({
          region: import.meta.env.VITE_AWS_REGION || '',
          credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
          },
        });

        const command = new ListObjectsV2Command({
          Bucket: import.meta.env.VITE_S3_BUCKET || '',
        });

        const response = await s3Client.send(command);
        
        if (response.Contents) {
          const fileList = response.Contents.map(item => ({
            key: item.Key || '',
            size: item.Size || 0,
            lastModified: item.LastModified || new Date(),
          }));
          setFiles(fileList);
        }
      } catch (err) {
        setError('Failed to fetch files. Please check your AWS credentials.');
        console.error('Error fetching files:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Stored Files</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Last Modified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.key}>
                      <td>{file.key}</td>
                      <td>{(file.size / 1024).toFixed(2)} KB</td>
                      <td>{file.lastModified.toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            window.open(`${import.meta.env.VITE_S3_ENDPOINT}/${file.key}`);
                          }}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileBrowser; 