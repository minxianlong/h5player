angular.module("h5player", ['daterangepicker', 'ngRoute'])
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://192.168.188.128/**'
        ]);
    });