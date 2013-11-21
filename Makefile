test:
	mocha
coverage:
	mocha -r blanket -R html-cov > coverage.html

.PHONY: test coverage