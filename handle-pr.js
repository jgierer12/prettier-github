const GitHubApi = require('github');
const formatComment = require('./format-comment.js');

module.exports = async data => {
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

	const newPR = formatComment(data.pull_request.body);

	if (newPR !== data.pull_request.body) {
		github.authenticate({
			type: 'oauth',
			token: process.env.GITHUB_TOKEN
		});

		github.issues.edit(
			Object.assign({
				number: data.pull_request.number,
				body: newPR
			}, repo)
		);
	}
};
