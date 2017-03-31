angular.module('liteApp').controller('productCtrl', ['$routeParams', '$uibModal', 'dataFactory', 'httpFactory', 'loginStorage', function ($routeParams, $uibModal, dataFactory, httpFactory, loginStorage ) {

    var self = this,
        productId = $routeParams.productId;

    self.isloading = true;
    self.isLogged = loginStorage.getLoginData().logged;
    // получить от сервера все отзывы по Id продукта
    var promiseObj = httpFactory.httpGetReview(productId);
    promiseObj.then(function () {
      self.isloading = false;
      self.reviews = dataFactory.getReviews(productId);
    });

    // получить полную информацию по продукту
    self.product = dataFactory.getProductById(productId);

    self.getProducts = function () {
        return dataFactory.getProducts();
    };

    // средний рейтинг
    self.getAvgRate = function (product_id) {
      return dataFactory.getAvgRate(product_id);
    };

    self.createReview = function (product) {
        var uibModalInstance = $uibModal.open({
          templateUrl: './templates/add-dialog.html',
          controller: 'addDialogCtrl',
          controllerAs: 'addDialogCtrl',
          size: 'lg',
          resolve: {
            product: function () { return product; }
          }
        });

        uibModalInstance.result.then(function (newdata) {
            var promiseObj = httpFactory.httpCreateReview(newdata);
            promiseObj.then(function () {
              self.reviews = dataFactory.getReviews(productId);
            });
        });
    };

}]);




