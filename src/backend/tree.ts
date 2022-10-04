// Update to make stuff private
// Add return types
// Figure out interfaces-- maybe do some extending because FileNode and DirectoryNode offer similar things
// What order do we want to display in? Most recently updated is easy, alphabetical would need sorting, etc
// Check let vs const vs var

// import { json } from "express";

class FileNode {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    public print() {
        console.log(this.name);
    }
}

class DirectoryNode {
    name: string;
    directoryChildren: Array<DirectoryNode>
    fileChildren: Array<FileNode>
    constructor(name: string) {
        this.name = name;
        this.directoryChildren = [];
        this.fileChildren = [];
    }

    // Update to find node first and handle directory
    public addFile(name: string, directory?: DirectoryNode) {
        if (directory === undefined) {
            const file = new FileNode(name);
            this.fileChildren.push(file);
        } else {
            directory.addFile(name);
        }
    }

    public addDirectory(name: string) {
        const directory = new DirectoryNode(name);
        this.directoryChildren.push(directory);
        return directory;
    }

    public print() {
        this.fileChildren.forEach(fileChild => console.log(fileChild.name));
        var fileDirectoryStack = this.directoryChildren;
        while (fileDirectoryStack.length > 0) {
            var currNode = fileDirectoryStack.pop();
            console.log(currNode.name);
            currNode.print();
            fileDirectoryStack.concat(currNode.directoryChildren);
        }
    }

    // Could have empty directory, only know it is a file because it isn't a directory
}

export class FileSystemTree {
    public root: DirectoryNode;

    constructor() {
        this.root = new DirectoryNode("");
    }

    public addFile(name: string, directory?: DirectoryNode) {
        this.root.addFile(name, directory);
    }

    public addDirectory(name: string): DirectoryNode {
        const directory = this.root.addDirectory(name);
        return directory;
    }

    public getTree(){
        return JSON.stringify(this.root);
    }

    public print() {
        this.root.print();
    }

}


