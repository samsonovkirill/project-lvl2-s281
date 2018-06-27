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
build:
	npm run build
	npm run eslint .
	npm run test
travis:
	npm run eslint .
	npm run test
