'use strict';

import './../css/admin.css';
import 'angular-material/angular-material.css';

import angular from 'angular';
import 'angular-material';
import 'satellizer';

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
}).controller('RootCtrl', function ($scope, $auth) {
	$scope.isLoading = false;
	$scope.isAuthenticated = $auth.isAuthenticated();

	$scope.login = function () {
		$scope.isLoading = true;

		$auth.authenticate('github').then(function (data) {
			console.log('success', data);
			$scope.isAuthenticated = true;
		}).catch(function (data) {
			console.log('error', data);
			$scope.logout();
		}).finally(function () {
			$scope.isLoading = false;
		});
	};

	$scope.logout = function () {
		$auth.logout();
		$scope.isAuthenticated = false;
	};
});
