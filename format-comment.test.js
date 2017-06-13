const formatComment = require('./format-comment.js');

test('Formats a code block', () => {
	const comment = '```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```';

	expect(formatComment(comment)).toMatchSnapshot();
});

test('Formats multiple code blocks', () => {
	const comment = '```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```\n```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```';

	expect(formatComment(comment)).toMatchSnapshot();
});

test('Overrides notice if the comment has been formatted previously', () => {
	const comment = '<!-- The following code block was formatted with `prettier`. If this is not desired, please change this comment to `prettier-github disable`. A copy of your original code block is included below in case you want to restore it.\nLearn more about `prettier-github` at https://github.com/jgierer12/prettier-github\n\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n\n-->\n```js\nbar()\n```';

	expect(formatComment(comment)).toMatchSnapshot();
});

test('Ignores no code blocks', () => {
	const comment = 'Nothing to format here\n';

	expect(formatComment(comment)).toBe(comment);
});

test('Ignores incompatible code blocks', () => {
	const comment = '```sh\necho "Nothing to format here"\n```';

	expect(formatComment(comment)).toBe(comment);
});

test('Ignores correctly formatted code blocks', () => {
	const comment = '```js\nconst all = "good";\n```';

	expect(formatComment(comment)).toBe(comment);
});

test('Ignores comments containing `<!-- prettier-github disable -->`', () => {
	const comment = '<!-- prettier-github disable -->\n\n```js\nfoo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());\n```';

	expect(formatComment(comment)).toBe(comment);
});

describe('invalid code blocks', () => {
	beforeEach(() => {
		global.console = {
			warn: jest.fn()
		};
	});

	test('Warns about invalid code blocks', () => {
		const comment = '```js\ninvalid javascript\n```';
		formatComment(comment);

		expect(global.console.warn).toHaveBeenCalled();
	});

	test('Ignores invalid code blocks', () => {
		const comment = '```js\ninvalid javascript\n```';

		expect(formatComment(comment)).toBe(comment);
	});
});
