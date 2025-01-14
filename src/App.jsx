import React from 'react';
import UppyUploader from './components/UppyUploader'
import { Package2, PaintBucket, Database } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Project Management Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Card Header */}
          <div className="border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="text-lg font-medium">V1 (Attitude – Altitude)</div>
            <div className="flex items-center gap-4 text-gray-600">
              <span>Ordered: 250</span>
              <span>|</span>
              <span>Remaining: 0</span>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <Package2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">PACKAGING</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                  <PaintBucket className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">ARTWORK</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                  <Database className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-900">DATA</span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4">
              <UppyUploader />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 