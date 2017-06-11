const GitHubApi = require('github');
const formatComment = require('./format-comment.js');

module.exports = data => {
	if (!['created', 'edited'].includes(data.action)) {
		return;
	}

	const newComment = formatComment(data.comment.body);

	if (newComment !== data.comment.body) {
		const github = new GitHubApi(JSON.parse(process.env.GITHUB_OPTIONS || '{}'));
		github.authenticate({
			type: 'oauth',
			token: process.env.GITHUB_TOKEN
		});

		github.issues.editComment({
			owner: data.repository.owner.login,
			repo: data.repository.name,
			id: data.comment.id,
			body: newComment
		});
	}
};
