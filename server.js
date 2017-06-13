const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const githubSecret = require('./github-secret.js');
const handleComment = require('./handle-comment.js');

dotenv.config();

const app = express();

const captureRaw = (req, res, buffer) => {
	req.raw = buffer;
};

app.use(bodyParser.json({verify: captureRaw}));

app.post('/', async (req, res) => {
	const event = req.headers['x-github-event'];

	if (!event) {
		res.writeHead(400, 'Event Header Missing');
		return res.end();
	}

	if (!githubSecret.isValid(req)) {
		res.writeHead(401, 'Invalid Signature');
		return res.end();
	}

	if (event === 'issue_comment') {
		await handleComment(req.body);
	}

	res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.info('Listening on port', port);
});
