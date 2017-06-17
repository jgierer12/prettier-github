# Prettier GitHub [![Build Status](https://travis-ci.org/jgierer12/prettier-github.svg?branch=master)](https://travis-ci.org/jgierer12/prettier-github)

> Format code in GitHub comments with [`prettier`](https://github.com/prettier/prettier)

## Installation

Install the [Prettier GitHub app](https://github.com/apps/prettier-github) to some or all of your repos

## Usage

Whenever someone includes a JavaScript code block in a comment, it will be formatted using `prettier`.

Before: ![Before](https://user-images.githubusercontent.com/4331946/27002184-bf126a80-4dda-11e7-9806-87d697cbe774.png)

After: ![After](https://user-images.githubusercontent.com/4331946/27002183-b8f78f2c-4dda-11e7-9180-0d4210fee32b.png)

You can disable formatting per-comment by writing `<!-- prettier-github disable -->` anywhere in the comment (except code blocks)

### Limitations

Due to lacking GitHub APIs, `prettier-github` currently doesn't format reviews, review comments and commit comments. See [#11](https://github.com/jgierer12/prettier-github/issues/11)

## License

MIT
