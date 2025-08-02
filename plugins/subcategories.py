from pelican import signals
from pelican.urlwrappers import Category

def process_article(article, category_hash):
	if not hasattr(article, 'subcategories'):
		return

	for subcategory in article.subcategories:
		if subcategory not in category_hash:
			category_hash[subcategory] = (Category(subcategory, article.category.settings), [])

		category_hash[subcategory][1].append(article)

def digest_subcategories(generator):
	category_hash = {category[0].name: category for category in generator.categories}

	for article in generator.articles:
		process_article(article, category_hash)

	generator.categories = [category for name, category in category_hash.items()]

def convert_subcategories(generator):
	for article in generator.articles:
		if hasattr(article, 'subcategories'):
			article.subcategories = [subcategory.strip() for subcategory in article.subcategories.split(',')]
		else:
			article.subcategories = []

def register():
	signals.article_generator_finalized.connect(digest_subcategories)
	signals.article_generator_pretaxonomy.connect(convert_subcategories)
