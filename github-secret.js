const crypto = require('crypto');

const sign = (secret, data) => {
	const buffer = Buffer.from(data, 'utf8');
	return 'sha1=' + crypto.createHmac('sha1', secret).update(buffer).digest('hex');
};

module.exports.isValid = req => {
	const signature = req.headers['x-hub-signature'];
	const secret = process.env.GITHUB_WEBHOOK_SECRET || '';
	return signature && signature === sign(secret, req.raw);
};
