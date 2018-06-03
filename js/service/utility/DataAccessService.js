angular.module('h5player')
    .factory('DataAccessService', function (DomainService, $http) {
        return {
            init: function (data) {
                if (data.Authorization) {
                    $http.defaults.headers.common['Authorization'] = data.Authorization;
                }
            },
            get: function (url, options) {
                if (options && options.useDomainUrl) {
                    url = DomainService.getDomainUrl() + url;
                }

                console.log('get', url);
                return $http.get(url)
                    .then(function (response) {
                        return {
                            msg: 'success',
                            data: response.data,
                            status: response.status
                        }
                    })
                    .catch(function (response) {
                        throw {
                            msg: 'error',
                            data: response.data,
                            status: response.status
                        }
                    })
            },
            post: function (url, params, options) {
                if (options && options.useDomainUrl) {
                    url = DomainService.getDomainUrl() + url;
                }

                return $http.post(url, params)
                    .then(function (response) {
                        return {
                            msg: 'success',
                            data: response.data,
                            status: response.status
                        }
                    })
                    .catch(function (response) {
                        throw {
                            msg: 'error',
                            data: response.data,
                            status: response.status
                        }
                    })
            }
        }
    });