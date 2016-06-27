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

        var initSubmissionSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 5,
            start: 1

        };

        var initAuditInitialSearchParams = {
            sort: '',
            order: '',
            rows: 20,
            start: 1
        };

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
            expandableRowTemplate:'innerTable.html',
            expandableRowHeight: 150,
            enableExpandableRowHeader:false,

            columnDefs: [
                {name: 'submission_num',pinnedLeft: true, displayName: 'Submission Number' , enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'submission_date',displayName:'Update Date', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.submission_date | date: "dd-MMM-yyyy"}}</div>'},
                {name: 'submission_source', displayName:'Update Source',enableSorting: true, minWidth: '100', width: '*'},
                {
                    name: 'Acknowledge ',
                    cellTemplate: '<div class="text-center ui-grid-cell-contents"><button type="button" class="btn btn-primary" restriction-field ng-hide="(row.entity.acknowledge != \'No\')" ng-click="grid.appScope.editRow(grid,row,\'updates\')">Acknowledge</button><div ng-hide="(row.entity.acknowledge != \'Yes\')">Acknowledged</div>'
                },
                {name: 'acknowledge_comment', displayName:'Comment',enableSorting: true, minWidth: '100', width: '*'},
                {name: 'acknowledge_date', displayName:'Update Acknowldegement Date',enableSorting: true, minWidth: '100', width: '*',
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.acknowledge_date | date: "dd-MMM-yyyy"}}</div>'},
                {name: 'acknowledged_by', displayName:'User ID',enableSorting: true, minWidth: '150', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'}

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
            rowHeight: 110,
            enableSelectAll: false,
            enableRowSelection: false,
            paginationPageSizes: [5,10, 25],
            paginationPageSize: 5,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            enableVerticalScrollbar: 1,// uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar:1,// uiGridConstants.scrollbars.WHEN_NEEDED,
            columnDefs: [
                {name: 'submission_num',pinnedLeft: true, displayName: 'Submission Number' , minWidth: '10', width: '*'},
                {name: 'submission_date',displayName:'Date', minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.submission_date | date: "dd-MMM-yyyy"}}</div>'},
                {field: 'submission_type_list', displayName: 'Type',minWidth: '150', width: '*',enableSorting:true, cellTemplate:'<div class="ui-grid-cell-contents"><div ng-repeat="item in row.entity[col.field]">{{item}}</div></div>'},
                {field: 'first_four_docs',displayName:'Documents', enableSorting: true, minWidth: '380', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">' +
                    '<ul ng-repeat="doc in row.entity[col.field]"><li><a href="{{grid.appScope.downloadBaseUrl}}/{{doc.id}}">{{doc.file_name}}</a>  {{doc.source_document}} </li></ul>' +
                    '<a  class="cursor-pointer" ng-show="(row.entity.docs_size > 4)" ng-click="grid.appScope.showTrialDocuments(grid,row)">Show more ...</a>'+
                    '</div>'},
                {field: 'milestone', displayName: 'Current Milestone', minWidth: '220',width: '*',enableSorting:true, cellTemplate:'<div class="ui-grid-cell-contents"><div ng-repeat="item in row.entity[col.field]">{{item}}</div></div>'},

                {
                    name: 'Action ',
                    cellTemplate: '<div class="text-center ui-grid-cell-contents">' +
                    '<button type="button" class="btn btn-primary" restriction-field ng-show="(row.entity.submission_type == \'Amendment\')" ng-click="grid.appScope.editRow(grid,row,\'submissions\')" ><i class="glyphicon glyphicon-edit"> </button>' +
                    '</div>',
                    minWidth:'10',width: '95'

                }
            ]
        };


        var deleteDocsGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-mouseover="rowStyle={\'background-color\': \'red\'}; grid.appScope.onRowHover(this);" ng-mouseleave="rowStyle={}" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            enableSelectAll: false,
            paginationPageSizes: [10, 20],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            flatEntityAccess: true,

            columnDefs: [

                {name: 'deletion_date',displayName:'Deletion Date', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.deletion_date | date: "dd-MMM-yyyy"}}</div>'},

                {name: 'deleted_by',displayName:'Deleted by Username', enableSorting: true, minWidth: '100', width: '*'},


                {name: 'document_type',displayName:'Document Type', enableSorting: true, minWidth: '100', width: '*'},
                {field: 'file_name',pinnedLeft: true, displayName: 'File Name' , enabledSorting: true , minWidth: '100', width: '*'},
                    //cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{grid.appScope.downloadBaseUrl}}/{{row.entity[col.field].id}}">{{row.entity[col.field].file_name}}</a> {{doc.source_document}}</div></div>'},

                {name: 'original',displayName:'Original', enableSorting: true, minWidth: '100', width: '*'},

                {name: 'deleted_or_revised',displayName:'Deleted/Revised', enableSorting: true, minWidth: '100', width: '*'},

                {name: 'why_deleted',displayName:'Deletion Comments', enableSorting: true, minWidth: '100', width: '*'},

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
                {name: 'created_at', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.created_at | date: "dd-MMM-yyyy"}}</div>'},

                {name: 'event', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'nci_id', displayName: 'NCI ID', enableSorting: true, minWidth: '120', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'lead_protocol_id', displayName: 'Lead Protocol', enableSorting: true, minWidth: '140', width: '*'},

                {name: 'official_title', enableSorting: true, minWidth: '200', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'pilot', enabledSorting: true , minWidth: '100', width: '*'},

                {name: 'program_code', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'grant_question', enabledSorting: true , minWidth: '100', width: '*'},
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
                {name: 'study_source', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'phase', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'primary_purpose', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'primary_purpose_other', enableSorting: true, minWidth: '170', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'secondary_purpose', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'secondary_purpose_other', enableSorting: true, minWidth: '170', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'responsible_party', enabledSorting: true , minWidth: '100', width: '*'},


                {name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '150', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'lead_org', displayName: 'Lead Organization', enableSorting: true, minWidth: '170', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'sponsor', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'investigator', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'research_category', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'accrual_disease_term', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'investigator_title', enableSorting: true, minWidth: '170', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'investigator_aff_id', enableSorting: true, minWidth: '170', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'created_by', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'updated_by', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'process_priority', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'process_comment', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'acronym', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'keywords', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'nih_nci_div', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'nih_nci_prog', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'send_trial', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_approval_num', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'brief_title', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'brief_summary', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'detailed_description', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'objective', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'target_enrollment', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'final_enrollment', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'accruals', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'study_model', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'study_model_other', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'time_perspective', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'time_perspective_other', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'accept_vol', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'min_age', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'max_age', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_approval_status', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'intervention_model', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'masking', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'masking_role_caregiver', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'masking_role_investigator', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'masking_role_outcome_assessor', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'masking_role_subject', enabledSorting: true , minWidth: '100', width: '*'},

                {name: 'allocation', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'study_classification', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'gender', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'min_age', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'max_age', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'anatomic_site', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'num_of_arms', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'verification_date', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'sampling_method', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'study_pop_desc', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_name', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'board_affiliation', enabledSorting: true , minWidth: '100', width: '*'},


                {name: 'other_ids', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'outcome_measures',dispalyName: 'Outcome Measures', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'grants',dispalyName: 'Grants', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'eligibility_criteria',dispalyName: 'Eligibility Criteria', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'associated_trials', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'interventions', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'arms_groups', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'sub_groups', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'trial_owners', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'trial_documents', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'alternative_titles', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'central_contacts', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'citations', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'collaborators', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'ind_ides', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'links', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'milestones', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'submissions', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'oversight_authorities', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'processing_statuses', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'trial_co_leads', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'trial_co_pis', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'trial_statuses', enableSorting: true, minWidth: '400', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },



                {name: 'submission_number', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'submission_date', enabledSorting: true , minWidth: '100', width: '*'},





                {name: 'nci_specific_comment', enabledSorting: true , minWidth: '100', width: '*'},


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
            upsertSubmission:upsertSubmission,
            getDeletedDocs:getDeletedDocs,
            getDeleteDocsGridOptions:getDeleteDocsGridOptions,
            getSubmissionInitialSearchParams:getSubmissionInitialSearchParams,
            getAuditInitialSearchParams:getAuditInitialSearchParams
        };

        return services;



        /*********************** implementations *****************/

        function getUpdateInitialSearchParams() {
            return initUpdateSearchParams;
        }
        function getSubmissionInitialSearchParams() {
            return  initSubmissionSearchParams;
        }

        function getAuditInitialSearchParams() {
            return  initAuditInitialSearchParams;
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

        function getDeletedDocs(obj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_DELETED_DOCUMENTS, obj);

        }

        function getDeleteDocsGridOptions() {
            return deleteDocsGridOptions;
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

    }


})();
