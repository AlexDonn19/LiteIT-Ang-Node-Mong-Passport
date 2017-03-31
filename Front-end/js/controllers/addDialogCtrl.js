angular.module('liteApp').controller('addDialogCtrl', ['$scope', '$uibModalInstance', 'product', function ($scope, $uibModalInstance, product) {

    var self = this;
    self.product = product;

    self.newdata = {
        rate: null,
        text: '',
        id_entry: product._id
    };
    self.rateRange = [5, 4, 3, 2, 1];  // возможные варианты оценки
    // до введения данных скрыть кнопку Save
    function checkFields() {
        return (self.newdata.rate && self.newdata.text) ? false : true;
    };
    self.invalid = checkFields();
    $scope.$watch(checkFields, function (newValue) {
        self.invalid = checkFields();
    });

    self.ok = function () {
        var censoredData = {
            rate: self.newdata.rate,
            text: self.newdata.text,
            id_entry: self.newdata.id_entry
        };
        $uibModalInstance.close(censoredData);
    };
    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);