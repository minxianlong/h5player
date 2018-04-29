angular.module('h5player')
    .factory('DomainService', function () {
        var server = '172.16.215.128';
        var domain = 'ipcadm_demo';

        return {
            getDomainUrl: function () {
                return 'http://' + server + '/' + domain + '/';
            },

            getBaseUrl: function () {
                return 'http://' + server;
            }
        }
    });