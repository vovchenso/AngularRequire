
(function(define) {

    'use strict';

    define(['Math/Long'], function(Long) {

        var Money = function($filter, systemParameters) {

            var numberFilter = $filter('number');

            var MoneyType = APP.CONFIG.Const.MoneyType;

            return function(input, type) {

                var result = null;
                
                if (input !== undefined && !(input instanceof Number)) {
                    input = input.toNumber();
                } 
                
                if (!isNaN(input)) {
                    var fraction = 2;
                    if (input % 100 < 1) {
                        fraction = 0;
                    }

                    result = numberFilter(input / 100, fraction);
                }
                
                if (type === MoneyType.REAL) {
                    result = systemParameters().currencySymbol + result;
                }


                return result;
            };
        };

        return ['$filter', 'systemParameters', Money];
    });

}(define));

