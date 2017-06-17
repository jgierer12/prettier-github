const GitHubApi = require('github');
const formatComment = require('./format-comment.js');
const auth = require('./auth.js');

module.exports = async data => {
	const github = new GitHubApi(JSON.parse(process.env.GITHUB_OPTIONS || '{}'));
	const repo = {
		owner: data.repository.owner.login,
		repo: data.repository.name
	};

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
		await auth(github, data.installation);

		github.issues.editComment(
			Object.assign({
				id: data.comment.id,
				body: newComment
			}, repo)
		);
	}
};
