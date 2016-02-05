/**
 * Created by wus4 on 8/14/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('TrialService', TrialService);

    TrialService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_', 'Common', '$rootScope',
        'PromiseTimeoutService', 'Upload', 'HOST', 'DateService', '$http'];

    function TrialService(URL_CONFIGS, MESSAGES, $log, _, Common, $rootScope,
            PromiseTimeoutService, Upload, HOST, DateService, $http) {

        var initTrialSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 20,
            start: 1
        }; //initial Trial Search Parameters

        var actionTemplate = '<div ng-if="row.entity.actions.length > 0" class="btn-group" ng-class="grid.renderContainers.body.visibleRowCache.indexOf(row) > 4 ? \'dropup\' : \'\'">'
            + '<button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
            + 'Action <span class="caret"></span>'
            + '</button>'
            + '<ul class="dropdown-menu dropdown-menu-right"><li ng-repeat="action in row.entity.actions">'
            + '<a ng-if="action == \'add-my-site\'">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '<a ng-if="action != \'add-my-site\'" ui-sref="main.trialDetail({trialId: row.entity.id, editType: action})">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '</li></ul>'
            + '</div>';

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'lead_protocol_id', displayName: 'Lead Protocol ID', enableSorting: true, minWidth: '140', width: '140',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'nci_id', displayName: 'NCI ID', enableSorting: true, minWidth: '120', width: '120',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'official_title', enableSorting: true, minWidth: '200', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phase', enableSorting: true, minWidth: '70', width: '70'},
                {name: 'purpose', enableSorting: true, minWidth: '120', width: '120',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'},
                {name: 'pilot', enableSorting: true, minWidth: '60', width: '60'},
                {name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '180', width: '180',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'lead_org', displayName: 'Lead Organization', enableSorting: true, minWidth: '200', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'sponsor', enableSorting: true, minWidth: '200', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'study_source', enableSorting: true, minWidth: '170', width: '170',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'current_trial_status', enableSorting: false, minWidth: '170', width: '170',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'display_name', displayName: 'Actions', enableSorting: false, minWidth: '100', width: '100',
                    cellTemplate: actionTemplate, cellClass: 'action-btn'
                }

            ]
        };

        var services = {
            getAllTrials: getAllTrials,
            getTrialById: getTrialById,
            upsertTrial: upsertTrial,
            searchTrials: searchTrials,
            searchTrialsPa: searchTrialsPa,
            getInitialTrialSearchParams: getInitialTrialSearchParams,
            getGridOptions: getGridOptions,
            getStudySources: getStudySources,
            getProtocolIdOrigins: getProtocolIdOrigins,
            getPhases: getPhases,
            getResearchCategories: getResearchCategories,
            getPrimaryPurposes: getPrimaryPurposes,
            getSecondaryPurposes: getSecondaryPurposes,
            getAccrualDiseaseTerms: getAccrualDiseaseTerms,
            getResponsibleParties: getResponsibleParties,
            getFundingMechanisms: getFundingMechanisms,
            getInstituteCodes: getInstituteCodes,
            getNci: getNci,
            getTrialStatuses: getTrialStatuses,
            getTrialStatusById: getTrialStatusById,
            getMilestones: getMilestones,
            getHolderTypes: getHolderTypes,
            getNih: getNih,
            getExpandedAccessTypes: getExpandedAccessTypes,
            getAcceptedFileTypes: getAcceptedFileTypes,
            getAuthorityOrgArr: getAuthorityOrgArr,
            checkOtherId: checkOtherId,
            checkAuthority: checkAuthority,
            addStatus: addStatus,
            validateStatus: validateStatus,
            searchClinicalTrialsGov: searchClinicalTrialsGov,
            importClinicalTrialsGov: importClinicalTrialsGov,
            uploadDocument: uploadDocument,
            deleteTrial: deleteTrial,
            getGrantsSerialNumber: getGrantsSerialNumber
        };

        return services;



        /*********************** implementations *****************/

        function getAllTrials() {
            return PromiseTimeoutService.getData(URL_CONFIGS.TRIAL_LIST);
        } //getAllTrials

        function getTrialById(trialId) {
            console.log('calling getTrialById in TrialService');
            //return PromiseService.getData(URL_CONFIGS.AN_TRIAL + trialId + '.json');
            return PromiseTimeoutService.getData(URL_CONFIGS.A_TRIAL + trialId + '.json');
        } //getTrialById

        /**
         * Update or insert a new trial
         *
         * @param trialObj
         * @returns {*}
         */
        function upsertTrial(trialObj) {
            if (trialObj.new) {
                //create a new trial
                $log.info('creating a trial: ' + JSON.stringify(trialObj));
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_LIST, trialObj);
            }

            //update an existing trial
            var configObj = {}; //empty config
            $log.info('updating a trial: ' + JSON.stringify(trialObj));
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_TRIAL + trialObj.id + '.json', trialObj, configObj);
        } //upsertTrial

        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchTrials(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_TRIAL, searchParams);
            }
        } //searchTrials

        function searchTrialsPa(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_TRIAL_PA, searchParams);
            }
        } //searchTrials

        function getGrantsSerialNumber(searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.GET_GRANTS_SERIALNUMBER, searchParams);            
        } // getGrantsSerialNumber
        /**
         * get initial paramater object for trials search
         * @return initTrialSearchParams
         */
        function getInitialTrialSearchParams() {
            return initTrialSearchParams;
        } //getInitialTrialSearchParams

        function getGridOptions() {
            return gridOptions;
        }

        /**
         * A helper function:
         * Use $rootScope to broadcast messages
         * @param msgCode
         * @param msgContent
         */
        function broadcastMsg(msgCode, msgContent) {
            $rootScope.$broadcast(msgCode, {content: msgContent});
        } //broadcastMsg

        function getStudySources() {
            return PromiseTimeoutService.getData(URL_CONFIGS.STUDY_SOURCES);
        }

        function getProtocolIdOrigins() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PROTOCOL_ID_ORIGINS);
        }

        function getPhases() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PHASES);
        }

        function getResearchCategories() {
            return PromiseTimeoutService.getData(URL_CONFIGS.RESEARCH_CATEGORIES);
        }

        function getPrimaryPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PRIMARY_PURPOSES);
        }

        function getSecondaryPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SECONDARY_PURPOSES);
        }

        function getAccrualDiseaseTerms() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ACCRUAL_DISEASE_TERMS);
        }

        function getResponsibleParties() {
            return PromiseTimeoutService.getData(URL_CONFIGS.RESPONSIBLE_PARTIES);
        }

        function getFundingMechanisms() {
            return PromiseTimeoutService.getData(URL_CONFIGS.FUNDING_MECHANISMS);
        }

        function getInstituteCodes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.INSTITUTE_CODES);
        }

        function getNci() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NCI);
        }

        function getTrialStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.TRIAL_STATUSES);
        }

        function getTrialStatusById(trialStatusId) {
            //insert the trialStatusId into the url
            var url = URL_CONFIGS.TRIALS.STATUS_WITH_ID.replace(/\s*\{.*?\}\s*/g, trialStatusId);
            return PromiseTimeoutService.getData(url);
        }

        function getMilestones() {
            return PromiseTimeoutService.getData(URL_CONFIGS.MILESTONES);
        }

        function getHolderTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.HOLDER_TYPES);
        }

        function getNih() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NIH);
        }

        function getExpandedAccessTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.EXPANDED_ACCESS_TYPES);
        }

        function getAcceptedFileTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ACCEPTED_FILE_TYPES);
        }

        function getAuthorityOrgArr(country) {
            var authorityOrgArr = [];

            switch(country) {
                case 'United States':
                    authorityOrgArr = ['Federal Government',
                        'Food and Drug Administration',
                        'Institutional Review Board'];
                    break;
                case 'Canada':
                    authorityOrgArr = ['Canadian Institutes of Health Research',
                        'Ethics Review Committee',
                        'Health Canada',
                        'Ministry of Health & Long Term Care, Ontario'];
                    break;
                case 'Afghanistan':
                    authorityOrgArr = ['Ministry of Public Health'];
                    break;
                case 'Albania':
                    authorityOrgArr = ['Ministry of Health Department of Pharmacy'];
                    break;
                case 'Algeria':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Andorra':
                    authorityOrgArr = ['Ministeri de Salut i Benestar'];
                    break;
                case 'Argentina':
                    authorityOrgArr = ['Administracion Nacional de Medicamentos, Alimentos y Tecnologia Medica',
                        'Human Research Bioethics Committee',
                        'Ministry of Health'];
                    break;
                case 'Armenia':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Australia':
                    authorityOrgArr = ['Department of Health and Ageing Therapeutic Goods Administration',
                        'Human Research Ethics Committee',
                        'National Health and Medical Research Council'];
                    break;
                case 'Austria':
                    authorityOrgArr = ['Federal Ministry for Labour, Health, and Social Affairs',
                        'Agency for Health and Food Safety',
                        'Ethikkommission',
                        'Federal Ministry for Health Family and Youth',
                        'Federal Ministry for Health and Women',
                        'Federal Office for Safety in Health Care'];
                    break;
                case 'Bangladesh':
                    authorityOrgArr = ['Bangladesh Medical Research Council',
                        'Directorate of Drug Administration',
                        'Ethical Review Committee'];
                    break;
                case 'Barbados':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Belarus':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Belgium':
                    authorityOrgArr = ['Directorate general for the protection of Public health',
                        'Federal Agency for Medicinal Products and Health Products',
                        'Institutional Review Board',
                        'Ministry of Social Affairs, Public Health and the Environment',
                        'The Federal Public Service (FPS) Health, Food Chain Safety and Environment'];
                    break;
                case 'Bolivia':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Health'];
                    break;
                case 'Bosnia':
                    authorityOrgArr = ['Federal Ministry of Health'];
                    break;
                case 'Botswana':
                    authorityOrgArr = ['Health Research and Development Committee',
                                        'Ministry of Health'];
                    break;
                case 'Brazil':
                    authorityOrgArr = ['Ethics Committee',
                        'Ministry of Health',
                        'National Committee of Ethics in Research',
                        'National Health Surveillance Agency'];
                    break;
                case 'Bulgaria':
                    authorityOrgArr = ['Bulgarian Drug Agency',
                                    'Ministry of Health'];
                    break;
                case 'Burkina Faso':
                    authorityOrgArr = ['Ministry for Higher Education and Research',
                                    'Ministry of Health'];
                    break;
                case 'Cambodia':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Cameroon':
                    authorityOrgArr = ['Ministry of Public Health'];
                    break;
                case 'Chile':
                    authorityOrgArr = ['Comisión Nacional de Investigación Científica y Tecnológica',
                        'Instituto de Salud Publica de Chile'];
                    break;
                case 'China':
                    authorityOrgArr = ['Ethics Committee',
                        'Ministry of Health',
                        'National Natural Science Foundation',
                        'State Food and Drug Administration'];
                    break;
                case 'Colombia':
                    authorityOrgArr = ['INVIMA Instituto Nacional de Vigilancia de Medicamentos y Alimentos',
                        'Institutional Review Board', 'National Institutes of Health'];
                    break;
                case 'Costa Rica':
                    authorityOrgArr = ['Ethics Committee',
                        'Ministry of Health Costa Rica'];
                    break;
                case 'Côte D\'Ivoire':
                    authorityOrgArr = ['Ministry of AIDS',
                        'Ministry of Health and Public Hygiene',
                        'National Research and Ethics Committee',
                        'Ministry for the Public Health'];
                    break;
                case 'Croatia':
                    authorityOrgArr = ['Agency for Medicinal Product and Medical Devices',
                        'Ethics Committee',
                        'Ministry of Health and Social Care',
                        'Ministry of Science, Education and Sports'];
                    break;
                case 'Cuba':
                    authorityOrgArr = ['Ministry of Public Health', 'Scientific and Ethics Committee'];
                    break;
                case 'Czech Republic':
                    authorityOrgArr = ['Ethics Committee', 'State Institute for Drug Control'];
                    break;
                case 'Denmark':
                    authorityOrgArr = ['Danish Dataprotection Agency',
                        'Danish Medicines Agency',
                        'Ethics Committee',
                        'National Board of Health',
                        'The Danish National Committee on Biomedical Research Ethics',
                        'The Ministry of the Interior and Health',
                        'The Regional Committee on Biomedical Research Ethics'];
                    break;
                case 'Dominican Republic':
                    authorityOrgArr = ['Consejo Nacional de Bioetica en Salud',
                        'Secretaría del Estado de Salud Pública y Asistencia Social (SESPAS)'];
                    break;
                case 'Ecuador':
                    authorityOrgArr = ['Ethical Committee', 'Public Health Ministry'];
                    break;
                case 'Egypt':
                    authorityOrgArr = ['Institutional Review Board',
                        'Ministry of Health and Population',
                        'Ministry of Health, Drug Policy and Planning Center'];
                    break;
                case 'Estonia':
                    authorityOrgArr = ['The State Agency of Medicine'];
                    break;
                case 'Ethiopia':
                    authorityOrgArr = ['Drug Administration and Control Authority',
                        'Ethical Review Committee',
                        'Ethiopia Science and Technology Commission',
                        'Ministry of Health'];
                    break;
                case 'European Union':
                    authorityOrgArr = ['European Medicines Agency'];
                    break;
                case 'Fiji':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Finland':
                    authorityOrgArr = ['Data Protection Board',
                        'Ethics Committee',
                        'Finnish Medicines Agency',
                        'Ministry of Social Affairs and Health',
                        'National Advisory Board on Health Care Ethics'];
                    break;
                case 'France':
                    authorityOrgArr = ['Afssaps - French Health Products Safety Agency',
                        'Comité consultatif sur le traitement de l\'information en matière de recherche dans le domaine de la santé',
                        'Direction Générale de la Santé',
                        'French Data Protection Authority',
                        'Haute Autorité de Santé Transparency Commission',
                        'Institutional Ethical Committee',
                        'Ministry of Health',
                        'National Consultative Ethics Committee for Health and Life Sciences'];
                    break;
                case 'Gabon':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Gambia':
                    authorityOrgArr = ['Department of State for Health and Social Welfare',
                                        'MRC Ethics Committee'];
                    break;
                case 'Georgia':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Germany':
                    authorityOrgArr = ['Ethics Commission',
                        'Federal Institute for Drugs and Medical Devices',
                        'Federal Ministry of Education and Research',
                        'Federal Ministry of Food, Agriculture and Consumer Protection',
                        'Federal Office for Radiation Protection',
                        'German Institute of Medical Documentation and Information',
                        'Ministry of Health', 'Paul-Ehrlich-Institut',
                        'The Bavarian State Ministry of the Environment and Public Health'];
                    break;
                case 'Ghana':
                    authorityOrgArr = ['Committee on Human Research', 'Ministry of Health'];
                    break;
                case 'Greece':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Health and Welfare', 'National Organization of Medicines'];
                    break;
                case 'Guatemala':
                    authorityOrgArr = ['Ministry of Public Health and Social Assistance'];
                    break;
                case 'Guinea-Bissau':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Hong Kong':
                    authorityOrgArr = ['Department of Health',
                        'Ethics Committee',
                        'Joint CUHK-NTEC Clinical Research Ethics Committee'];
                    break;
                case 'Hungary':
                    authorityOrgArr = ['Institutional Ethics Committee',
                        'National Institute of Pharmacy',
                        'Research Ethics Medical Committee'];
                    break;
                case 'Iceland':
                    authorityOrgArr = ['Icelandic Medicines Control Agency',
                                    'Ministry of Health and Social Security'];
                    break;
                case 'India':
                    authorityOrgArr = ['Central Drugs Standard Control Organization',
                        'Department of Atomic Energy',
                        'Drugs Controller General of India',
                        'Indian Council of Medical Research',
                        'Institutional Review Board',
                        'Ministry of Health',
                        'Ministry of Science and Technology',
                        'Science and Engineering Research Council'];
                    break;
                case 'Indonesia':
                    authorityOrgArr = ['Departement Kesehatan (Department of Health)', 'National Agency of Drug and Food Control'];
                    break;
                case 'Iran, Islamic Republic Of':
                    authorityOrgArr = ['Ethics Committee',
                                    'Ministry of Health'];
                    break;
                case 'Ireland':
                    authorityOrgArr = ['Irish Medicines Board',
                        'Medical Ethics Research Committee',
                        'Ministry of Health',
                        'Research Ethics Committee'];
                    break;
                case 'Israel':
                    authorityOrgArr = ['Ethics Commission',
                        'Israeli Health Ministry Pharmaceutical Administration',
                        'Ministry of Health',
                        'The Israel National Institute for Health Policy Research and Health Services Research'];
                    break;
                case 'Italy':
                    authorityOrgArr = ['Ethics Committee',
                        'Ministry of Health',
                        'National Bioethics Committee',
                        'National Institute of Health',
                        'National Monitoring Centre for Clinical Trials - Ministry of Health',
                        'The Italian Medicines Agency'];
                    break;
                case 'Jamaica':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Japan':
                    authorityOrgArr = ['Foundation for Biomedical Research and Innovation',
                        'Institutional Review Board',
                        'Ministry of Education, Culture, Sports, Science and Technology',
                        'Ministry of Health, Labor and Welfare',
                        'Pharmaceuticals and Medical Devices Agency'];
                    break;
                case 'Jordan':
                    authorityOrgArr = ['Ethical Committee'];
                    break;
                case 'Kazakhstan':
                    authorityOrgArr = ['Ethical Commission'];
                    break;
                case 'Kenya':
                    authorityOrgArr = ['Ethical Review Committee',
                        'Institutional Review Board',
                        'Ministry of Health'];
                    break;
                case 'Korea, Republic of':
                    authorityOrgArr = ['Food and Drug Administration',
                        'Institutional Review Board',
                        'Ministry for Health, Welfare and Family Affairs'];
                    break;
                case 'Latvia':
                    authorityOrgArr = ['Institutional Review Board',
                                        'State Agency of Medicines'];
                    break;
                case 'Lebanon':
                    authorityOrgArr = ['Institutional Review Board',
                                        'Ministry of Public Health'];
                    break;
                case 'Liechtenstein':
                    authorityOrgArr = ['Control Authority for Medicinal Products'];
                    break;
                case 'Lithuania':
                    authorityOrgArr = ['Bioethics Committee',
                        'State Medicine Control Agency - Ministry of Health'];
                    break;
                case 'Luxembourg':
                    authorityOrgArr = ['Comite National d\'Ethique de Recherche', 'Ministère de la Santé'];
                    break;
                case 'Macedonia':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Health'];
                    break;
                case 'Madagascar':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Malawi':
                    authorityOrgArr = ['College of Medicine Research and Ethics Committee',
                        'National Health Sciences Research Committee'];
                    break;
                case 'Malaysia':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Mali':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Malta':
                    authorityOrgArr = ['Medicines Authority'];
                    break;
                case 'Mauritius':
                    authorityOrgArr = ['Ministry of Health and Quality of Life'];
                    break;
                case 'Mexico':
                    authorityOrgArr = ['Ethics Committee',
                        'Federal Commission for Protection Against Health Risks',
                        'Federal Commission for Sanitary Risks Protection',
                        'Ministry of Health',
                        'National Council of Science and Technology',
                        'National Institute of Public Health, Health Secretariat'];
                    break;
                case 'Moldavia':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Morocco':
                    authorityOrgArr = ['Ministry of Public Health'];
                    break;
                case 'Mozambique':
                    authorityOrgArr = ['Ministry of Health (MISAU)'];
                    break;
                case 'Netherlands':
                    authorityOrgArr = ['Independent Ethics Committee', 'Dutch Health Care Inspectorate', 'Medical Ethics Review Committee (METC)', 'Medicines Evaluation Board (MEB)', 'Ministry of Health, Welfare and Sport', 'The Central Committee on Research Involving Human Subjects (CCMO)'];
                    break;
                case 'New Zealand':
                    authorityOrgArr = ['Food Safety Authority', 'Health Research Council', 'Health and Disability Ethics Committees', 'Institutional Review Board', 'Medsafe', 'Ministry of Health'];
                    break;
                case 'Niger':
                    authorityOrgArr = ['Institutional Review Board'];
                    break;
                case 'Nigeria':
                    authorityOrgArr = ['The National Agency for Food and Drug Administration and Control'];
                    break;
                case 'Norway':
                    authorityOrgArr = ['Data Inspectorate',
                        'Directorate for Health and Social Affairs',
                        'Ethics Committee',
                        'Norwegian Institute of Public Health',
                        'Norwegian Medicines Agency',
                        'Norwegian Social Science Data Services',
                        'Royal Norwegian Ministry of Health and Care Services',
                        'The National Committees for Research Ethics in Norway'];
                    break;
                case 'Pakistan':
                    authorityOrgArr = ['Ministry of Health', 'Research Ethics Committee'];
                    break;
                case 'Panama':
                    authorityOrgArr = ['Commemorative Institute GORGAS of Studies of Health', 'Ministry of Health'];
                    break;
                case 'Paraguay':
                    authorityOrgArr = ['Ministerio de Salud Pública y Bienestar Social'];
                    break;
                case 'Peru':
                    authorityOrgArr = ['Ethics Committee',
                        'General Directorate of Pharmaceuticals, Devices, and Drugs',
                        'Instituto Nacional de Salud', 'Ministry of Health'];
                    break;
                case 'Philippines':
                    authorityOrgArr = ['Bureau of Food and Drugs',
                        'Department of Health', 'Ethics Committee',
                        'Philippine Council for Health Research and Development'];
                    break;
                case 'Poland':
                    authorityOrgArr = ['Ethics Committee',
                        'Ministry of Health',
                        'Ministry of Science and Higher Education',
                        'Office for Registration of Medicinal Products, Medical Devices and Biocidal Products',
                        'The Central Register of Clinical Trials'];
                    break;
                case 'Portugal':
                    authorityOrgArr = ['Ethics Committee for Clinical Research',
                        'Health Ethic Committee',
                        'National Pharmacy and Medicines Institute'];
                    break;
                case 'Qatar':
                    authorityOrgArr = ['Hamad Medical Corporation'];
                    break;
                case 'Romania':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Public Health',
                        'National Authority for Scientific Research',
                        'National Medicines Agency',
                        'State Institute for Drug Control'];
                    break;
                case 'Russian Federation':
                    authorityOrgArr = ['Ethics Committee',
                        'FSI Scientific Center of Expertise of Medical Application',
                        'Ministry of Health and Social Development of the Russian Federation',
                        'Pharmacological Committee, Ministry of Health'];
                    break;
                case 'Rwanda':
                    authorityOrgArr = ['Ethics Committee'];
                    break;
                case 'Saudi Arabia':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Health', 'Research Advisory Council'];
                    break;
                case 'Scotland':
                    authorityOrgArr = ['Scottish Executive Health Department'];
                    break;
                case 'Senegal':
                    authorityOrgArr = ['Ministere de la sante'];
                    break;
                case 'Serbia and Montenegro':
                    authorityOrgArr = ['Agency for Drugs and Medicinal Devices'];
                    break;
                case 'Serbia':
                    authorityOrgArr = ['Ethics Committee'];
                    break;
                case 'Sierra Leone':
                    authorityOrgArr = ['Ministry of Health and Sanitation'];
                    break;
                case 'Singapore':
                    authorityOrgArr = ['Clinical Trials & Epidemiology Research Unit (CTERU)', 'Domain Specific Review Boards', 'Health Sciences Authority'];
                    break;
                case 'Slovakia':
                    authorityOrgArr = ['Ethics Committee', 'State Institute for Drug Control'];
                    break;
                case 'Slovenia':
                    authorityOrgArr = ['Agency for Medicinal Products - Ministry of Health', 'Ethics Committee', 'Ministry of Health'];
                    break;
                case 'Solomon Islands':
                    authorityOrgArr = ['National Health Research Ethics Committee'];
                    break;
                case 'South Africa':
                    authorityOrgArr = ['Department of Health', 'Human Research Ethics Committee', 'Medicines Control Council', 'National Health Research Ethics Council'];
                    break;
                case 'South Korea':
                    authorityOrgArr = ['Institutional Review Board', 'Korea Food and Drug Administration (KFDA)'];
                    break;
                case 'Spain':
                    authorityOrgArr = ['Agencia Española de Medicamentos y Productos Sanitarios', 'Comité Ético de Investigación Clínica', 'Ethics Committee', 'Ministry of Health', 'Ministry of Health and Consumption', 'Spanish Agency of Medicines'];
                    break;
                case 'Sri Lanka':
                    authorityOrgArr = ['Ministry of Healthcare & Nutrition'];
                    break;
                case 'Sudan':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Sweden':
                    authorityOrgArr = ['Institutional Review Board', 'Medical Products Agency', 'Regional Ethical Review Board', 'Swedish National Council on Medical Ethics', 'Swedish Research Council', 'The National Board of Health and Welfare'];
                    break;
                case 'Switzerland':
                    authorityOrgArr = ['Ethikkommission', 'Federal Office of Public Health', 'Laws and standards', 'Swissmedic'];
                    break;
                case 'Taiwan, Republic Of China':
                    authorityOrgArr = ['Center for Drug Evaluation', 'Department of Health', 'Institutional Review Board', 'National Bureau of Controlled Drugs'];
                    break;
                case 'Tanzania, United Republic of':
                    authorityOrgArr = ['Food & Drug Administration', 'Ministry of Health', 'National Institute for Medical Research'];
                    break;
                case 'Thailand':
                    authorityOrgArr = ['Ethical Committee', 'Food and Drug Administration', 'Khon Kaen University Ethics Committee for Human Research', 'Ministry of Public Health'];
                    break;
                case 'Trinidad and Tobago':
                    authorityOrgArr = ['Ministry of Health'];
                    break;
                case 'Tunisia':
                    authorityOrgArr = ['Ministry of Public Health', 'Office of Pharmacies and Medicines'];
                    break;
                case 'Turkey':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Health'];
                    break;
                case 'Uganda':
                    authorityOrgArr = ['Ministry of Health', 'National Council for Science and Technology', 'National Drug Authority', 'Research Ethics Committee'];
                    break;
                case 'Ukraine':
                    authorityOrgArr = ['Ministry of Health', 'State Pharmacological Center - Ministry of Health'];
                    break;
                case 'United Arab Emirates':
                    authorityOrgArr = ['Drug Control Department - Medicines and Pharmacy Control - Ministry of Health', 'General Authority for Health Services for Abu Dhabi'];
                    break;
                case 'United Kingdom':
                    authorityOrgArr = ['Department of Health', 'Food Standards Agency', 'Medicines and Healthcare Products Regulatory Agency', 'National Health Service', 'National Institute for Health Research', 'Research Ethics Committee'];
                    break;
                case 'United Nations':
                    authorityOrgArr = ['International Atomic Energy Agency'];
                    break;
                case 'Uruguay':
                    authorityOrgArr = ['Comite de Etica'];
                    break;
                case 'Venezuela, Bolivarian Republic of':
                    authorityOrgArr = ['Ethics Committee', 'Ministry of Health and Social Development'];
                    break;
                case 'Vietnam':
                    authorityOrgArr = ['Ho Chi Minh City Health Service', 'Ministry of Health'];
                    break;
                case 'Yemen':
                    authorityOrgArr = ['Ministry of Public Health and Population'];
                    break;
                case 'Zambia':
                    authorityOrgArr = ['Ministry of Health', 'Pharmaceutical Regulatory Authority', 'Research Ethics Committee'];
                    break;
                case 'Zanzibar':
                    authorityOrgArr = ['Ministry of Health and Social Welfare'];
                    break;
                case 'Zimbabwe':
                    authorityOrgArr = ['Medical Research Council'];
                    break;
                default:
                    authorityOrgArr = [];
            }

            return authorityOrgArr;
        }

        // Validation logic for Other Trial Identifier
        function checkOtherId(protocolIdOriginId, protocolIdOriginCode, protocolId, addedOtherIds) {
            var errorMsg = '';

            if (!protocolIdOriginId || !protocolId) {
                errorMsg = 'Please select a Protocol ID Origin and enter a Protocol ID';
                return errorMsg;
            }
            for (var i = 0; i < addedOtherIds.length; i++) {
                if (addedOtherIds[i].protocol_id_origin_id == protocolIdOriginId
                    && protocolIdOriginCode !== 'OTH'
                    && protocolIdOriginCode !== 'ONCT') {
                    errorMsg = addedOtherIds[i].protocol_id_origin_name + ' already exists';
                    return errorMsg;
                } else if (addedOtherIds[i].protocol_id_origin_id == protocolIdOriginId
                    && addedOtherIds[i].protocol_id === protocolId
                    && (protocolIdOriginCode === 'OTH'
                    || protocolIdOriginCode === 'ONCT')) {
                    errorMsg = addedOtherIds[i].protocol_id_origin_name + ' ' + addedOtherIds[i].protocol_id + ' already exists';
                    return errorMsg;
                }
            }
            // Validate the format of ClinicalTrials.gov Identifier: NCT00000000
            if ((protocolIdOriginCode === 'NCT' || protocolIdOriginCode === 'ONCT') && !/^NCT\d{8}$/.test(protocolId)) {
                errorMsg = 'The format must be "NCT" followed by 8 numeric characters';
                return errorMsg;
            }

            return errorMsg;
        }

        // Validation logic for Trial Oversight Authority Country/Organization
        function checkAuthority(authorityCountry, authorityOrg, addedAuthorities) {
            var errorMsg = '';

            if (!authorityCountry || !authorityOrg) {
                errorMsg = 'Please select a Country and Organization';
                return errorMsg;
            }
            for (var i = 0; i < addedAuthorities.length; i++) {
                if (addedAuthorities[i].country === authorityCountry && addedAuthorities[i].organization === authorityOrg) {
                    errorMsg = addedAuthorities[i].country + ' ' + addedAuthorities[i].organization + ' already exists';
                    return errorMsg;
                }
            }

            return errorMsg;
        }

        /**
         * Upload a file associated with a given trial
         *
         * @param trialId
         * @param documentType
         * @param file
         */
        function uploadDocument(trialId, documentType, documentSubtype, file) {
            Upload.upload({
                url: HOST + URL_CONFIGS.TRIAL_DOCUMENT_LIST,
                method: 'POST',
                data: {
                    'trial_document[document_type]': documentType,
                    'trial_document[document_subtype]': documentSubtype,
                    'trial_document[trial_id]': trialId,
                    'trial_document[file]': file
                }
                //file: file,
                //fileFormDataName: 'trial_document[file]'
            //}).progress(function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //$log.info('progress: ' + progressPercentage + '% ' + evt.config._file.name);
            }).success(function (data, status, headers, config) {
                Common.broadcastMsg(MESSAGES.DOCUMENT_UPLOADED);
                $log.info('file ' + config._file.name + ' uploaded.');
            }).error(function (data, status, headers, config) {
                $log.info('file ' + config._file.name + ' upload error. error status: ' + status);
            });
        }

        /**
         * Insert newStatus into statusArr ordered by status_date
         *
         * @param statusArr
         * @param newStatus
         */
        function addStatus(statusArr, newStatus) {
            var idx = statusArr.length;

            for (var i = 0; i < statusArr.length; i++) {
                var newDateStr = DateService.convertLocaleDateToISODateStr(newStatus.status_date);
                var newDate = new Date(newDateStr);
                var arrayDateStr = DateService.convertLocaleDateToISODateStr(statusArr[i].status_date);
                var arrayDate = new Date(arrayDateStr);

                if (newDate.getTime() < arrayDate.getTime()) {
                    idx = i;
                    break;
                }
            }
            statusArr.splice(idx, 0, newStatus);
        }

        /**
         * Get validation warnings/errors for trial statuses
         *
         * @param statuses
         */
        function validateStatus(statuses) {
            if (!!statuses) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.VALIDATE_TRIAL_STATUS, statuses);
            }
        }

        /**
         * Search ClinicalTrials.gov using NCT ID
         *
         * @param nctId
         * @returns {*}
         */
        function searchClinicalTrialsGov(nctId) {
            if (!!nctId) {
                return PromiseTimeoutService.getData(URL_CONFIGS.SEARCH_CLINICAL_TRIALS_GOV + '?nct_id=' + nctId);
            }
        }

        /**
         * Import from ClinicalTrials.gov using NCT ID
         *
         * @param nctId
         */
        function importClinicalTrialsGov(nctId) {
            if (!!nctId) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.IMPORT_CLINICAL_TRIALS_GOV, {"nct_id": nctId});
            }
        }

        /**
         * delete an trial with the given trialId
         *
         * @param trialId
         * @returns {*}
         */
        function deleteTrial(trialId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.A_TRIAL + trialId + '.json');
        }
    }
})();
