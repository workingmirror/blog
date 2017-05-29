import six
import hashlib

from pelican import signals

def generate_url(author, generator):
	email = ''
	if author.name in generator.settings['AUTHORS'] and 'email' in generator.settings['AUTHORS'][author.name]:
		email = generator.settings['AUTHORS'][author.name]['email']
	return 'https://www.gravatar.com/avatar/' + hashlib.md5(six.b(email).lower()).hexdigest()

def add_gravatar(generator, metadata):
	if 'authors' in metadata:
		for author in metadata['authors']:
			author.gravatar_url = generate_url(author, generator)

def register():
	signals.article_generator_context.connect(add_gravatar)
