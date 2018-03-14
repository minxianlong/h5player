angular.module('h5player')
    .factory('DomainService', function () {
        var server = '192.168.188.128';
        var domain = 'ipcadm_demo';

        return {
            getDomainUrl: function () {
                return 'http://' + server + '/' + domain + '/';
            }
        }
    });