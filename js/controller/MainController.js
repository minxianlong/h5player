angular.module("h5player")
    .controller('MainController', function ($scope, SiteListService) {
        function timeUpdate() {
            var index = this.playlist.currentIndex();
            var currentTime = this.currentTime();

            console.log(JSON.stringify(this.playData));
            this.playData.width = (currentTime + index * 10) * 100 / (this.playData.playlist.length * 10) + '%';

            $scope.$apply();
        }

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
            $scope.date = {
                startDate: moment().subtract(1, "days"),
                endDate: moment()
            };

            $scope.playerData = [];
            $scope.videoPlayers = {};


            SiteListService.getSiteList()
                .then(function (data) {
                    console.log(JSON.stringify(data));
                    var siteList = data.site_list;
                    return siteList.forEach(function (site) {
                        $scope.playerData.push(
                            {
                                id: site.name,
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
                    })
                })
                .then(function () {
                    $(document).ready(function () {
                        console.log(JSON.stringify($scope.playerData));
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
        };

        $scope.load();
    });