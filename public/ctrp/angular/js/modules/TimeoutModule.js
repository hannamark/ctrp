/**
 * Created by wangg5 on 8/20/15.
 */

(function() {
    'use strict';

    angular.module('TimeoutModule', ['ngIdle', 'ui.bootstrap'])
        .config(function(IdleProvider, KeepaliveProvider) {
            IdleProvider.idle(3600);  //an hour of threshold for inactivity
            IdleProvider.timeout(10); //amount of time for user to react
            KeepaliveProvider.interval(3600);  //half hour
        });
})();