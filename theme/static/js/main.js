'use strict';

// Dynamic header

(function () {
	var isTicking = false,
		didHitTop = false,
		shouldHideHeader = false,
		shouldLockHeader = false,
		lastScroll = 0,
		lastChange = 0,
		headerElem = document.querySelector('.header'),
		headerHeight = headerElem.offsetHeight,
		SCROLL_THRESHOLD = 5,
		SHEER_CLASS = 'sheer',
		SLIM_CLASS = 'slim',
		LOCK_CLASS = 'lock-header',
		HIDE_CLASS = 'hide',
		IS_SHEER = headerElem.classList.contains(SHEER_CLASS);

	function onScroll() {
		if (isTicking !== true) {
			isTicking = true;
			window.requestAnimationFrame(scrollStep);
		}
	}

	function scrollStep() {
		isTicking = false;

		var currentScroll = window.scrollY,
			currentDelta = currentScroll - lastScroll,
			lastDelta = currentScroll - Math.abs(lastChange);

		if (currentScroll === 0) {
			didHitTop = true;
			shouldHideHeader = false;
			shouldLockHeader = false;
			lastChange = 0;
		} else if (currentDelta > 0) {
			if (lastChange <= 0) {
				lastChange = currentDelta;
			} else if (lastDelta > SCROLL_THRESHOLD && currentScroll > headerHeight) {
				didHitTop = false;
				shouldHideHeader = true;
				shouldLockHeader = true;
			}
		} else if (currentDelta < 0) {
			if (lastChange >= 0) {
				lastChange = currentDelta;
			} else if (Math.abs(lastDelta) > SCROLL_THRESHOLD) {
				shouldHideHeader = false;
				shouldLockHeader = true;
			}
		}

		lastScroll = currentScroll;

		if (shouldHideHeader === true) {
			headerElem.classList.add(HIDE_CLASS);
		} else {
			headerElem.classList.remove(HIDE_CLASS);
		}

		if (shouldLockHeader === true) {
			document.body.classList.add(LOCK_CLASS);
			headerElem.classList.add(SLIM_CLASS);
			if (IS_SHEER === true) {
				headerElem.classList.remove(SHEER_CLASS);
			}
		} else {
			document.body.classList.remove(LOCK_CLASS);
			headerElem.classList.remove(SLIM_CLASS);
			if (IS_SHEER === true) {
				headerElem.classList.add(SHEER_CLASS);
			}
		}
	}

	window.addEventListener('scroll', onScroll);

	onScroll();
})();

// Parallax backgrounds

(function () {
	var isTicking,
		viewHeight,
		elemTops = [],
		elemHeights = [],
		scrollElements = document.querySelectorAll('.parallax-background'),
		MAX_SHIFT = 100;

	if (scrollElements.length > 0) {
		for (var i = 0, l = scrollElements.length; i < l; i++) {
			if (!scrollElements[i].getAttribute('parallax-start')) {
				scrollElements[i].setAttribute('parallax-start', '0%');
			}
		}
		attachScrollListener();
	}

	function attachScrollListener() {
		window.addEventListener('resize', onResize);
		window.addEventListener('scroll', onScroll);

		onResize();
		onScroll();
	}

	function onScroll() {
		if (isTicking !== true) {
			isTicking = true;
			window.requestAnimationFrame(scrollStep);
		}
	}

	function onResize() {
		viewHeight = window.innerHeight;
		for (var scrollPosition = window.scrollY, i = 0, l = scrollElements.length; i < l; i++) {
			var clientRect = scrollElements[i].getBoundingClientRect();
			elemTops[i] = scrollPosition + clientRect.top;
			elemHeights[i] = clientRect.height * -1;
		}
	}

	function scrollStep() {
		isTicking = false;
		for (var scrollPosition = window.scrollY, i = 0, l = scrollElements.length; i < l; i++) {
			var scrollDiff = elemTops[i] - scrollPosition;
			if (scrollDiff < viewHeight && scrollDiff > elemHeights[i]) {
				scrollElements[i].style.backgroundPosition = 'center calc(' + scrollElements[i].getAttribute('parallax-start') + ' + ' + (-MAX_SHIFT * (scrollDiff / viewHeight)) + 'px)';
			}
		}
	}
})();

// Search handling

(function () {
	var searchForm = document.querySelector('#search'),
		searchInput = searchForm.querySelector('input[type="text"]'),
		searchClose = searchForm.querySelector('.search-close'),
		searchButton = document.querySelector('.search-button');

	searchButton.addEventListener('click', function (ev) {
		ev.preventDefault();
		openSearch();
	});

	searchForm.addEventListener('submit', function (ev) {
		ev.preventDefault();
	});

	searchClose.addEventListener('click', function (ev) {
		ev.preventDefault();
		closeSearch();
	});

	searchInput.addEventListener('keydown', function (ev) {
		var keyCode = ev.keyCode || ev.which;

		if (keyCode === 27) {
			if (searchInput.value === '') {
				closeSearch();
			} else {
				clearSearch();
			}
		} else if (keyCode === 13) {
			ev.preventDefault();
		}
	});

	function openSearch() {
		searchForm.classList.add('show');
		searchInput.focus();
	}

	function closeSearch() {
		clearSearch();
		searchForm.classList.remove('show');
		searchInput.blur();
	}

	function clearSearch() {
		searchInput.value = '';
	}
})();
