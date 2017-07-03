// const formatComment = require('./format-comment.js');
beforeEach(() => {
	jest.resetModules();
});

test('Runs Prettier', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	formatComment(comment);
	expect(format).toHaveBeenCalled();
});

test('Passes code block to Prettier', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	formatComment(comment);
	expect(format.mock.calls[0][0]).toBe('__CODE__');
});

test('Passes language to Prettier via `filepath`', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	formatComment(comment);
	expect(format.mock.calls[0][1].filepath).toBe('.js');
});

test('Outputs formatted code', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('__CODE_1__');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	expect(formatComment(comment)).toMatch(/```js\n__CODE_1__[\s\S]*\n```$/);
});

test('Trims trailing newline', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('__CODE_1__\n');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	expect(formatComment(comment)).toMatch(/```js\n__CODE_1__\n```$/);
});

test('Outputs notice comment', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	expect(formatComment(comment)).toMatch(/^<!--[\s\S]*-->/);
});

test('Outputs old code in notice comment', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	expect(formatComment(comment)).toMatch(/^<!--[\s\S]*__CODE__[\s\S]*-->/);
});

test('Overrides existing notice comments', () => {
	const comment = '```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValueOnce('__CODE_1__').mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	const processedComment = formatComment(formatComment(comment));
	expect(processedComment).toMatch(/^<!--[\s\S]*__CODE_1__[\s\S]*-->/);
	expect(processedComment).not.toMatch(/<!--[\s\S]*__CODE__[\s\S]*-->/);
});

test('Ignores comments without code blocks', () => {
	const comment = 'stuff and things';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	const processedComment = formatComment(comment);
	expect(format).not.toHaveBeenCalled();
	expect(processedComment).toBe(comment);
});

test('Ignores incompatible code blocks', () => {
	const comment = '```sh\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	const processedComment = formatComment(comment);
	expect(format).not.toHaveBeenCalled();
	expect(processedComment).toBe(comment);
});

test('Ignores comments containing `<!-- prettier-github disable -->`', () => {
	const comment = '<!-- prettier-github disable -->\n```js\n__CODE__\n```';

	const format = jest.fn().mockReturnValue('');
	jest.doMock('prettier', () => ({format}));
	const formatComment = require('./format-comment.js');

	const processedComment = formatComment(comment);
	expect(format).not.toHaveBeenCalled();
	expect(processedComment).toBe(comment);
});
