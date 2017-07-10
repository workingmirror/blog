'use strict';

import './../css/admin.css';
import 'angular-material/angular-material.css';

import angular from 'angular';
import 'angular-material';
import 'satellizer';
import AWS from 'aws-sdk';
import Promise from 'promise';

/**
 * Wrapper class for S3 object management, specifically for images.
 * @class
 */
class Pixer {
	/**
	 * Set the AWS config and create an S3 connection.
	 */
	constructor(settings) {
		this.settings = angular.extend({
			bucket: 'wm-blog-post-images',
			region: 'us-west-2',
			poolId: 'us-west-2:f6e47da1-f45e-4577-977b-434997a4c115',
		}, settings);

		AWS.config.update({
			region: this.settings.region,
			credentials: new AWS.CognitoIdentityCredentials({
				IdentityPoolId: this.settings.poolId,
			}),
		});

		this.s3 = new AWS.S3({
			apiVersion: '2006-03-01',
			params: {
				Bucket: this.settings.bucket,
			},
		});
	}

	/**
	 * Get all the album names in the S3 bucket.
	 * @param {object} [settings] - A configuration object compatible with `s3.listObjectsV2()`.
	 * @return {Promise} Promise will resolve to a list of album names.
	 */
	listAlbums(settings) {
		var params = Pixer.normalizeListParameters(settings);

		return new Promise(function (fulfill, reject) {
			params.Delimiter = '/';

			this.s3.listObjectsV2(params, function (err, data) {
				if (err) {
					console.log('err', err);
					reject(err);
				} else {
					console.log('data', data);
					fulfill({
						count: data.KeyCount,
						nextToken: 'NextContinuationToken' in data ? data.NextContinuationToken : false,
						albums: data.CommonPrefixes.map(function (currentValue) {
							return decodeURIComponent(currentValue.Prefix.slice(0, -1));
						}),
					});
				}
			});
		}.bind(this));
	}

	/**
	 * Create an album in the S3 bucket.
	 * @param {string} albumName - Name of the album to create.
	 * @return {Promise} Promise will resolve to the album name.
	 */
	createAlbum(albumName) {
		return new Promise(function (fulfill, reject) {
			albumName = albumName.trim();

			if (albumName === '') {
				return reject({
					Message: 'Album name cannot be empty',
				});
			} else if (albumName.indexOf('/') > -1) {
				return reject({
					Message: 'Album name cannot contain slashes',
				});
			}

			var albumKey = encodeURIComponent(albumName) + '/';

			this.s3.headObject({
				Key: albumKey,
			}, function (err, data) {
				if (!err) {
					return reject({
						Message: 'Album ' + albumName + ' already exists',
					});
				} else if (err.code !== 'NotFound') {
					return reject(err);
				}

				this.s3.putObject({
					Key: albumKey,
				}, function (err, data) {
					if (err) {
						console.log('err', err);
						reject(err);
					} else {
						console.log('data', data);
						fulfill(albumName);
					}
				});
			}.bind(this));
		}.bind(this));
	}

	/**
	 * Get the contents of the album.
	 * @param {string} albumName - Name of the album to fetch.
	 * @return {Promise} Promise will resolve to a list of photo objects.
	 */
	viewAlbum(albumName, settings) {
		var params = Pixer.normalizeListParameters(settings),
			albumBucketName = this.settings.bucket;

		return new Promise(function (fulfill, reject) {
			params.Prefix = encodeURIComponent(albumName.trim()) + '//';

			this.s3.listObjectsV2(params, function (err, data) {
				if (err) {
					console.log('err', err);
					reject(err);
				} else {
					console.log('data', data);

					var bucketUrl = this.request.httpRequest.endpoint.href + albumBucketName + '/';

					fulfill({
						count: data.KeyCount,
						nextToken: 'NextContinuationToken' in data ? data.NextContinuationToken : false,
						photos: data.Contents.map(function (photo) {
							return bucketUrl + encodeURIComponent(photo.Key);
						}),
					});
				}
			});
		}.bind(this));
	}

	/**
	 * Add a photo to an album.
	 * @param {string} albumName - Name of the album to add to.
	 * @param {object} photo - `File` object to upload.
	 * @return {Promise} Promise will resolve to the created S3 object.
	 */
	addPhoto(albumName, photo) {
		return new Promise(function (fulfill, reject) {
			this.s3.upload({
				Key: encodeURIComponent(albumName.trim()) + '//' + photo.name,
				Body: photo,
				ACL: 'public-read',
			}, function (err, data) {
				if (err) {
					console.log('err', err);
					reject(err);
				} else {
					console.log('data', data);
					fulfill(data);
				}
			});
		}.bind(this));
	}

	/**
	 * Delete a photo from an album.
	 * @param {string} albumName - Name of the album to delete from.
	 * @param {string} photoKey - Key of the S3 object to delete.
	 * @return {Promise} Promise will resolve to boolean indicating deletion status.
	 */
	deletePhoto(albumName, photoKey) {
		return new Promise(function (fulfill, reject) {
			this.s3.deleteObject({
				Key: photoKey,
			}, function (err, data) {
				if (err) {
					console.log('err', err);
					reject(err);
				} else {
					console.log('data', data);
					fulfill(data.DeleteMarker);
				}
			});
		}.bind(this));
	}

	/**
	 * Delete an album.
	 * @param {string} albumName - Name of the album to delete.
	 * @return {Promise} Promise will resolve to boolean indicating deletion status.
	 */
	deleteAlbum(albumName) {
		return new Promise(function (fulfill, reject) {
			this.s3.listObjects({
				Prefix: encodeURIComponent(albumName.trim()) + '/',
			}, function (err, data) {
				if (err) {
					return reject(err);
				}

				this.s3.deleteObjects({
					Delete: {
						Objects: data.Contents.map(function (object) {
							return {Key: object.Key};
						}),
						Quiet: true,
					},
				}, function (err, data) {
					if (err) {
						console.log('err', err);
						reject(err);
					} else {
						console.log('data', data);
						fulfill({
							Deleted: data.Deleted.map(function (currentValue) {
								return {
									Key: currentValue.Key,
									didDelete: currentValue.DeleteMarker,
								};
							}),
							Errors: data.Errors.map(function (currentValue) {
								return {
									Key: currentValue.Key,
									Message: currentValue.Message,
								};
							}),
						});
					}
				});
			}.bind(this));
		}.bind(this));
	}

	static normalizeListParameters(settings) {
		var params = {};

		if (typeof settings === 'object') {
			if ('StartAfter' in settings && typeof settings.Prefix === 'string') {
				params.StartAfter = settings.StartAfter;
			}
			if ('ContinuationToken' in settings && typeof settings.Prefix === 'string') {
				params.ContinuationToken = settings.ContinuationToken;
			}
			if ('Prefix' in settings && typeof settings.Prefix === 'string') {
				params.Prefix = settings.Prefix;
			}
		}

		return params;
	}
}

angular.module('blogAdmin', [
	'ngMaterial',
	'satellizer',
]).config(function ($authProvider, $interpolateProvider) {
	$authProvider.github({
		clientId: '57c59367ed7eaf7f9e27',
		redirectUri: 'http://local.workingmirror.com:8000/admin/',
		url: 'http://local.workingmirror.com:3000/auth/',
		scope: ['user:email'],
	});

	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
}).run(function ($rootScope) {
	$rootScope.isLoading = false;

	$rootScope.VIEW_STATE_LIST = 0;
	$rootScope.VIEW_STATE_ALBUM = 1,
	$rootScope.VIEW_STATE_PHOTO = 2;
}).controller('BaseCtrl', function ($scope, $rootScope, $auth) {
	$scope.isAuthenticated = $auth.isAuthenticated();

	/**
	 * Pops open the satellizer github OAuth window.
	 * @return {Promise} Promise object for awaiting API response.
	 */
	$scope.login = function () {
		$rootScope.isLoading = true;

		return $auth.authenticate('github').then(function (data) {
			console.log('success', data);
			$scope.isAuthenticated = true;
		}).catch(function (data) {
			console.log('error', data);
			$scope.logout();
		}).finally(function () {
			$rootScope.isLoading = false;
		});
	};

	/**
	 * Clear our the satellizer authentication and reset the state.
	 */
	$scope.logout = function () {
		$auth.logout();
		$scope.isAuthenticated = false;
	};

	/**
	 * Set the view to the albums list
	 */
	$scope.viewList = function () {
		$rootScope.viewState = $rootScope.VIEW_STATE_LIST;
	};

	/**
	 * Set the view to the selected album.
	 * @param {string} albumName - Name of the album to view.
	 */
	$scope.viewAlbum = function (albumName) {
		$scope.albumName = albumName;
		$rootScope.viewState = $rootScope.VIEW_STATE_ALBUM;
	};

	$scope.viewList();
}).controller('ListCtrl', function ($scope, $rootScope, $mdDialog, pixerService) {
	$scope.albums = [];
	$scope.albumCount = 0;
	$scope.nextToken = false;

	$scope.listAlbums = function (searchPrefix) {
		$rootScope.isLoading = true;

		pixerService.listAlbums({
			Prefix: typeof searchPrefix === 'string' ? searchPrefix : null,
		}).then(function (data) {
			console.log('success', data);
			$scope.albums = data.albums;
			$scope.albumCount = data.count;
			$scope.nextToken = data.nextToken;
		}).catch(function (data) {
			console.log('error', data);
		}).finally(function () {
			$scope.$apply(function () {
				$rootScope.isLoading = false;
			});
		});
	}

	$scope.listAlbums();

	$scope.createAlbum = function (albumName) {
		$rootScope.isLoading = true;

		pixerService.createAlbum(albumName).then(function (data) {
			console.log('success', data);
			$scope.albumCount++;
			$scope.newAlbumName = '';
			$scope.albums.unshift(data);
		}).catch(function (data) {
			console.log('error', data);
		}).finally(function () {
			$scope.$apply(function () {
				$rootScope.isLoading = false;
			});
		});
	};

	$scope.showDeleteDialog = function (albumName) {
		$mdDialog.show(
			$mdDialog.confirm()
				.title('Are you sure you want to delete the album ' + albumName + '?')
				.textContent('This cannot be undone and all contained photos will be deleted as well.')
				.ariaLabel('Delete album')
				.ok('Delete album')
				.cancel('Cancel')
		).then(function () {
			$scope.deleteAlbum(albumName);
		});
	};

	$scope.deleteAlbum = function (albumName) {
		$rootScope.isLoading = true;

		pixerService.deleteAlbum(albumName).then(function (data) {
			console.log('success', data);
			$scope.albums.splice($scope.albums.findIndex(function (element) {
				return element === albumName;
			}), 1);
			$scope.albumCount--;
		}).catch(function (data) {
			console.log('error', data);
		}).finally(function () {
			$scope.$apply(function () {
				$rootScope.isLoading = false;
			});
		});
	};
}).controller('AlbumCtrl', function ($scope, $rootScope, $mdDialog, pixerService) {
	$scope.photos = [];
	$scope.photoCount = 0;
	$scope.nextToken = false;

	$scope.viewAlbum = function () {
		$rootScope.isLoading = true;

		pixerService.viewAlbum($scope.albumName).then(function (data) {
			console.log('success', data);
			$scope.photos = data.photos;
			$scope.photoCount = data.count;
			$scope.nextToken = data.nextToken;
		}).catch(function (data) {
			console.log('error', data);
		}).finally(function () {
			$scope.$apply(function () {
				$rootScope.isLoading = false;
			});
		});
	};

	$scope.viewAlbum();
}).service('pixerService', function () {
	return new Pixer();
});
