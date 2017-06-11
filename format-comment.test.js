const formatComment = require('./format-comment.js');

test('Formats a code block', () => {
	const comment = '```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```\n';

	expect(formatComment(comment)).toMatchSnapshot();
});

test('Formats multiple code blocks', () => {
	const comment = '```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```\n\n```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```\n';

	expect(formatComment(comment)).toMatchSnapshot();
});

test('Ignores no code blocks', () => {
	const comment = 'Nothing to format here\n';

	expect(formatComment(comment)).toBe(comment);
});

test('Ignores incompatible code blocks', () => {
	const comment = '```sh\necho "Nothing to format here"\n```\n';

	expect(formatComment(comment)).toBe(comment);
});

test('Ignores correctly formatted code blocks', () => {
	const comment = '```js\nconst all = "good";\n```\n';

	expect(formatComment(comment)).toBe(comment);
});

test('Ignores comments containing `<!-- prettier-github disable -->`', () => {
	const comment = '<!-- prettier-github disable -->\n\n```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```\n';

	expect(formatComment(comment)).toBe(comment);
});

describe('invalid code blocks', () => {
	beforeEach(() => {
		global.console = {
			warn: jest.fn()
		};
	});

	test('Warns about invalid code blocks', () => {
		const comment = '```js\ninvalid javascript\n```\n';
		formatComment(comment);

		expect(global.console.warn).toHaveBeenCalled();
	});

	test('Ignores invalid code blocks', () => {
		const comment = '```js\ninvalid javascript\n```\n';

		expect(formatComment(comment)).toBe(comment);
	});
});
