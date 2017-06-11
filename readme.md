# Prettier GitHub [![Build Status](https://travis-ci.org/jgierer12/prettier-github.svg?branch=master)](https://travis-ci.org/jgierer12/prettier-github)

> Format code in GitHub comments with [`prettier`](https://github.com/prettier/prettier)

## Installation

1. Set up a [personal access token](https://github.com/settings/tokens/new) with the **repo** scope
2. Deploy the bot
	1. [![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/jgierer12/prettier-github&env=GITHUB_TOKEN&env=GITHUB_WEBHOOK_SECRET&env=GITHUB_OPTIONS&env=PRETTIER_OPTIONS&env=LANGS) or [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/jgierer12/prettier-github)
	2. Set `GITHUB_TOKEN` to the personal access token generated earlier
	3. Set `GITHUB_WEBHOOK_SECRET` to anything you want
	4. Set `GITHUB_OPTIONS` and `PRETTIER_OPTIONS` to JSON-encoded option objects for [`node-github`](https://github.com/mikedeboer/node-github#example) and [`prettier`](https://github.com/prettier/prettier#options) *(optional)*
	5. Set `LANGS` to a JSON-encoded array of languages that should be formatted *(optional)*
3. Set up a [webhook](https://developer.github.com/webhooks/creating/#setting-up-a-webhook) for your repo with the following options:
	* Payload URL: The URL of your bot (e.g. `prettier-github.now.sh`)
	* Content type: `application/json`
	* Secret: The value of `GITHUB_WEBHOOK_SECRET` you set earlier
	* Events: "Let me select individual events"; select only **Issue comment**

## Usage

Whenever someone includes a JavaScript code block in a comment, it will be formatted using `prettier`.

Before: ![Before](https://user-images.githubusercontent.com/4331946/27002184-bf126a80-4dda-11e7-9806-87d697cbe774.png)

After: ![After](https://user-images.githubusercontent.com/4331946/27002183-b8f78f2c-4dda-11e7-9180-0d4210fee32b.png)

You can disable formatting per-comment by writing `<!-- prettier-github disable -->` anywhere in the comment (except code blocks)

## License

MIT
