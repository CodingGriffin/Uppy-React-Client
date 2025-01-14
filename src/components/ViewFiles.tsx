import React from 'react';
import { FileIcon } from './FileIcon';
import { Eye, Download } from 'lucide-react';

interface ViewFilesProps {
  files: Array<{
    name: string;
    url: string;
  }>;
}

export const ViewFiles: React.FC<ViewFilesProps> = ({ files }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Uploaded Files</h2>
      <div className="grid gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileIcon fileName={file.name} />
              <span className="font-medium text-gray-700">{file.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors"
                title="View file"
              >
                <Eye className="w-5 h-5" />
              </a>
              <a
                href={file.url}
                download
                className="p-2 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50 transition-colors"
                title="Download file"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}