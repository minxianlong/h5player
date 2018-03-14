angular.module("h5player")
    .factory('SiteListService', function (DataAccessService, ServiceUrlConstant) {
        /*
        { "site_list" : [
         { "site_id":0, "name":"site_1", "desc":"TBD", "failover":"site_backup", "node_list": [
          { "node_id": 0, "name":"192.168.1.10", "address":"192.168.1.10", "status":0 },
          { "node_id": 1, "name":"192.168.1.11", "address":"192.168.1.11", "status":0 },
          { "node_id": 2, "name":"192.168.1.12", "address":"192.168.1.12", "status":0 }
         ] },
         { "site_id":1, "name":"site_2", "desc":"TBD", "failover":"site_backup", "node_list": [
          { "node_id": 3, "name":"192.168.2.20", "address":"192.168.2.20", "status":0 },
          { "node_id": 4, "name":"192.168.2.21", "address":"192.168.2.21", "status":0 },
          { "node_id": 5, "name":"192.168.2.22", "address":"192.168.2.22", "status":0 }
         ] },
         { "site_id":2, "name":"site_backup", "desc":"TBD", "failover":"", "node_list": [
          { "node_id": 6, "name":"192.168.3.30", "address":"192.168.3.30", "status":0 },
          { "node_id": 7, "name":"192.168.3.31", "address":"192.168.3.31", "status":0 },
          { "node_id": 8, "name":"192.168.3.32", "address":"192.168.3.32", "status":0 }
         ] }
        ] }
         */

        return {
            getSiteList: function () {
                return DataAccessService.get(ServiceUrlConstant.SITE_LIST)
                    .then(function (response) {
                        if (response.msg == 'success') {
                            return response.data;
                        } else {
                            return [];
                        }
                    })
                    .catch(function (e) {
                        return [];
                    })
            }
        }
    });