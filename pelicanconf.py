#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Tim Poon'

SITENAME = u'Working Mirror'
SITESUBTITLE = u'We write about a lot of stuff a lot'
SITEDESCRIPTION = u'You\'re curious about video games, movies, TV, and more. We\'re here for you.'

SITEURL = ''
RELATIVE_URLS = True

PATH = 'content'
DEFAULT_PAGINATION = 10

TIMEZONE = 'US/Central'
DEFAULT_LANG = u'en'
DEFAULT_DATE_FORMAT = '%b %d, %Y'

# Output

ARTICLE_URL = '{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'

PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'
TAGS_SAVE_AS = 'tags/index.html'

AUTHOR_URL = 'author/{slug}/'
AUTHOR_SAVE_AS = 'author/{slug}/index.html'
AUTHORS_SAVE_AS = 'authors/index.html'

CATEGORY_URL = 'category/{slug}/'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
CATEGORIES_SAVE_AS = 'categories/index.html'

ARCHIVES_SAVE_AS = 'archives/index.html'

PAGINATION_PATTERNS = (
	(1, '{base_name}/', '{base_name}/index.html'),
	(2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

# Static files

STATIC_PATHS = ['images', 'extra/robots.txt', 'extra/favicon.png']
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/favicon.png': {'path': 'favicon.png'},
}

# Theme

THEME = 'theme'

# Jinja2 configuration

JINJA_ENVIRONMENT = {
	'trim_blocks': True,
	'lstrip_blocks': True,
	'extensions': [
		'jinja2.ext.do',
		'jinja2.ext.with_',
	],
}

# Feed generation is usually not desired when developing

FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Facebook

FACEBOOK_ADMINS = ['16739672']

# Disqus

DISQUS_SITENAME = 'testing-working-mirror'

# Plugins

PLUGIN_PATHS = ['pelican-plugins', 'plugins']
PLUGINS = ['sitemap', 'liquid_tags.youtube', 'liquid_tags.img', 'gravatar', 'subcategories', 'related_posts']

# Sitemap

SITEMAP = {
	'format': 'xml',
	'exclude': ['tag/', 'category/'],
}

# Authors

AUTHORS = {
	'Tim Poon': {
		'email': 'tim@workingmirror.com',
		'bio': 'Computer scientist turned journalist. Send tips to <a href="mailto:tim@workingmirror.com">tim@workingmirror.com</a>.',
		'twitter': 'mockenoff',
		'facebook': 'timpoon',
		'instagram': 'mockenoff',
		'website': 'http://timothypoon.com/',
	},
}

# Categories

CATEGORIES = {
	'News': {
		'type': 'NewsArticle',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-news.jpg',
		'description': 'The hottest scoops on movies, video games, and TV. Come get some.',
	},
	'Reviews': {
		'type': 'Review',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-reviews.jpg',
		'description': 'Don\'t waste your money until you know you\'re going to waste it.',
	},
	'Features': {
		'type': 'Article',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-features.jpg',
		'description': 'The classic, the timeless, and the evergreen.',
	},
	'Opinion': {
		'type': 'Article',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-opinion.jpg',
		'description': 'We have some thoughts that we want your thoughts on.',
	},
	'Previews': {
		'type': 'Article',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-previews.jpg',
		'description': 'Get ahead of the curve and check out the things yet to come.',
	},
	'Video Games': {
		'type': 'VideoGame',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-video-games.jpg',
		'description': 'Twiddling thumbs and joying sticks.',
		'metadata': ['release', 'genre', 'developer', 'publisher', 'director', 'players', 'platforms', 'price'],
	},
	'Movies': {
		'type': 'Movie',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-movies.jpg',
		'description': 'Singe your eyeballs on the big screen.',
		'metadata': ['release', 'genre', 'director', 'cast', 'duration'],
	},
	'Television': {
		'type': 'TVSeries',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-television.jpg',
		'description': 'Find out what\'s worth binging on and what you should ignore.',
		'metadata': ['season', 'release', 'genre', 'showrunner', 'cast', 'platforms'],
	},
	'Technology': {
		'type': 'Product',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-technology.jpg',
		'description': 'It\'s everywhere and you can\'t avoid it, so you might as well get with it.',
		'metadata': ['release', 'manufacturer', 'price'],
	},
	'Comic Books': {
		'type': 'ComicIssue',
		'image': 'https://workingmirror.com/blog/wp-content/uploads/2016/12/category-comic-books.jpg',
		'description': 'Stacks on stacks on stacks, man.',
		'metadata': ['release', 'issue', 'creator', 'publisher', 'artist', 'colorist', 'inker', 'letterer', 'penciler'],
	},
}
