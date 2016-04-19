/**
 * Author: Shamim Ahmed
 * Date: 04/10/2016
 * Page Object: Participating Site
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

var abstractionParticipating = function(){


    var helper = new helperFunctions();
    /*
     * Participating Site object(s)
     */

    //Add Participating Site
    this.addParticipatingSiteBtn = element(by.id('add_participating_site'));

    //Add Organization
    this.searchOrgnaizationsBtn = element(by.id('org_search_modal'));
    this.orgnizationTxt = element(by.model('psView.currentParticipatingSite.organization.name')); //by.id('organization')
    this.cityTxt = element(by.model('psView.city'));
    this.stateTxt = element(by.model('psView.state_province'));
    this.countryTxt = element(by.model('psView.country'));
    this.zipPostalCodeTxt = element(by.model('psView.postal_code'));

    this.orgnizationLbl = element(by.css('label[for="organization"]'));
    this.cityLbl = element(by.css('label[for="city"]'));
    this.stateLbl = element(by.css('label[for="state_province"]'));
    this.countryLbl = element(by.css('.control-label.col-xs-12.col-sm-3'));
    this.zipPostalCodeLbl = element(by.css('label.control-label.col-xs-12.col-sm-3'));

    //Program Code
    this.programCodeTxt = element(by.model('psView.currentParticipatingSite.program_code'));
    this.programCodeLbl = element(by.css('label[for="program_code"]'));

    //Local Trial Identifier
    this.identifierTxt = element(by.model('psView.currentParticipatingSite.local_trial_identifier'));
    this.identifierLbl = element();

    //Site Recruitment
    this.statusDateTxt = element(by.id('status_date'));
    this.statusDateLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(01)'));
    this.statusList = element(by.id('status_date'));
    this.statusLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(02)'));
    this.commentTxt = element(by.model('psView.current_site_recruitment.comments'));
    this.commentLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(03)'));
    this.addBtn = element(by.css('.table.table-striped.table-condensed tbody tr td:nth-child(04) button'));

    this.statusDateTblHead = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.statusTblHead = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.commentTblHead= element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.errorsTblHead= element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));
    this.eidtTblHead= element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(05)'));
    this.deleteTblHead= element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(06)'));

    this.tbleRWAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr td:nth-child(01)'));
    this.tbleRWAColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr td:nth-child(02)'));
    this.tbleRWAColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr td:nth-child(03)'));
    this.tbleRWAColD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr td:nth-child(04)'));
    this.tbleRWAColE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr td:nth-child(05) button'));
    this.tbleRWAColF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr td:nth-child(06) button'));



    //Save and Reset
    this.saveBtn = element(by.id('submit_processing'));
    this.resetBtn = element(by.css('button[ng-disabled="psView.current_site_recruitment.edit"]'));

    //Back to Participating Site List
    this.backParticipatingSiteList = element(by.id('participating_site_list'));



    //page Header
    this.trialDocHeader = element(by.css('h4.panel-title'));

    //Labels Text
    this.trialDocTitle = element(by.css('h4.ng-scope'));

    //Click Add Participating Site - Button
    this.clickAddParticipatingSite = function(){
        helper.clickButton(this.addParticipatingSiteBtn, "Add Participating Site - Button");
    };

    this.clickSearchOrganization = function(){
        helper.clickButton(this.searchOrgnaizationsBtn, "Search Organization - Button");
    };

    this.setProgramCode = function(getProgramCode){
        helper.setValue(this.programCodeTxt, getProgramCode, "Program Code - Text Field");
    };

    this.setIdentifier = function(getIdentifier){
        helper.setValue(this.identifierTxt, getIdentifier, "Identifier - Text Field");
    };

    this.setStatusDate = function(getStatusDate){
        helper.setReadOnlyFieldValue(this.statusDateTxt, getStatusDate, "Status Date - Date Text Field");
    };

    this.selectStatus = function(status)  {
        helper.selectValueFromList(this.statusList, status, "Status - List field");
    };

    this.setComment = function(getComment){
        helper.setValue(this.commentTxt, getComment, "Comment - Text Field");
    };

    //Verifying Add Organization
    this.verifyOrg = function(orgNm){
        helper.getVerifyValue(this.orgnizationTxt, orgNm, "Verifying Organization - Field");
    };

    this.verifyCity = function(city){
        helper.getVerifyValue(this.cityTxt, city, "Verifying City - Field");
    };

    this.verifyState = function(state){
        helper.getVerifyValue(this.stateTxt, state, "Verifying State - Field");
    };

    this.verifyCountry = function(country){
        helper.getVerifyValue(this.cityTxt, country, "Verifying Country - Field");
    };

    this.verifyZip = function(zip){
        helper.getVerifyValue(this.zipPostalCodeTxt, zip, "Verifying Zip/Postal Code - Field");
    };

    //Verifying Program Code
    this.verifyProgramCode = function(prgmCode){
        helper.getVerifyValue(this.programCodeTxt, prgmCode, "Verifying Program Code - Field");
    };

    //Verifying Identifier
    this.verifyIdentifier = function(identifier){
        helper.getVerifyValue(this.identifierTxt, identifier, "Verifying Identifier - Field");
    };


    //Error
    this.verifyErrorMsg = function (expErrorMsg) {
        helper.getVerifyRequired(this.trialDocErrorMsg, expErrorMsg, "Error Message");
    };

    this.verifyRequiredErrorMsg = function (expReqErrorMsg) {
        helper.getVerifyRequired(this.trialDocRequiredErrorMsg, expReqErrorMsg, "Required Error Message");
    };

    this.verifyDocErrorMsg = function (expErrorMsg) {
        helper.getVerifyRequired(this.trailDocDupErrorMsg, expErrorMsg, "Document Exists Error Message");
    };

    //Wait For Element : Wait
    this.waitForRegulatoryInfoElement = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

    this.errorHandaler = function (expVal, actVal){
        try {
            if (expVal === actVal) {
                //do nothing
            } else {
                throw new Error('Expected assertion: (' + expVal + ') has no match with Actual value: (' + actVal + ')');
            }
        } catch (err) {
            callback(err.message);
        }
    };


};

module.exports = abstractionParticipating;
