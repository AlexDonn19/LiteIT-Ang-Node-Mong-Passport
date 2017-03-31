angular.module('liteApp').factory('dataFactory', function () {

    var service = {},
        products = [],
        reviews = [],
        users = [];

    //первая загрузка данных (если работаем с локального сервера)
    service.setProducts = function (newproducts) {
        products = newproducts;
    };
    service.setReviews = function (newreviews) {
        reviews = newreviews;
    };
    service.setUsers = function (newusers) {
        users = newusers;
    };

    // найти продукт по id
    service.getProductById = function(product_id) {
        for (var i = products.length - 1; i >= 0; i--) {
            if (products[i]._id == product_id) { return products[i]; };
        };
        return null;
    };

    service.getProducts = function () {
        return products;
    };

    // найти все рейтинги по продукту (если с локального сервера)
    service.getReviews = function (product_id) {
        if (!product_id) {return reviews};
        var arr = [];
        for (var i = reviews.length - 1; i >= 0; i--) {
            if (reviews[i].id_entry == product_id) {
                arr.push(reviews[i]);
            };
        };
        return arr;
    };

    // найти среднее значение рейтингов, на 0 не делить
    service.getAvgRate = function (product_id) {
        var rateSum = 0,
            count = 0;
        for (var i = reviews.length - 1; i >= 0; i--) {
            if (reviews[i].id_entry == product_id) {
                rateSum = rateSum + reviews[i].rate;
                count++;
            };
        };
        return (count ? (rateSum/count).toFixed(1) : 0);
    };

    service.addReview = function (newdata) {
        // late should be chng on push(newdata)
        reviews.push({
            _id: newdata._id,
            rate: newdata.rate,
            text: newdata.text,
            id_user: newdata.id_user,
            id_entry: newdata.id_entry
        });
    };

    return service;
});