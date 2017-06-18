const GitHubApi = require('github');
const formatComment = require('./format-comment.js');
const auth = require('./auth.js');

module.exports = async data => {
	console.log(`Event: ${data.pull_request.html_url} (${data.action})`);

	const github = new GitHubApi();
	const repo = {
		owner: data.repository.owner.login,
		repo: data.repository.name
	};

	switch (data.action) {
		case 'opened':
		case 'edited':
			break;

		default:
			return;
	}

	const newPR = formatComment(data.pull_request.body);

	if (newPR !== data.pull_request.body) {
		console.log(`Event: ${data.pull_request.html_url} (prettified!)`);

		await auth(github, data.installation);

		github.issues.edit(
			Object.assign({
				number: data.pull_request.number,
				body: newPR
			}, repo)
		);
	}
};
