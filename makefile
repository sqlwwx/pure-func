LINT = $(PWD)/node_modules/.bin/eslint
JEST = $(PWD)/node_modules/.bin/jest
BABEL = $(PWD)/node_modules/.bin/babel

DIR ?= src

build:
	$(BABEL) src -d . --copy-files

buildWatch:
	$(BABEL) -w src -d . --copy-files

lint:
	$(LINT) --format 'node_modules/eslint-friendly-formatter' --fix src/*.js

test: lint
	$(JEST) --coverage --runInBand $(DIR)

dev:
	$(JEST) -o --watch --runInBand --forceExit $(DIR)

.PHONY: test lint dev build buildWatch
