import React from 'react';
import { Image, FileText, File } from 'lucide-react';

interface FileIconProps {
  fileName: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ fileName }) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
    return <Image className="w-5 h-5 text-blue-500" />;
  } else if (['pdf', 'doc', 'docx'].includes(extension || '')) {
    return <FileText className="w-5 h-5 text-red-500" />;
  }
  return <File className="w-5 h-5 text-gray-500" />;
};