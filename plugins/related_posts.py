import random

from pelican import signals

MIN_POSTS = 3
MAX_POSTS = 5

def find_unique(items, item_set, content, unique_key='url'):
	unique_items = []
	for item in items:
		if getattr(item, unique_key) != getattr(content, unique_key) and getattr(item, unique_key) not in item_set:
			item_set.add(getattr(item, unique_key))
			unique_items.append(item)
	return unique_items

def find_tag_posts(generator, content, related_posts=None):
	tags = random.sample(content.tags, min(len(content.tags), MAX_POSTS))

	articles = []
	article_set = set()

	if related_posts:
		for article in related_posts:
			article_set.add(article.url)

	for tag in tags:
		if len(articles) > MAX_POSTS:
			break
		articles += find_unique(generator.tags[tag], article_set, content)

	return random.sample(articles, min(len(articles), MAX_POSTS))

def find_category_posts(generator, content, related_posts=None):
	article_set = set()
	category_hash = {category[0]: category[1] for category in generator.categories}

	if related_posts:
		for article in related_posts:
			article_set.add(article.url)

	articles = find_unique(category_hash[content.category], article_set, content)
	return random.sample(articles, min(len(articles), MAX_POSTS))

def find_author_posts(generator, content, related_posts=None):
	articles = []
	article_set = set()

	author_hash = {author[0]: author[1] for author in generator.authors}
	authors = random.sample(content.authors, min(len(content.authors), MAX_POSTS))

	for author in authors:
		if len(articles) > MAX_POSTS:
			break
		articles += find_unique(author_hash[author], article_set, content)

	return random.sample(articles, min(len(articles), MAX_POSTS))

def set_related_posts(generator, content):
	related_posts = find_tag_posts(generator, content)

	if len(related_posts) < MIN_POSTS:
		related_posts += find_category_posts(generator, content, related_posts)

	if len(related_posts) < MIN_POSTS:
		related_posts += find_author_posts(generator, content, related_posts)

	if len(related_posts) > MAX_POSTS:
		related_posts = random.sample(related_posts, MAX_POSTS)

	content.related_posts = related_posts

def register():
	signals.article_generator_write_article.connect(set_related_posts)
