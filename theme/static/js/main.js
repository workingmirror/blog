'use strict';

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
