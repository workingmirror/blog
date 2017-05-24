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

# Theme

THEME = 'theme'

# Jinja2 configuration

JINJA_ENVIRONMENT = {
	'trim_blocks': True,
	'lstrip_blocks': True,
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

DISQUS_SITENAME = 'working-mirror'

# Plugins

PLUGIN_PATHS = ['pelican-plugins']
PLUGINS = ['sitemap', 'liquid_tags.youtube', 'liquid_tags.img']

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
	},
}
