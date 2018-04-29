angular.module("h5player")
    .controller('MainController', function ($scope, $q, $route, SiteService, CameraService) {
        //Help functions
        function timeUpdate() {
            var index = this.playlist.currentIndex();
            var currentTime = this.currentTime();

            this.playData.width = (currentTime + index * 10) * 100 / (this.playData.playlist.length * 10) + '%';

            $scope.$apply();
        }


        function refreshCamera() {
            var total = $scope.selectedMode.value * $scope.selectedMode.value;
            var count = 0;
            $scope.cameraList.forEach(function (camera) {
                if (camera.visible)
                    count++;
            });

            $scope.cameraSelDisable = (count >= total);
        }

        function refreshPlayData() {
            var siteId = $scope.selectedSite.site_id;
            $scope.playerData = [];

            var playerCnt = 0;
            var promise = [];
            $scope.cameraList.forEach(function (camera) {
                if (camera.visible) {
                    playerCnt++;

                    promise.push(CameraService.getCameraTimeline(siteId, camera.id, '2018030601')
                        .then(function (data) {
                            var playData = {
                                id: 'cam_' + camera.id,
                                name: camera.name,
                                visible: true,
                                playlist: [],
                                width: '0%'
                            };

                            console.log('siteId=' + siteId + 'cameraId=' + camera.id + 'data=' + JSON.stringify(data));
                            data.forEach(function (path) {
                                playData.playlist.push({
                                    sources: [{
                                        src: path,
                                        type: 'video/mp4'
                                    }]
                                });
                            });

                            $scope.playerData.push(playData);
                        })
                    )
                }
            });

            return $q.all(promise)
                .then(function () {
                    var total = $scope.selectedMode.value * $scope.selectedMode.value;

                    while (playerCnt < total) {
                        playerCnt++;
                        $scope.playerData.push(
                            {
                                id: 'cam_unknown_' + playerCnt,
                                name: 'Unknown Camera',
                                visible: false,
                                playlist: [{
                                    sources: [{
                                        src: 'res/1.mp4',
                                        type: 'video/mp4'
                                    }]
                                }],
                                width: '0%'
                            }
                        )
                    }
                })
        }

        function refreshVideoPlayer() {
            $scope.videoPlayers = {};

            var total = $scope.selectedMode.value * $scope.selectedMode.value;
            $(document).ready(function () {
                for (var i = 0; i < total; i++) {
                    var id = $scope.playerData[i].id;
                    var player = videojs(id, {
                        controls: false,
                        autoplay: false,
                        loop: false,
                        preload: 'auto'
                    });

                    player.playData = $scope.playerData[i];
                    player.playlist($scope.playerData[i].playlist);
                    player.playlist.autoadvance(0);
                    player.on("timeupdate", timeUpdate);
                    $scope.videoPlayers[$scope.playerData[i].id] = player;

                    if ($scope.playerData[i].visible) {
                        player.play();
                    }
                }
            })
        }

        //Event functions
        $scope.changeSite = function () {
            var siteId = $scope.selectedSite.site_id;

            CameraService.getCameraList(siteId)
                .then(function (data) {
                    $scope.cameraList = data;
                })
        };

        $scope.changeCamera = function (camera) {
            if (camera) {
                refreshCamera();

                refreshPlayData()
                    .then(function () {
                        refreshVideoPlayer();
                    })
            }
        };

        $scope.changeMode = function () {
            $scope.dimension = _.range($scope.selectedMode.value);
            $route.reload();
        };

        $scope.changeTime = function () {

        };


        //Model Data
        $scope.siteList = {};
        $scope.selectedSite = {};

        $scope.cameraList = [];
        $scope.cameraSelDisable = false;

        $scope.playerMode = [
            {
                name: '1*1',
                value: 1,
                active: true
            },
            {
                name: '2*2',
                value: 2,
                active: true
            },
            {
                name: '3*3',
                value: 3,
                active: true
            },
            {
                name: '4*4',
                value: 4,
                active: true
            }
        ];
        $scope.selectedMode = $scope.playerMode[1];
        $scope.dimension = _.range($scope.selectedMode.value);

        $scope.playerData = [];
        $scope.videoPlayers = {};

        $scope.selectedDate = moment();
        $scope.playerTime = [
            {
                name: '0h',
                value: '00'
            },
            {
                name: '1h',
                value: '01'
            },
            {
                name: '2h',
                value: '02'
            },
            {
                name: '3h',
                value: '03'
            },
            {
                name: '4h',
                value: '04'
            },
            {
                name: '5h',
                value: '05'
            },
            {
                name: '6h',
                value: '06'
            },
            {
                name: '7h',
                value: '07'
            }
        ];
        $scope.selectedTime = $scope.playerTime[0];


        $scope.load = function () {
            SiteService.getSiteList()
                .then(function (data) {
                    return data.forEach(function (site) {
                        $scope.siteList[site.name] = site;
                    })
                })
                .then(function () {
                    var siteNames = Object.keys($scope.siteList);
                    $scope.selectedSite = $scope.siteList[siteNames[0]];
                    $scope.changeSite();
                })
        };

        $scope.load();
    });
