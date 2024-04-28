make:
	@echo "Run either 'make sprites' or 'make test'"

sprites:
	python utils/utils.py

tests:
	python -m pytest utils/tests/
