install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm run test
watch:
	npm run watch
travis: lint test

build:
	rm -rf dist
	npm run build
	make lint
	make test

