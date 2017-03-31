angular.module('liteApp').controller('loginCtrl', ['$location', 'httpFactory', 'loginStorage', function ($location, httpFactory, loginStorage) {

    var self = this,
      promiseObj,
      userdata = {};
    self.loginData = {
      logged: false,
      username: '',
      token: ''
    };
    self.error_status = false;

    finishLogin = function (response) {
      self.loginData.logged = response.success;
      self.loginData.username = userdata.username;
      self.loginData.token = response.token || response.access_token;
      loginStorage.setLoginData(self.loginData);
      $location.path('/');
    };

    showError = function (err) {
      self.password = '';
      self.error_status = true;
      self.error_message = err.data.error;
    };

    self.sendData = function () {
      userdata.username = self.username;
      userdata.password = self.password;

      if (self.create_account) {
        promiseObj = httpFactory.httpCreateAccount(userdata);
        promiseObj.then(function (response) {
          finishLogin(response);
        }).catch(function (err) {
          showError(err);
        });
      } else {
        promiseObj = httpFactory.httpLoginAccount(userdata);
        promiseObj.then(function (response) {
          finishLogin(response);
        }).catch(function (err) {
          showError(err);
        });
      };
    };

}]);




