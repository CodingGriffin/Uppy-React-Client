import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUploader from './components/FileUploader';
import FileBrowser from './components/FileBrowser';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <span className="navbar-brand">File Manager</span>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Upload Files</Link>
              <Link className="nav-link" to="/browse">Browse Files</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<FileUploader />} />
          <Route path="/browse" element={<FileBrowser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
