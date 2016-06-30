/**
 * Created by kigonyapa on 6/30/16.
 * To globally override some elements of UI Grid for CTRP
 */

(function() {
    'use strict';
    angular.module('ctrp.app.main').config(ctrpUiGrid);
    ctrpUiGrid.$inject = ['$provide'];

    function ctrpUiGrid($provide) {
        $provide.decorator('GridOptions',function($delegate, i18nService){
            var gridOptions;
            gridOptions = angular.copy($delegate);
            i18nService.get('en').gridMenu.exporterAllAsCsv = 'Export all data as Excel';
            i18nService.get('en').gridMenu.exporterVisibleAsCsv = 'Export visible data as Excel';
            i18nService.get('en').gridMenu.exporterSelectedAsCsv = 'Export selected data as Excel';
            return gridOptions;
        });
    }
})();
