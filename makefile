LINT = $(PWD)/node_modules/.bin/eslint
JEST = $(PWD)/node_modules/.bin/jest
BABEL = $(PWD)/node_modules/.bin/babel

DIR ?= src

install:
	yarn install
	yarn add axios emoji-regex fast-xml-parser file-box he jimp jsqr qrcode --peer

build:
	$(BABEL) src -d . --copy-files

watch:
	$(BABEL) -w src -d . --copy-files

lint:
	$(LINT) --format 'node_modules/eslint-friendly-formatter' --fix src/*.js

test: lint
	$(JEST) --env=node --coverage --runInBand $(DIR)

dev:
	$(JEST) -o --watch --runInBand --forceExit $(DIR)

publish: build
	npm publish

.PHONY: test lint dev build watch publish install
