const jwt = require('jsonwebtoken');

module.exports = async (github, installation) => {
	let token;
	if (process.env.GITHUB_TOKEN) {
		token = process.env.GITHUB_TOKEN;
	} else if (process.env.GITHUB_KEY && process.env.GITHUB_ID && installation) {
		const integrationToken = jwt.sign({}, process.env.GITHUB_KEY, {
			issuer: process.env.GITHUB_ID,
			expiresIn: '10m',
			algorithm: 'RS256'
		});

		github.authenticate({
			type: 'integration',
			token: integrationToken
		});

		token = (await github.integrations.createInstallationToken({
			'installation_id': installation.id // eslint-disable-line quote-props
		})).data.token;
	}

	if (token) {
		return github.authenticate({
			type: 'token',
			token
		});
	}

	console.warn('No authorization token', {installation});
};
