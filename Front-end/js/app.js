var lardiApp = angular.module("liteApp", ['ngRoute', 'ui.bootstrap', 'base64'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requiredBase: false
    });
    $routeProvider
        .when('/', {
         templateUrl: "/templates/main.html",
         controller: "listCtrl",
         controllerAs: "listCtrl"
        })
        .when('/product/:productId', {
         templateUrl: "/templates/product.html",
         controller: "productCtrl",
         controllerAs: "productCtrl"
        })
        .when('/about', {
         templateUrl: "/templates/about.html",
         controller: "productCtrl",
         controllerAs: "productCtrl"
        })
        .when('/login', {
         templateUrl: "/templates/login.html",
         controller: "loginCtrl",
         controllerAs: "loginCtrl"
        })
        .otherwise({
         redirectTo: '/'
        });
}])
.controller("liteCtrl", ['$location', 'httpFactory', 'loginStorage', function ($location, httpFactory, loginStorage) {

    this.loginData = loginStorage.getLoginData(); // после лог-ин удалить из навигации ссылку на логин

    httpFactory.httpGetReviews(); // для отражения рейтингов продуктов в первой странице
    httpFactory.httpGetProducts();

}]);


