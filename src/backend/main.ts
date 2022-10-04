import * as express from 'express';
import * as path from 'path';

var app = express();
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/www')));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
