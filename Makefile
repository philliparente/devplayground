build: clean
	npm run build
	cp -R dist/ website/

clean:
	rm -rf dist/
	rm -rf website/
	