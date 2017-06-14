const GitHubApi = require('github');
const formatComment = require('./format-comment.js');

module.exports = async data => {
	const issueUrl = `https://github.com/${repo.owner}/${repo.repo}/issues/${data.comment.id}`;
	const github = new GitHubApi(JSON.parse(process.env.GITHUB_OPTIONS || '{}'));
	const repo = {
		owner: data.repository.owner.login,
		repo: data.repository.name
	};

	console.log(`Event: ${issueUrl} (${data.action})`);

	switch (data.action) {
		case 'created':
			break;

		case 'edited':
			try {
				const updatedComment = await github.issues.getComment(
					Object.assign({
						id: data.comment.id
					}, repo)
				);
				data.comment = updatedComment.data;
				break;
			} catch (error) {
				console.warn('Error fetching updated comment:', error);
				return;
			}

		default:
			return;
	}

	const newComment = formatComment(data.comment.body);

	if (newComment !== data.comment.body) {
		console.log(`Event: ${issueUrl} (prettified!)`);

		github.authenticate({
			type: 'oauth',
			token: process.env.GITHUB_TOKEN
		});

		github.issues.editComment(
			Object.assign({
				id: data.comment.id,
				body: newComment
			}, repo)
		);
	}
};
