all: dist/index.js

build: clean dist/index.js upgrade

dist/index.js: _build/main.rollup.js dist
	cp _build/main.rollup.js dist/index.js

dist:
	mkdir dist

_build/main.rollup.js: src/main.js
	rollup -c rollup.config.js

clean:
	rm _build/*
	rm dist/*

.PHONY: clean upgrade build

