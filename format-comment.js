const extract = require('extract-gfm');
const prettier = require('prettier');

module.exports = commentRaw => {
	const comment = extract.parseBlocks(commentRaw);

	if (comment.text.includes('<!-- prettier-github disable -->') || comment.blocks.length === 0) {
		return commentRaw;
	}

	const format = source => prettier.format(source, JSON.parse(process.env.PRETTIER_OPTIONS || '{}')).replace(/\n$/, '');

	comment.blocks.map(block => {
		if (JSON.parse(process.env.LANGS || '["js", "javascript", "es6", "css", "less", "scss", "ts"]').includes(block.lang)) {
			try {
				block.code = format(block.code);
			} catch (error) {
				console.warn('Error while formatting code block:', error.message);
			}
		}
		return block;
	});

	return extract.injectBlocks(comment.text, comment.blocks);
};
