const extract = require('extract-gfm');
const prettier = require('prettier');

const noticeComment = originalCode =>
`<!-- The following code block was formatted with Prettier. If this is not desired, please change this comment to \`prettier-github disable\`. A copy of your original code block is included below in case you want to restore it.
Learn more about Prettier GitHub at https://github.com/jgierer12/prettier-github

${originalCode}

-->`;

module.exports = (commentRaw, prettierConfig = {}) => {
	const comment = extract.parseBlocks(commentRaw);

	if (comment.text.includes('<!-- prettier-github disable -->') || comment.blocks.length === 0) {
		return commentRaw;
	}

	const format = (source, lang) => prettier.format(source, Object.assign({filepath: `.${lang}`}, prettierConfig)).replace(/\n$/, '');

	const langs = prettierConfig.langs || ['js', 'javascript', 'jsx', 'es6', 'css', 'less', 'scss', 'ts', 'graphql', 'json'];

	comment.blocks.forEach((block, i) => {
		if (langs.includes(block.lang)) {
			try {
				const formattedCode = format(block.code, block.lang);
				if (formattedCode !== block.code) {
					const newText = noticeComment(block.code) + '\n' + block.block.replace(block.code, formattedCode);
					const noticeCommentRegex = noticeComment('__OLD_BLOCK__').replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
					const oldTextRegex = new RegExp(`(${noticeCommentRegex.replace('__OLD_BLOCK__', '[\\s\\S]*')}\n)?${extract.id(i)}`.replace(/\n/g, '(\n|(\r\n))'));
					comment.text = comment.text.replace(oldTextRegex, newText);
					return;
				}
			} catch (error) {
				console.warn('Error while formatting code block:', error.message);
			}
		}

		comment.text = comment.text.replace(extract.id(i), block.block);
	});

	return comment.text;
};
