module.exports = async (github, repo) => {
	let res;
	try {
		res = await github.repos.getContent(
			Object.assign({
				path: 'package.json'
			}, repo)
		);
	} catch (error) {
		console.warn('Error getting configuration from repo:', error);
		console.info('Using default configuration');
		return {};
	}

	const pkg = Buffer.from(res.data.content, 'base64');

	return JSON.parse(pkg).prettier || {};
};
