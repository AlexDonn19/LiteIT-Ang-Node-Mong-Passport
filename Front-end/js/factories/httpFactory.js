angular.module('liteApp')
.constant("baseUrl", "http://localhost:3000/api")
.factory('httpFactory', ['$http', '$q', '$httpParamSerializer', '$base64', 'dataFactory', 'baseUrl', 'loginStorage', function ($http, $q, $httpParamSerializer, $base64, dataFactory, baseUrl, loginStorage) {

    var service = {};

    service.httpGetProducts = function () {
        $http.get(baseUrl+'/products').then(function (response) {
            dataFactory.setProducts(response.data);
        }).catch(function (err) {
            alert('Can`t get Products data');
        });
    };

    service.httpGetReviews = function () {
        $http.get(baseUrl+'/reviews').then(function (response) {
            dataFactory.setReviews(response.data);
        }).catch(function (err) {
            alert('Can`t get Reviews data');
        });
    };

    service.httpGetReview = function (product_id) {
        var deferred = $q.defer();
        $http.get(baseUrl+'/reviews/'+product_id).then(function (response) {
            deferred.resolve(response.data);
        }).catch(function (err) {
            alert('Can`t get Reviews data');
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.httpCreateReview = function (newReview) {
        var deferred = $q.defer(),
            token = loginStorage.getLoginData().token,
            req = {
                method: 'POST',
                url: baseUrl+'/reviews/'+newReview.id_entry,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $httpParamSerializer({
                    rate: newReview.rate,
                    text: newReview.text
                })
            };
        $http(req).then(function (response) {
            newReview._id = response.data.review_id;
            dataFactory.addReview(newReview);
            deferred.resolve(response.status);
        }).catch(function (err) {
            alert('Can`t create new review');
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.httpCreateAccount = function (newUser) {
        var encodedUserData = $base64.encode(newUser.username+':'+newUser.password);
        var deferred = $q.defer(),
            req = {
            method: 'POST',
            url: baseUrl+'/register/',
            headers: {
               'Authorization': "Basic "+encodedUserData,
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $httpParamSerializer({
                grant_type: "password",
                username: newUser.username,
                password: newUser.password,
                scope: "offline_access"
            })
        };
        $http(req).then(function (response) {
            deferred.resolve(response.data);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.httpLoginAccount = function (user) {
        var encodedUserData = $base64.encode(user.username+':'+user.password);
        var deferred = $q.defer(),
            req = {
            method: 'POST',
            url: baseUrl+'/login/',
            headers: {
               'Authorization': "Basic "+encodedUserData,
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $httpParamSerializer({
                grant_type: "password",
                scope: 'offline_access',
                username: user.username,
                password: user.password
            })
        };
        $http(req).then(function (response) {
            deferred.resolve(response.data);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    return service;
}]);