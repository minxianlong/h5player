angular.module("h5player")
    .controller('MainController', function ($scope, $q, SiteService, CameraService) {
        function timeUpdate() {
            var index = this.playlist.currentIndex();
            var currentTime = this.currentTime();

            this.playData.width = (currentTime + index * 10) * 100 / (this.playData.playlist.length * 10) + '%';

            $scope.$apply();
        }

        function changeSite() {
            var siteId = $scope.siteList[$scope.selectedSite].site_id;
            CameraService.getCameraList(siteId)
                .then(function (data) {
                    $scope.cameraList = data;
                    var camInfoPromise = [];
                    $scope.cameraList.forEach(function (camera) {
                        camInfoPromise.push(CameraService.getCameraInfo(siteId, camera.id))
                    });

                    return $q.all(camInfoPromise);
                })
                .then(function (camInfoArray) {
                    camInfoArray.forEach(function (camInfo) {
                        $scope.playerData.push(
                            {
                                id: 'cam_' + camInfo.cam_id,
                                name: camInfo.name,
                                visible: true,
                                playlist: [{
                                    sources: [{
                                        src: 'res/1.mp4',
                                        type: 'video/mp4'
                                    }]
                                }, {
                                    sources: [{
                                        src: 'res/2.mp4',
                                        type: 'video/mp4'
                                    }]
                                }, {
                                    sources: [{
                                        src: 'res/3.mp4',
                                        type: 'video/mp4'
                                    }]
                                }],
                                width: '0%'
                            }
                        )
                    });
                })
                .then(function () {
                    $(document).ready(function () {
                        for (var i = 0; i < $scope.playerData.length; i++) {
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
                })
        }

        $scope.siteList = {};
        $scope.siteNames = [];
        $scope.selectedSite = '';

        $scope.cameraList = [];

        $scope.dimension = _.range(3);

        $scope.playerData = [];
        $scope.videoPlayers = {};

        $scope.date = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        };

        $scope.refresh = function (player) {
            console.log($scope.videoPlayers[player.id]);
            if (player) {
                if (player.visible) {
                    $scope.videoPlayers[player.id].play();
                }
                else {
                    $scope.videoPlayers[player.id].pause();
                }

            }
        };

        $scope.load = function () {
            SiteService.getSiteList()
                .then(function (data) {
                    return data.forEach(function (site) {
                        $scope.siteList[site.name] = site;
                    })
                })
                .then(function () {
                    $scope.siteNames = Object.keys($scope.siteList);
                    $scope.selectedSite = $scope.siteNames[0];
                    changeSite();
                })
        };

        $scope.load();
    });
