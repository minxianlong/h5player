angular.module('h5player')
    .factory('DataAccessService', function (DomainService, $http) {
        return {
            init: function (data) {
                if (data.Authorization) {
                    $http.defaults.headers.common['Authorization'] = data.Authorization;
                }
            },
            get: function (url) {
                url = DomainService.getDomainUrl() + url;
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
            post: function (url, params) {
                url = DomainService.getDomainUrl() + url;
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
            },
            jsonp: function (url) {
                url = DomainService.getDomainUrl() + url;
                return $http({method: 'JSONP', url: url})
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