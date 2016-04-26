/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('AuditService', AuditService);

    AuditService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService','UserService','uiGridConstants','HOST'];

    function AuditService(URL_CONFIGS, MESSAGES, $log, _,
                        GeoLocationService, Common, $rootScope,
                        PromiseTimeoutService,UserService,uiGridConstants,HOST) {



        var initUpdateSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 10,
            start: 1
        }; //initial Audits Search Parameters



        var updatesGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-mouseover="rowStyle={\'background-color\': \'red\'}; grid.appScope.onRowHover(this);" ng-mouseleave="rowStyle={}" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            //enableRowSelection: false,
            paginationPageSizes: [10, 20],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            expandableRowTemplate: '<div class="ui-grid-no-hover" ui-grid="row.entity.subGridOptions" style="height:150px;"></div>',
            expandableRowHeight: 150,

            columnDefs: [
                {name: 'submission_num',pinnedLeft: true, displayName: 'Submission Number' , enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'submission_date',displayName:'Update Date', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.submission_date | date: "dd-MMM-yyyy"}}</div>'},
                {name: 'submission_source', displayName:'Update Source',enableSorting: true, minWidth: '100', width: '*'},
                {
                    name: 'Acknowledge ',
                    cellTemplate: '<div class="text-center ui-grid-cell-contents"><button type="button" class="btn btn-primary" ng-hide="(row.entity.acknowledge != \'No\')" ng-click="grid.appScope.editRow(grid,row,\'updates\')">Acknowledge</button><div ng-hide="(row.entity.acknowledge != \'Yes\')">Acknowledged</div>'
                },
                {name: 'acknowledge_comment', displayName:'Comment',enableSorting: true, minWidth: '100', width: '*'},
                {name: 'acknowledge_date', displayName:'Update Acknowldegement Date',enableSorting: true, minWidth: '100', width: '*',
                cellTemplate: '<div>{{row.entity.acknowledge_date | date: "dd-MMM-yyyy"}}</div>'},
                {name: 'acknowledged_by', displayName:'User ID',enableSorting: true, minWidth: '100', width: '*'}

            ]
        };


        var submissionsGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            enableRowSelection: false,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,


            columnDefs: [
                {name: 'submission_num',pinnedLeft: true, displayName: 'Submission Number' , enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'submission_date',displayName:'Date', enableSorting: true, minWidth: '100', width: '*'},
                {field: 'submission_type_list', displayName: 'Type',enableSorting:true, cellTemplate:'<div class="ui-grid-cell-contents" ng-repeat="item in row.entity[col.field]">{{item}}</div>'},
                {field: 'docs',displayName:'Documents', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents"><div ng-repeat="doc in row.entity[col.field]"> <a href="{{grid.appScope.downloadBaseUrl}}/{{doc.id}}">{{doc.file_name}}</a> {{doc.source_document}}</div></div>'},
                {field: 'milestone', displayName: 'Current Milestone',enableSorting:true, cellTemplate:'<div class="ui-grid-cell-contents" ng-repeat="item in row.entity[col.field]">{{item}}</div>'},




                {
                    name: 'Action ',
                    cellTemplate: '<div class="text-center"><button type="button" class="btn btn-primary" ng-show="(row.entity.submission_type == \'Amendment\')" ng-click="grid.appScope.editRow(grid,row,\'submissions\')" ><i class="glyphicon glyphicon-edit"> </button></div>',
                    width: '100'

                }
            ]
        };



        var auditsGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            enableRowSelection: true,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            columnDefs: [
                {name: 'created_at', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'event', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'lead_protocol_id', displayName: 'Lead Protocol ID', enableSorting: true, minWidth: '140', width: '140',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'nci_id', displayName: 'NCI ID', enableSorting: true, minWidth: '120', width: '120',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'official_title', enableSorting: true, minWidth: '200', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'program_code', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'grant_question', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'ind_ide_question', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'pilot', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'primary_purpose', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'study_source', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'phase', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'responsible_party', enabledSorting: true , minWidth: '100', width: '*'},


                {name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '150', width: '5%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'lead_org', displayName: 'Lead Organization', enableSorting: true, minWidth: '170', width: '5%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'sponsor', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'research_category', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'accrual_disease_term', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'start_date', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'start_date_qual', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'primary_comp_date', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'primary_comp_date_qual', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'comp_date', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'comp_date_qual', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'ind_ide_question', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'intervention_indicator', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'sec801_indicator', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'data_monitor_indicator', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'other_ids', enableSorting: true, minWidth: '400', width: '25%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'grants', enableSorting: true, minWidth: '400', width: '25%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_number', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'submission_date', enabledSorting: true , minWidth: '100', width: '*'},

                {name: 'created_by', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'updated_by', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'min_age', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'max_age', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'process_priority', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'process_comment', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'nih_nci_div', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'nih_nci_prog', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'masking', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'investigator_id', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'nci_specific_comment', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_name', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_affiliation_id', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_approval_num', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_approval_status', enabledSorting: true , minWidth: '100', width: '*'}

            ]
        };



        var services = {
            getAuditsGridOptions: getAuditsGridOptions,
            getAudits: getAudits,
            getUpdatesGridOptions: getUpdatesGridOptions,
            getUpdates: getUpdates,
            getUpdateInitialSearchParams:getUpdateInitialSearchParams,
            getSubmissions: getSubmissions,
            getSubmissionsGridOptions: getSubmissionsGridOptions,
            upsertSubmission:upsertSubmission
        };

        return services;



        /*********************** implementations *****************/

        function getUpdateInitialSearchParams() {
            return initUpdateSearchParams;
        }

        function getAudits(obj){
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.AUDIT_HISTORY, obj);

        }


        function getAuditsGridOptions() {
            return auditsGridOptions;
        }



        function getUpdates(obj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_UPDATES_HISTORY, obj);
        }

        function getUpdatesGridOptions() {
            return updatesGridOptions;
        }

        function getSubmissionsGridOptions() {
            return submissionsGridOptions;
        }


        function getSubmissions(obj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_SUBMISSIONS_HISTORY, obj);

        }


        /**
         * Update submission for Updates Tab Updates
         *
         * @param obj
         * @returns {*}
         */
        function upsertSubmission(obj) {
            if (obj.new) {
                //return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ORG_LIST, orgObj);
            }

            var configObj={};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_SUBMISSION + obj.id + '.json', obj, configObj);

        } //upsertOrg

        /**
         * Update submission for Submissions Tab Amendments
         *
         * @param obj
         * @returns {*}
         */
       /* function upsertSubmissionAmendment(obj) {
            if (obj.new) {
                //return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ORG_LIST, orgObj);
            }

            var configObj={};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_SUBMISSION + obj.id + '.json', obj, configObj);

        } //upsertOrg
        */


    }


})();
