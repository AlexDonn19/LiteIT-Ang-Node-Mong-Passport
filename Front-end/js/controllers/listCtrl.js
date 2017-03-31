angular.module('liteApp').controller('listCtrl', ['dataFactory', function (dataFactory) {


    this.getProducts = function () {
        return dataFactory.getProducts();
    };

    // количество отзывов
    this.getReviewNum = function (product_id) {
      var reviews = [];
      reviews = dataFactory.getReviews(product_id);
      return reviews.length;
    };

    // средний рейтинг
    this.getAvgRate = function (product_id) {
      return dataFactory.getAvgRate(product_id);
    };

}]);




