(function () {

    var app = angular.module('timetec',['ngRoute']);
    
    app.config(function ($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'listing.html'
            })
            .when('/about',{
                templateUrl:'data.html'
            })
            .otherwise({ redirectTo:'/'});
    });
})();