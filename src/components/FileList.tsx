import React from 'react';
import { FileIcon } from './FileIcon';

interface FileListProps {
  files: string[];
}

export const FileList: React.FC<FileListProps> = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Files</h2>
      <div className="bg-gray-50 rounded-lg p-4">
        {files.map((fileName, index) => (
          <div
            key={index}
            className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FileIcon fileName={fileName} />
            <span className="ml-2 text-gray-700">{fileName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};