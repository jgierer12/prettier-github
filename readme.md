# Prettier GitHub [![Build Status](https://travis-ci.org/jgierer12/prettier-github.svg?branch=master)](https://travis-ci.org/jgierer12/prettier-github)

> Format code in GitHub comments with [Prettier](https://github.com/prettier/prettier)

## Installation

### GitHub app

This is the recommended and easiest installation method. Install the [Prettier GitHub app](https://github.com/apps/prettier-github) to some or all of your repos.

### Self-hosted

1. [![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/jgierer12/prettier-github&env=GITHUB_KEY&env=GITHUB_ID&env=GITHUB_WEBHOOK_SECRET) or [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/jgierer12/prettier-github)
1. Setup
	1. Register a [GitHub app](https://github.com/settings/apps/new)
	1. Use whatever makes sense for you for **App name**, **Description**, **Homepage URL** and **User authorization callback URL**; leave **Setup URL** empty
	1. Set **Webhook URL** to your deployment URL, for example `https://prettier-github.herokuapp.com/`
	1. Set a **Webhook secret** and note it down
	1. Select **Read & write** access for **Issues**, **Pull requests** and **Repository contents**
	1. For **Issues** and **Pull requests**, check **all** Webhook checkboxes; for **Repository contents**, check only **Commit comment**
	1. Click on **Create GitHub app**
	1. Click on **Generate private key** and save the downloaded file
	1. Note down the app **ID** (displayed under your username in the right column)
1. Configure environment variables of your deployment
	1. Set `GITHUB_KEY` to the downloaded private key
	1. Set `GITHUB_ID` to the app ID
	1. Set `GITHUB_WEBHOOK_SECRET` to the Webhook secret you configured

## Usage

Whenever someone includes a JavaScript code block in a comment, it will be formatted using Prettier.

Before: ![Before](https://user-images.githubusercontent.com/4331946/27002184-bf126a80-4dda-11e7-9806-87d697cbe774.png)

After: ![After](https://user-images.githubusercontent.com/4331946/27002183-b8f78f2c-4dda-11e7-9180-0d4210fee32b.png)

You can disable formatting per-comment by writing `<!-- prettier-github disable -->` anywhere in the comment (except code blocks)

### Limitations

Due to lacking GitHub APIs, Prettier GitHub currently doesn't format reviews, review comments and commit comments. See [#11](https://github.com/jgierer12/prettier-github/issues/11)

## Development

1. Generate [personal access token](https://github.com/settings/tokens/new) with the **repo** scope for your GitHub account
1. Run `ngrok http 3000` and note down the URL, for example `http://2ab92a92.ngrok.io`
1. Set up a [webhook](https://developer.github.com/webhooks/creating/#setting-up-a-webhook) for your testing repo
	1. Set **Payload URL** to the ngrok URL
	1. Set **Content type** to `application/json`
	1. Set a **Secret** and note it down
	1. Select **Let me select individual events**; then check **Commit comment**, **Issue comment**, **Issues**, **Pull request**, **Pull request review** and **Pull request review comment** and uncheck **Push**
1. Copy `.env.example`
	1. Set `GITHUB_TOKEN` to the personal access token generated earlier
	1. Set `GITHUB_WEBHOOK_SECRET` to the Webhook secret you configured
1. Run `npm install` and then `npm start`

## License

MIT
