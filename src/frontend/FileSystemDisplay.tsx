import * as React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

export interface Directory {
  name: string,
  files: string[],
  directories: Directory[],
  parentIndices: number[],
  deleted: boolean
}

type FileSystemDisplayProps = {
  root: Directory,
  handleFileClick: (event: React.MouseEvent<Element, MouseEvent>, parentIndices: number[], index: number) => void,
  handleDirectoryClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, directory: Directory, index: number) => void
}

export default function FileSystemDisplay({root, handleFileClick, handleDirectoryClick}: FileSystemDisplayProps) {
  const outputFileHTML = (files: string[], parentIndices: number[]) => {
    return files.map(function(fileName, index){
      return <ListGroup.Item as="li" onClick={event => handleFileClick(event, parentIndices, index)}>{ fileName }</ListGroup.Item>;
    });
  }

  const outputDirectoryHTML = (currDirectory: Directory) => {
    if (Object.keys(currDirectory).length === 0) {
      return <></>;
    }

    return currDirectory.directories.map(function(directory, index) {
      return (
        <div>
            <Accordion.Item eventKey={index.toString()} onClick={event => handleDirectoryClick(event, directory, index)} style={{ display: directory.deleted ? "none" : "block" }}>
              <Accordion.Header>{directory.name}</Accordion.Header>
              <Accordion.Body>
                <ListGroup as="ul">
                  { outputFileHTML(directory.files, directory.parentIndices) }
                </ListGroup>
                  { outputDirectory(directory) }
              </Accordion.Body>
            </Accordion.Item>
        </div>
      );
    });
  };

  const outputDirectory = (directory: Directory) => {
    return (
      <Accordion alwaysOpen>
        { outputDirectoryHTML(directory) }
      </Accordion>
    )
  };

  return (
    <div>
      { outputFileHTML(root.files, root.parentIndices) }
      { outputDirectory(root) }
    </div>
  );
}
