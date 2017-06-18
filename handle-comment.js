const GitHubApi = require('github');
const formatComment = require('./format-comment.js');
const auth = require('./auth.js');
const getConfig = require('./get-config.js');

module.exports = async data => {
	console.log(`Event: ${data.comment.html_url} (${data.action})`);

	const github = new GitHubApi();
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

	await auth(github, data.installation);

	const newComment = formatComment(data.comment.body, await getConfig(github, repo));

	if (newComment !== data.comment.body) {
		console.log(`Event: ${data.comment.html_url} (prettified!)`);

		github.issues.editComment(
			Object.assign({
				id: data.comment.id,
				body: newComment
			}, repo)
		);
	}
};
