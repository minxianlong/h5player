angular.module("myApp", ['daterangepicker'])
    .controller('MainController', function ($scope, $timeout) {
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

            $scope.playerData = [
                {
                    id: 'video_1',
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
                },
                {
                    id: 'video_2',
                    visible: true,
                    playlist: [{
                        sources: [{
                            src: 'res/3.mp4',
                            type: 'video/mp4'
                        }]
                    }, {
                        sources: [{
                            src: 'res/4.mp4',
                            type: 'video/mp4'
                        }]
                    }],
                    width: '0%'
                },
                {
                    id: 'video_3',
                    visible: true,
                    playlist: [{
                        sources: [{
                            src: 'res/4.mp4',
                            type: 'video/mp4'
                        }]
                    }, {
                        sources: [{
                            src: 'res/5.mp4',
                            type: 'video/mp4'
                        }]
                    }],
                    width: '0%'
                }
            ];

            $scope.videoPlayers = {};

            $(document).ready(function (e) {
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
            });

        };

        $scope.load();
    });