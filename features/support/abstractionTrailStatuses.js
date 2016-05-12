/**
 * Author: Shamim Ahmed
 * Date: 05/10/2016
 * Page Object: Trial Status
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionTrailStatuses = function(){

    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;
    /*
     * Trial Status object(s)
     */

    //Trial Statuses
    this.statuesesStatusDate = element(by.model('trialStatusView.statusObj.status_date'));
    this.statuesesStatusDateCalendar = element(by.id('status_date_calendar'));
    this.statuesesStatus = element(by.model('trialStatusView.statusObj.trial_status_id')); //by.id('status_select')
    this.statuesesComment = element(by.model('trialStatusView.statusObj.comment'));
    this.statuesesWhyStoped = element(by.model('trialStatusView.statusObj.why_stopped'));
    this.statuesesAdd = element(by.id('trial_status_add_btn'));

    this.tblStatusDateTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.tblStatusTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.tblCommentTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.tblWhyStopedTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));
    this.tblErrorsWarningTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(05)'));
    this.tblEditTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(06)'));
    this.tblDeleteTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(07)'));

    this.tblStatusDateRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(01)'));
    this.tblStatusRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)'));
    this.tblCommentRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(03)'));
    this.tblWhyStopedRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(04)'));
    this.tblErrorsWarningRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(05)'));
    this.tblEditRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(06) #edit_btn'));
    this.tblDeleteRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(07) #delete_btn'));

    this.tblStatusDateRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(01)'));
    this.tblStatusRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)'));
    this.tblCommentRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(03)'));
    this.tblWhyStopedRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(04)'));
    this.tblErrorsWarningRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(05)'));
    this.tblEditRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(06) #edit_btn'));
    this.tblDeleteRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(07) #delete_btn'));
    //trial status edit
    this.statuesesCancel = element(by.id('trial_status_cancel'));
    this.statuesesConfirm = element(by.id('trial_status_confirm'));

    //Trial Dates
    this.trialStartDate = element(by.id('trial_start_date'));
    this.trialStartDateCalendar = element(by.id('trial_start_date_calendar'));
    this.trialStartDateRadioActual = element(by.id('trial_start_date_radio_btn_actual'));
    this.trialStartDateRadioAnticipated = element(by.id('trial_start_date_radio_btn_anticipated'));
    this.primaryCompletionDate = element(by.id('primary_completion_date'));
    this.primaryCompletionDateCalendar = element(by.id('primary_completion_date_calendar'));
    this.primaryCompletionDateRadioActual = element(by.id('primary_completion_date_radio_btn_actual'));
    this.primaryCompletionDateRadioAnticipated = element(by.id('primary_completion_date_radio_btn_anticipated'));
    this.completionDate = element(by.id('completion_date'));
    this.completionDateCalendar = element(by.id('completion_date_calendar'));
    this.completionDateRadioActual = element(by.id('completion_date_radio_btn_actual'));
    this.completionDateRadioAnticipated = element(by.id('completion_date_radio_btn_anticipated'));

    //Trial Comment
    this.trialComment = element(by.id('status_comment'));
    this.trialCommentAddBtn  = element(by.id('trial_comment_add_btn'));

    //Save and Reset
    this.trialStatusSaveBtn = element(by.id('save_btn'));
    this.trialStatusResetBtn = element(by.id('cancel_btn'));

    this.setStatusDate = function(dateYear, dateMonth, dateDay){
        this.statuesesStatusDate.click();
        dateFunctions.clickAddTrialDateFieldDifferentYear(dateYear, dateMonth, dateDay);
    };

    this.selectStatus = function(getValue){
      helper.selectValueFromList(this.statuesesStatus, getValue, 'Select Status');
    };

    this.setStatusComment = function(getCommentValue){
      helper.setValue(this.statuesesComment, getCommentValue, 'Status comment');
    };

    this.setWhyStudyStopped = function(getWhyStoppedValue){
      helper.setValue(this.statuesesWhyStoped, getWhyStoppedValue, 'Why Study Stopped');
    };




};

module.exports = abstractionTrailStatuses;
