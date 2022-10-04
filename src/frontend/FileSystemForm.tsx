import * as React from 'react';
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type FileSystemFormProps = {
  addFile: (fileName: string) => void,
  deleteFile: () => void,
  addDirectory: (directoryName: string) => void,
  deleteDirectory: () => void,
  setupExample: () => void,
  selectHome: () => void,
  saveToJson: () => void,
  uploadFromJson: () => void
}

export default function FileSystemForm({addFile, deleteFile, addDirectory, deleteDirectory, setupExample, selectHome, saveToJson, uploadFromJson}: FileSystemFormProps) {
  const [fileNameValue, setFileNameValue] = useState('');
  const [directoryNameValue, setDirectoryNameValue] = useState('');

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileNameValue(event.target.value);
  };

  const handleDirectoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirectoryNameValue(event.target.value);
  };

  const handleSubmitFileName = () => {
    event.preventDefault();
    addFile(fileNameValue);
  };

  const handleSubmitDirectoryName = () => {
    event.preventDefault();
    addDirectory(directoryNameValue);
  };

  const handleDeleteFile = () => {
    event.preventDefault();
    deleteFile();
  }

  const handleDeleteDirectory = () => {
    event.preventDefault();
    deleteDirectory();
  }

  return (
    <div>
      <Form onSubmit={handleSubmitDirectoryName}>
        <Form.Group className="mb-3">
          <Form.Label>Directory name</Form.Label>
          <Form.Control placeholder="Enter directory name" onChange={handleDirectoryNameChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form onSubmit={handleSubmitFileName}>
        <Form.Group className="mb-3">
          <Form.Label>File name</Form.Label>
          <Form.Control placeholder="Enter file name" onChange={handleFileNameChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Button variant="primary" type="submit" onClick={handleDeleteDirectory}>
        Delete selected directory
      </Button>
      <Button variant="primary" type="submit" onClick={handleDeleteFile}>
        Delete selected file
      </Button>
      <Button variant="primary" type="submit" onClick={setupExample}>
        Set up example
      </Button>
      <Button variant="primary" type="submit" onClick={selectHome}>
        Select home directory
      </Button>
      <Button variant="primary" type="submit" onClick={saveToJson}>
        Save to JSON
      </Button>
      <Button variant="primary" type="submit" onClick={uploadFromJson}>
        Upload from JSON
      </Button>
    </div>
  );
}
