# Working Mirror

WordPress is great for getting things up and running, but it's big and bloated and far from a finely honed solution to our specific problem.

The biggest one is that even when writing a custom theme with caching plugins enabled, WordPress will always love to hammer the database. It's easy to scale up servers, but it isn't cheap.

Enter [Pelican](https://github.com/getpelican/pelican), a Python-based static site generator. It will take Markdown source files of articles and pages and turn them into a fully static directory of HTML, CSS, JavaScript, and images. That way you'll at most need to set proper `cache-control` per-file and dick around an `.htaccess` file.

## Installation

There's not really a good way to systemically install Pelican plugins other than to include them as submodules ([it even tells you as much](https://github.com/getpelican/pelican-plugins)), so when you clone this repo, you should use the recursive option.

```bash
$ git clone --recursive https://github.com/workingmirror/blog.git
```

Then you need to set up the Python environment.

```bash
$ pyenv virtualenv 2.7.10 blog
$ cd blog/
$ pip install -r requirements.txt
```

There are also front end dependencies for the admin interface, for which you'll need [Yarn](https://yarnpkg.com/).

```bash
$ yarn install
```

## Writing Posts

### Naming Files

We do something a little different from Pelican's suggested usage in that we manually organize our content files.

Within the `/content/` directory, you'll find a hierarchy that should be fairly logical. The highest folders are years, and those contain months, and those contain individual Markdown files.

```
├── content
│   ├── {{YEAR}}
│   │   ├── {{MONTH}}
│   │   │   ├── {{YEAR}}-{{MONTH}}-{{DAY}}-{{SLUG}}.html
│   │   │   └── ...
│   │   └── ...
│   └── ...
│   ├── images
│   └── pages
└── ...
```

This is so that when you crack open this repo in Sublime or `ls` it in your shell, they are at least ordered in some reasonable way.

This includes naming individual posts in the `{{YEAR}}-{{MONTH}}-{{DAY}}-{{SLUG}}.html` pattern.

### Metadata

```Markdown
Title: Some Sort of Review
Date: 2017-01-02T03:04:05+00:00
Modified: 2017-02-03T04:05:06+00:00
Category: Reviews
Subcategories: Movies
Tags: Movie Title, Movie Director, Lead Actor
Slug: some-sort-of-review
Authors: Firstname Lastname
Summary: Read all about it!
Featured: http://i.imgur.com/bF1gdy6.jpg
```

A lot of the metadata should be self-explanatory. `Title`, `Date`, etc.

`Author` should be whatever the key value is in the `AUTHORS` dictionary in `pelicanconf.py`. This means that whenever there is a new author, a new item should be added to `AUTHORS`.

`Featured` is the main header image for the post, similar to the Featured Image in WordPress. It should be the absolute URL to the image.

Pelican supports only a single `Category` out of the box, so we have a custom attribute with `Subcategories`, which works a lot more like `Tags` in that it supports a comma-separated list of other categories. For that reason, here is the preferred structure.

#### Categories

- `News`
- `Reviews`
- `Previews`
- `Features`
- `Opinion`

#### Subcategories

- `Movies`
- `Video Games`
- `Television`
- `Technology`
- Or whatever

`Subcategories` are completely optional, but you should upgrade the `Subcategories` value to the `Category` if there is nothing in `Category` you would use for your post.

#### Reviews

Reviews require some special metadata to help populate structured data. This helps web crawlers find the information they need.

All reviews require the following.

- The first item in `Tags` should be the product title
- `Rating` - a one-out-of-ten numerical value indicating the review score
- `Release` - formatted date string for when the reviewed product was released
- `Website` - URL of product website (can be the Wikipedia page)

##### Movies

- `Genre` - the film's genre; don't shorten names (i.e., "science fiction" instead of "sci-fi")
- `Director` - comma-separated if there are multiple directors
- `Cast` - just the leads or any substantially impactful supporting cast
- `Duration` - use the [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601) (e.g., `PT1H30M`)

##### Video Games

- `Genre` -  using whatever Wikipedia lists is usually a safe bet
- `Developer` - comma-separated if there are multiple studios involved
- `Publisher` - make sure it's publishing arm if it's also a development studio
- `Director` - we'll also take the lead designer
- `Players` - the player count the game allows
- `Platforms` - all available platforms at the time of review

##### TV Shows

- `Season` - numerical season of the show being reviewed
- `Genre` - almost always choose to use `sitcom` over `comedy`
- `Showrunner` - just for the season being reviewed
- `Cast` - keep it to the regular cast
- `Platforms` - restrict it to the platforms it premiered on like `Netflix` or `HBO`

### Embedding Media

We use the [`liquid_tags`](https://github.com/getpelican/pelican-plugins/tree/master/liquid_tags) plugin.

When embedding images, you can use `full-image` as a class name to create a responsive image.

## Working Local

Go ahead and generate the content.

```bash
$ pelican content
$ ./node_modules/.bin/webpack --config webpack.config.js
```

And then launch a server.

```bash
$ cd output/
$ python -m SimpleHTTPServer
```

## Adding New Writers

Since this is all based on Markdown files being committed to this repository, new writers need to first acquire a GitHub account.

Then, that user needs to be added to the [Working Mirror organization](https://github.com/orgs/workingmirror/people).

Finally, there's a big ol' `AUTHORS` dict in `pelicanconf.py` that contains all the required information for when we generate pages. It should follow this structure.

```python
AUTHORS = {
    'Lando Calrissian': {
        'email': 'lando@workingmirror.com',
        'bio': 'You can totally trust me.',
        'twitter': 'lando',
        'facebook': 'lando',
        'instagram': 'lando',
        'website': 'http://landocalrissian.com/',
    },
}
```
