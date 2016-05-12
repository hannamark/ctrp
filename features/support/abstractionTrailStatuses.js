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
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionTrailStatuses = function(){


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
    this.tblEditRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(06) button'));
    this.tblDeleteRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(07) button'));

    this.tblStatusDateRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(01)'));
    this.tblStatusRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)'));
    this.tblCommentRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(03)'));
    this.tblWhyStopedRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(04)'));
    this.tblErrorsWarningRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(05)'));
    this.tblEditRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(06) button'));
    this.tblDeleteRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(07) button'));
    //trial status edit
    this.statuesesCancel = element();
    this.statuesesConfirm = element();

    //Trial Dates
    this.trialStartDate = element();
    this.trialStartDateCalendar = element();
    this.trialStartDateRadio = element();
    this.primaryCompletionDate = element();
    this.primaryCompletionDateCalendar = element();
    this.primaryCompletionDateRadio = element();
    this.completionDate = element();
    this.completionDateCalendar = element();
    this.completionDateRadio = element();

    //Trial Comment
    this.trialComment = element();
    this.trialCommentAddBtn  = element();

    //Save and Reset
    this.trialStatusSaveBtn = element();
    this.trialStatusResetBtn = element();






};

module.exports = abstractionTrailStatuses;
