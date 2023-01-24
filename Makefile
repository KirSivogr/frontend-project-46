gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
test:
	npm test
lint:
	npx eslint .
install-deps:
	npm ci
install:
	npx ci
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --bail --coverage --coverageProvider=v8