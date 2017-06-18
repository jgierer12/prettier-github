const GitHubApi = require('github');
const formatComment = require('./format-comment.js');
const auth = require('./auth.js');
const getConfig = require('./get-config.js');

module.exports = async data => {
	console.log(`Event: ${data.issue.html_url} (${data.action})`);

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

	await auth(github, data.installation);

	const newIssue = formatComment(data.issue.body, await getConfig(github, repo));

	if (newIssue !== data.issue.body) {
		console.log(`Event: ${data.issue.html_url} (prettified!)`);

		github.issues.edit(
			Object.assign({
				number: data.issue.number,
				body: newIssue
			}, repo)
		);
	}
};
