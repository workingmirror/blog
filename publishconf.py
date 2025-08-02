#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

SITEURL = 'https://workingmirror.com'
RELATIVE_URLS = False

STATIC_CREATE_LINKS = True

FEED_ATOM = 'feed/atom.xml'
FEED_ALL_ATOM = 'feed/all.atom.xml'

FEED_RSS = 'feed/rss.xml'
FEED_ALL_RSS = 'feed/all.rss.xml'

CATEGORY_FEED_ATOM = 'feed/{slug}.atom.xml'
CATEGORY_FEED_RSS = 'feed/{slug}.rss.xml'

AUTHOR_FEED_ATOM = 'feed/{slug}.atom.xml'
AUTHOR_FEED_RSS = 'feed/{slug}.rss.xml'

TAG_FEED_ATOM = 'feed/{slug}.atom.xml'
TAG_FEED_RSS = 'feed/{slug}.rss.xml'

TRANSLATION_FEED_ATOM = 'feed/all-{lang}.atom.xml'
TRANSLATION_FEED_RSS = 'feed/all-{lang}.rss.xml'

DELETE_OUTPUT_DIRECTORY = True

DISQUS_SITENAME = 'working-mirror'

GOOGLE_ANALYTICS = 'UA-89220104-1'

ADSENSE_CLIENT_ID = 'pub-9133216129946194'
ADSENSE_SLOT_ID = '8489770069'
