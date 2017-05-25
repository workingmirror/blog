'use strict';

// Parallax backgrounds

(function () {
	var isTicking,
		viewHeight,
		elemTops = [],
		elemHeights = [],
		scrollElements = document.querySelectorAll('.parallax-background'),
		MAX_SHIFT = 100;

	if (scrollElements.length > 0) {
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
				scrollElements[i].style.backgroundPosition = 'center calc(50% + ' + (-MAX_SHIFT * (scrollDiff / viewHeight)) + 'px)';
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
