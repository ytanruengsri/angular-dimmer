'use strict';

angular.module('demo', ['ngRoute', 'ngResource', 'dimmerModule'])
    .config(['$httpProvider', function ($httpProvider) {
        var $http,
            interceptor = ['$q', '$injector', '$timeout', '$dimmer', function ($q, $injector, $timeout, $dimmer) {
                function success(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    if($http.pendingRequests.length < 1) {
                        $timeout(function() {
                            $dimmer.hide();
                        }, 2000);
                    }
                    return response;
                }

                function error(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    if($http.pendingRequests.length < 1) {
                        $timeout(function() {
                            $dimmer.hide();
                        }, 2000);
                    }
                    return $q.reject(response);
                }

                return function (promise) {
                    $dimmer.show();
                    return promise.then(success, error);
                }
            }];

        $httpProvider.responseInterceptors.push(interceptor);
    }])
    .factory('DemoService', ['$resource', function($resource) {
        return $resource(
            'http://api.openweathermap.org/data/2.5/weather',
            null,
            {
                'demo': { method: 'GET', 'params': {'q':'Berlin'}, isArray: false }
            }
        );
    }])
    .controller('AngularDimmerDemoController', ['$scope', '$http', 'DemoService',
        function($scope, $http, DemoService) {
            console.log('initialize controller ...');
            $scope.city = '';
            $scope.weatherResult = null;

            $scope.search = function() {
                DemoService.demo({'q': $scope.city})
                .$promise.then(function (result) {
                    $scope.weatherResult = result;
                });
            };

            $scope.isEmpty = function() {
                return angular.isUndefined($scope.city) || $scope.city === '';
            };

            $scope.showResult = function() {
                return angular.isDefined($scope.weatherResult) && $scope.weatherResult !== null;
            };

            $scope.$watch('city', function(newVal) {
                if (newVal === '') {
                    $scope.weatherResult = null;
                }
            });
        }
    ]);