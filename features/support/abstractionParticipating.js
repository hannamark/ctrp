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

    //Participating Site Tab(s)
    this.participatingSiteTab = element(by.id('participating_site'));
    this.investigatorsTab = element(by.id('investigators'));
    this.contactTab = element(by.id('contact'));

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
    this.statusDateCurntSelect = element()
    this.statusDateLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(01)'));
    this.statusList = element(by.id('siteRecStatus_select'));
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

    //Investigators
    this.searchPersonsBtn = element(by.id('person_search_modal'));
    this.investigatorName = element(by.id('principal_investigator'));

    this.poIDTbl = element(by.css('.table.table-bordered.table-striped.table-hover'));
    this.poIDTblAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));

    this.poIDTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.lastNameTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.firstNameTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.roleTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));
    this.statusCodeTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(05)'));
    this.primaryContactTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(06)'));
    this.eidtTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(07)'));
    this.deleteTblHeadInv = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(08)'));

    this.tbleRWAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(01)'));
    this.tbleRWAColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)'));
    this.tbleRWAColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(03)'));
    this.tbleRWAColD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(04)'));
    this.tbleRWAColE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(05)'));
    this.tbleRWAColF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(06)'));
    this.tbleRWAColG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(07) button'));
    this.tbleRWAColH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(08) button'));

    this.tbleRWBColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(01)'));
    this.tbleRWBColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)'));
    this.tbleRWBColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(03)'));
    this.tbleRWBColD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(04)'));
    this.tbleRWBColE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(05)'));
    this.tbleRWBColF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(06)'));
    this.tbleRWBColG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(07) button'));
    this.tbleRWBColH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(08) button'));

    //Save and Reset
    this.saveBtn = element(by.id('submit_processing'));
    this.resetBtn = element(by.css('button[ng-disabled="psView.current_site_recruitment.edit"]'));

    //Back to Participating Site List
    this.backParticipatingSiteList = element(by.id('participating_site_list'));

    //page Header
    this.trialDocHeader = element(by.css('h4.panel-title'));

    //Labels Text
    this.trialDocTitle = element(by.css('h4.ng-scope'));

    this.findPrsnFNameVerfEdtDel = function(exFName, what){
        this.poIDTblAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', exFName, what);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', exFName, what);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', exFName, what);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', exFName, what);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', exFName, what);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', exFName, what);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', exFName, what);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', exFName, what);
                }
            }
        });
        function fNm(iVal, expFName, whatToDo){
            var tableFName = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(3)'));
            getFName = tableFName.getText('value');
            getFName.then(function(Test1){
                console.log("First Name:["+Test1+"]");
                if(expFName === Test1){
                    if (whatToDo === 'verify'){
                        expect(expFName.toString()).to.eql(Test1.toString());
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(07) button'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(08) button'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
            });
        }
    };

    this.editInvestigatorByFirstName = function(expFName){
        this.tbleRWAColC.isDisplayed().then(function (retA) {
            if (retA) {
                getFirstNameA = this.tbleRWAColC.getText('value');
                getFirstNameA.then(function(Test1){
                    if(expFName === Test1){
                        helper.clickButton(this.tbleRWAColG, "Edit - Button");
                    }
                });
            }
        });
        this.tbleRWBColC.isDisplayed().then(function (retB) {
            if (retB) {
                getFirstNameB = this.tbleRWBColC.getText('value');
                getFirstNameB.then(function(Test2){
                    if(expFName === Test2){
                        helper.clickButton(this.tbleRWBColG, "Edit - Button");
                    }
                });
            }
        });
    };

    //Click Add Participating Site - Button
    this.clickAddParticipatingSite = function(){
        helper.clickButton(this.addParticipatingSiteBtn, "Add Participating Site - Button");
    };

    this.clickParticipatingSiteTab = function(){
        helper.clickButton(this.participatingSiteTab, "Participating Site - Tab");
    };

    this.clickInvestigatorsTab = function(){
        helper.clickButton(this.investigatorsTab, "Investigators - Tab");
    };

    this.clickContactTab = function(){
        helper.clickButton(this.contactTab, "Contact - Tab");
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

    this.clickStatusDate = function(){
        this.statusDateTxt.click();
        //helper.setReadOnlyFieldValue(this.statusDateTxt, getStatusDate, "Status Date - Date Text Field");
    };

    this.selectStatus = function(status)  {
        helper.selectValueFromList(this.statusList, status, "Status - List field");
    };

    this.setSiteRecruitmentComment = function(getComment){
        helper.setValue(this.commentTxt, getComment, "Comment - Text Field");
    };

    this.clickSiteRecruitmentAdd = function(){
        helper.clickButton(this.addBtn, "Add - Button");
    };

    this.clickSaveButton = function () {
        helper.clickButton(this.saveBtn, "Save - Button");
    };

    this.clickResetButton = function () {
        helper.clickButton(this.resetBtn, "Reset - Button");
    };

    this.clickSearchPersons = function(){
        helper.clickButton(this.searchPersonsBtn, "Search Persons - Button");
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
