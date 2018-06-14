LINT = $(PWD)/node_modules/.bin/eslint
JEST = $(PWD)/node_modules/.bin/jest

DIR ?= .

lint:
	$(LINT) --format 'node_modules/eslint-friendly-formatter' --fix ./*.js

test: lint
	$(JEST) --coverage --runInBand $(DIR)

dev:
	$(JEST) -o --watch --runInBand --forceExit $(DIR)

.PHONY: test lint dev
