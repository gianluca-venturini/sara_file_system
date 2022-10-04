import * as React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import FileSystemForm from './FileSystemForm';
import FileSystemDisplay, { Directory } from './FileSystemDisplay';

var _ = require('lodash');

function App() {
  const [root, updateRoot] = useState<Directory>({
    name: "",
    files: [],
    directories: [],
    parentIndices: [],
    deleted: false
  });
  const [clickedDirectory, setClickedDirectory] = useState<Directory>(null);
  const [clickedDirectoryIndex, setClickedDirectoryIndex] = useState(0);
  const [clickedFileIndex, setClickedFileIndex] = useState(0);
  const [clickedFileParentIndices, setClickedFileParentIndices] = useState([]);

  const getCurrDirectoryToAdd = (newRoot: Directory) => {
    var currDirectory = newRoot;

    var newParentIndices: number[] = [];
    if (clickedDirectory === null) {
      newParentIndices = [];
    } else {
      newParentIndices = [...clickedDirectory.parentIndices, clickedDirectoryIndex];
      for (var i = 0; i < clickedDirectory.parentIndices.length; i++) {
        var currParentIndex = clickedDirectory.parentIndices[i];
        currDirectory = currDirectory.directories[currParentIndex];
      }
        currDirectory = currDirectory.directories[clickedDirectoryIndex];
    }
    return {newParentIndices, currDirectory};
  }

  const getCurrDirectoryForFile = (newRoot: Directory, parentIndices: number[]) => {
    var currDirectory = newRoot;

    if (clickedDirectory != null) {
      for (var i = 0; i < clickedDirectory.parentIndices.length; i++) {
        var currParentIndex = clickedDirectory.parentIndices[i];
        currDirectory = currDirectory.directories[currParentIndex];
      }
        currDirectory = currDirectory.directories[clickedDirectoryIndex];
    }
    return currDirectory;
  }

  const getCurrDirectoryToDelete = (newRoot: Directory) => {
    var currDirectory = newRoot;
    if (clickedDirectory != null) {
      for (var i = 0; i < clickedDirectory.parentIndices.length; i++) {
        var currParentIndex = clickedDirectory.parentIndices[i];
        currDirectory = currDirectory.directories[currParentIndex];
      }
    }
    return currDirectory;
  }

  const addDirectory = (directoryName: string) => {
    var newRoot = _.cloneDeep(root);
    var {newParentIndices, currDirectory} = getCurrDirectoryToAdd(newRoot);

    var newDirectory: Directory = {
      name: directoryName,
      files: [],
      directories: [],
      parentIndices: newParentIndices,
      deleted: false
    }
    currDirectory.directories = [...currDirectory.directories, newDirectory];
    updateRoot(newRoot);
  }

  const addFile = (fileName: string) => {
    var newRoot = _.cloneDeep(root);
    var currDirectory = getCurrDirectoryForFile(newRoot, clickedDirectory.parentIndices);
    currDirectory.files = [...currDirectory.files, fileName];
    updateRoot(newRoot);
  }

  const deleteFile = () => {
    var newRoot = _.cloneDeep(root);
    var currDirectory = getCurrDirectoryForFile(newRoot, clickedFileParentIndices);
    currDirectory.files.splice(clickedFileIndex, 1);
    updateRoot(newRoot);
  }

  const deleteDirectory = () => {
    var newRoot = _.cloneDeep(root);
    var currDirectory = getCurrDirectoryToDelete(newRoot);
    for (var i = 0; i < currDirectory.directories.length; i++) {
      if (i == clickedDirectoryIndex) {
        currDirectory.directories[i].deleted = true;
        break;
      }
    }
    setClickedDirectory(null);
    setClickedDirectoryIndex(0);
    updateRoot(newRoot);
  }

  const handleFileClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, parentIndices: number[], index: number) => {
    event.stopPropagation();
    setClickedFileParentIndices(parentIndices);
    setClickedFileIndex(index);
  }

  const handleDirectoryClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, directory: Directory, index: number) => {
    event.stopPropagation();
    setClickedDirectory(directory);
    setClickedDirectoryIndex(index);
  }

  return (
    <div>
      <FileSystemForm
        addFile={addFile}
        addDirectory={addDirectory}
        deleteFile={deleteFile}
        deleteDirectory={deleteDirectory}
      />
      <FileSystemDisplay
        root={root}
        handleFileClick={handleFileClick}
        handleDirectoryClick={handleDirectoryClick}
      />
    </div>
  );
}

export function start() {
    const rootElem = document.getElementById('main');
    render(<App />, rootElem);
}
