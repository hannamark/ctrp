/**
 * Author: Shamim Ahmed
 * Date: 01/09/2015
 * Page Object: Abstraction NCI Specific Information Page
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionNCISpecificInfo = function(){

    //Admin Data
    //General Trial Details
    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    //Regulatory Information - FDAAA
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    //Regulatory Information - Human Subject Safety
    //Regulatory Information - IND/EDE
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    //Trial Status
    //Trial Funding
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    //NCI Specific Information
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));

    //NCI Specific Information Page Objects
    this.nciSpecificStudySource = element(by.model('trialNciView.curTrial.study_source_id'));
    this.nciSpecificSearchOrganisations = element(by.buttonText(' Search Organizations')); //by.id('org_search_modal')
    this.nciSpecificProgramCode = element(by.model('trialNciView.curTrial.program_code'));
    this.nciSpecificDepartmentIdentifier = element(by.model('trialNciView.curTrial.nih_nci_div'));
    this.nciSpecificProgramID = element(by.model('trialNciView.curTrial.nih_nci_prog'));
    this.nciSpecificSendTrial = element(by.model('trialNciView.curTrial.send_trial_flag')); //by.model('trialNciView.curTrial.send_trial_flag')
    this.nciSpecificComments = element(by.id('trial_processing_comment'));

    this.nciSpecificAdminCheckOut = element(by.id('admin_checkout')); //by.id('admin_checkout') by.css('#admin_checkout') by.buttonText('Admin Check Out')
    this.nciSpecificAdminCheckIn = element(by.id('admin_checkin')); //by.buttonText('Admin Check In')
    this.nciSpecificAdminBackToSearchResult = element(by.buttonText('↵ Back to Search Results↵ '));

    this.nciSpecificSave = element(by.buttonText('Save'));
    this.nciSpecificReset = element(by.buttonText('↵ Reset↵ '));

    var helper = new helperFunctions();

    //General Trial Details: Click Left Navigation Link
    this.clickAdminDataGeneralTrial = function(){
        helper.clickButton(this.adminDataGeneralTrial, "General Trial Details Admin Data Button");
    };

    //Regulatory Information - FDAAA: Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoFDA = function(){
        helper.clickButton(this.adminDataRegulatoryInfoFDA, "Regulatory Information - FDAAA Admin Data Button");
    };

    //Regulatory Information - IND/EDE : Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoIND = function(){
        helper.clickButton(this.adminDataRegulatoryInfoIND, "Regulatory Information - IND/EDE Admin Data Button");
    };

    //Trial Funding : Click Left Navigation Link
    this.clickAdminDataTrialFunding = function(){
        helper.clickButton(this.adminDataTrialFunding, "Trial Funding Admin Data Button");
    };

    //NCI Specific Information : Click Left Navigation Link
    this.clickAdminDataNCISpecificInformation = function(){
      helper.clickButton(this.adminDataNciSpecific, "NCI Specific Information Admin Data Button");
    };

    //Study Source : Drop down
    this.selectStudySource = function(studySource)  {
        helper.selectValueFromList(this.nciSpecificStudySource,studySource,"Study Source - drop down field selected as:["+studySource+"]");
    };

    //Search Organization : Button
    this.clickSearchOrganization = function(){
        helper.clickButton(this.nciSpecificSearchOrganisations, "Search Organization button clicked");
    }

    //Program Code : Text Box
    this.setProgramCode = function(programCode)  {
        helper.setValue(this.nciSpecificProgramCode,programCode,"Program Code field value set as:["+programCode+"]");
    };

    //Department Identifier : Drop down
    this.selectDepartmentIdentifier = function(departmentID)  {
        helper.selectValueFromList(this.nciSpecificDepartmentIdentifier,departmentID,"NIH/NCI Division/Department Identifier - drop down field selected as:["+departmentID+"]");
    };

    //Program ID : Drop down
    this.selectProgramID = function(programID)  {
        helper.selectValueFromList(this.nciSpecificProgramID,programID,"NIH/NCI Program Id - drop down field selected as:["+programID+"]");
    };

    //Send Trial : Radio Button
    this.selectSendTrial = function(sendTrialYesOrNo)  {
        helper.clickRadioButton(this.nciSpecificSendTrial,sendTrialYesOrNo,"Send Trial Information to ClinicalTrials.gov? - radio button field selected as:["+sendTrialYesOrNo+"]");
    };

    //Comment : Text Box
    this.setComment = function(getComment)  {
        helper.setValue(this.nciSpecificComments,getComment,"Comment field value set as:["+getComment+"]");
    };

    //Admin Check Out : Button
    this.clickAdminCheckOut = function(){
        helper.clickButton(this.nciSpecificAdminCheckOut,"Admin Check Out - button");
    };

    //Admin Check In : Button
    this.clickAdminCheckIn = function(){
        helper.clickButton(this.nciSpecificAdminCheckIn,"Admin Check In - button");
    };

    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.nciSpecificSave,"Save - button");
    };

    //Reset : Button
    this.clickReset = function(){
        helper.clickButton(this.nciSpecificReset,"Reset - button");
    };

    //Verify Study Source
    this.verifyStudySourceCurrentValue = function(){
        this.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            return value
            console.log("study source: "+value);
        });
    };

    this.getVerifyListValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - Got value");
    };

    this.wait = function (element, label) {
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


};

module.exports = abstractionNCISpecificInfo;
