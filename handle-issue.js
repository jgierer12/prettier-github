const GitHubApi = require('github');
const formatComment = require('./format-comment.js');
const auth = require('./auth.js');

module.exports = async data => {
	console.log(`Event: ${data.issue.html_url} (${data.action})`);

	const github = new GitHubApi(JSON.parse(process.env.GITHUB_OPTIONS || '{}'));
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

	const newIssue = formatComment(data.issue.body);

	if (newIssue !== data.issue.body) {
		console.log(`Event: ${data.issue.html_url} (prettified!)`);

		await auth(github, data.installation);

		github.issues.edit(
			Object.assign({
				number: data.issue.number,
				body: newIssue
			}, repo)
		);
	}
};
