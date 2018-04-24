angular.module("h5player")
    .factory('CameraService', function (DataAccessService, ServiceUrlConstant) {
        /*
         { "site_id":0, "cam_list" : [
         { "id": 0, "name":"192.168.1.230", "desc":"192.168.1.230", "state":0 },
         { "id": 1, "name":"192.168.1.231", "desc":"192.168.1.231", "state":0 }
         ] }
         */

        /*{
         "cam_id": 10,
         "site_id": 1,
         "name": "188.188.0.10",
         "desc": "188.188.0.10",
         "ip": "188.188.0.10",
         "port": 554,
         "username": "admin",
         "password": "admin",
         "manu": "hikvision",
         "model": "DS-2CD3345FD",
         "sn": "SNXXX",
         "uuid": "xxxx-xxxx-xxxx-xxxx"
         }*/

        /*{
         "cam_id": 1,
         "site_id": 2,
         "path": "/opt/ipcadm/nginx/html/raw_mp4/192.168.1.231/20180306/01",
         "location": "/raw_mp4/192.168.1.231/20180306/01",
         "err": "2:No such file or directory"
         "timeline": [
         {
         "path": "/opt/ipcadm/nginx/html/raw_mp4/192.168.1.231/20180306/01/300.mp4",
         "uri": "/raw_mp4/192.168.1.231/20180306/01/300.mp4",
         "start": 300,
         "duration": 10
         },
         {
         "path": "/opt/ipcadm/nginx/html/raw_mp4/192.168.1.231/20180306/01/0.mp4",
         "uri": "/raw_mp4/192.168.1.231/20180306/01/0.mp4",
         "start": 0,
         "duration": 10
         },
         {
         "path": "/opt/ipcadm/nginx/html/raw_mp4/192.168.1.231/20180306/01/60.mp4",
         "uri": "/raw_mp4/192.168.1.231/20180306/01/60.mp4",
         "start": 60,
         "duration": 10
         }
         ]
         }*/

        return {
            getCameraList: function (siteId) {
                var url = ServiceUrlConstant.CAMERA_LIST + '?site_id=' + siteId;
                return DataAccessService.get(url)
                    .then(function (response) {
                        if (response.msg == 'success') {
                            response.data.cam_list.forEach(function (camera) {
                                camera.visible = true;
                            });
                            return response.data.cam_list;
                        } else {
                            return [];
                        }
                    })
                    .catch(function () {
                        return [];
                    })
            },

            getCameraInfo: function (siteId, cameraId) {
                var url = ServiceUrlConstant.CAMERA_INFO + '?cam_id=' + cameraId + '&site_id=' + siteId;

                return DataAccessService.get(url)
                    .then(function (response) {
                        if (response.msg == 'success') {
                            return response.data;
                        } else {
                            return {};
                        }
                    })
                    .catch(function () {
                        return {};
                    })
            },

            getCameraTimeline: function (siteId, cameraId, date) {
                var url = ServiceUrlConstant.CAMERA_TIMELINE + '?cam_id=' + cameraId + '&site_id=' + siteId + '&date=' + date;

                return DataAccessService.get(url)
                    .then(function (response) {
                        if (response.msg == 'success') {
                            var data = [];
                            response.data.timeline.forEach(function (timeline) {
                                data.push('./' + location + '/' + timeline.start + '.mp4')
                            });
                            return data;
                        } else {
                            return {};
                        }
                    })
                    .catch(function () {
                        return {};
                    })
            }
        }
    });