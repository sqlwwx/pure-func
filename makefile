LINT = npx eslint
JEST = npx jest
BABEL = npx babel
FORMATTER = $(shell node -p "require.resolve('eslint-friendly-formatter')")

DIR ?= src

install:
	yarn
	yarn global add jsinspect

build:
	NODE_ENV=production $(BABEL) src -d . --copy-files

watch:
	$(BABEL) -w src -d . --copy-files

lint:
	$(LINT) --format $(FORMATTER) --fix src/*.js

test: lint
	dd if=/dev/zero of=/tmp/qetag_100 bs=1M count=100
	$(JEST) --env=node --coverage --runInBand $(DIR)
	rm -rf /tmp/qetag_100

dev:
	$(JEST) -o --watch --runInBand --forceExit $(DIR)

publish: build
	npm publish

RELEASES = patch minor major
.PHONY: $(RELEASES)
$(RELEASES):
	$(PWD)/node_modules/.bin/standard-version --release-as $@
	git push --follow-tags origin master

.PHONY: test lint dev build watch publish install
