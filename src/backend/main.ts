import * as express from 'express';
import * as path from 'path';
import { FileSystemTree } from './tree';

var app = express();
app.use(express.json());
var fst = new FileSystemTree();

// Simple endpoint that returns the current time
app.get('/api/time', function(req, res) {
    res.send(new Date().toISOString());
});

// Serve static files
app.use('/', express.static(path.join(__dirname, '/www')));

app.post('/files/add', function(req, res) {
    var filename = req.body.name;
    fst.addFile(filename);
    fst.print();
});

app.post('/directories/add', function(req, res) {
    var directoryName = req.body.name;
    fst.addDirectory(directoryName);
    fst.print();
});

app.get('/tree', function(req, res) {
    console.log("inside tree API");
    fst.addFile("test.doc");
    fst.addFile("test2.doc");
    const documentsDir = fst.addDirectory("Documents");
    fst.addFile("doc1.doc", documentsDir);
    fst.addFile("doc2.doc", documentsDir);
    const photosDir = fst.addDirectory("Photos");
    fst.addFile("photo1.jpg", photosDir);
    fst.addFile("photo2.jpg", photosDir);
    res.send(fst.getTree());
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});