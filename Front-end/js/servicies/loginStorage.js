angular.module('liteApp').service('loginStorage',  function () {

    var service = {},
        loginData = {
          logged: false,
          username: '',
          token: ''
        };

    service.setLoginData = function (newdata) {
      loginData.logged = newdata.logged;
      loginData.username = newdata.username;
      loginData.token = newdata.token;
    };

    service.getLoginData = function () {
      return loginData;
    };

    return service;
});