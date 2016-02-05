/**
 * Author: Shamim Ahmed
 * Date: 01/08/2015
 * Feature: PAA F07 Add and Edit Trial Funding
 *
 * Note: In the PA search screen it has dependency on the seed data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

//Required dependencies
//Login dependencies
var loginPage = require('../support/LoginPage');
//helper methods
var helperMethods = require('../support/helper');
//Project Related methods dependencies
var projectFunctionMethods= require('../support/projectMethods');
//Menu bar dependencies
var abstractionPageMenu = require('../support/abstractionCommonBar');
//Abstraction search page dependencies
var abstractionTrialSearchPage = require('../support/abstractionSearchTrialPage');
//Abstraction common dependencies
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//Abstraction NCI Specific Information
var abstractionNCISpecific = require('../support/abstractionNCISpecificInfo');
//List of Organization
var OrgPage = require('../support/ListOfOrganizationsPage');
//Organization Search
var orgSearch = require('../support/abstractionOrganizationSearch');
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
//Regulatory Information - Trail Funding
var abstractionRegulatoryTrialFunding = require('../support/abstractionTrialFunding');



module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var indIDE = new abstractionRegulatoryINDIDE();
    var trialFunding = new abstractionRegulatoryTrialFunding();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var searchResultCountText = 'Trial Search Results';
    var nciGrantQueVal = '';

    /*
     Scenario: #1 I can indicate that the trial does not have an associated grant
     Given I am logged into the CTRP Protocol Abstraction application to abstract
     And I have selected trail
     And I am on the Trial Funding Screen
     When I have selected "No" for the question "Is this trial funded by a NCI Grant?"
     Then the FDAAA required Grant Information for the trial will be complete
     */

    this.Given(/^I am logged into the CTRP Protocol Abstraction application to abstract$/, function (callback) {
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected trial$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Trial Funding Screen$/, function (callback) {
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDA);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDA);
        commonFunctions.adminCheckOut();
        trialFunding.clickAdminDataTrialFunding();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected "([^"]*)" for the NCI Grant question "([^"]*)"$/, function (arg1, arg2, callback) {
        var getQueNCIGrant = arg2;
        console.log('NCI Grant Que?: '+getQueNCIGrant);
        var getYesNoFlag = arg1;
        console.log('Condition: '+getYesNoFlag);
        trialFunding.nciGrantQuelbl.getText().then(function(value){
            var pasNCIGrantQue = ''+value+'';
            function retNciGrantQueVal(){
                return pasNCIGrantQue;
            };
            nciGrantQueVal = retNciGrantQueVal();
            console.log('System Identified ['+nciGrantQueVal+'] as the current NCI Grant value');
        });
        if (arg2 === nciGrantQueVal){
            trialFunding.verifyNCIGrantlblValue(getQueNCIGrant);
        };
        if (arg1 === 'No'){
            trialFunding.selectNCIGrantQueRdo('1');
        }else if(arg1 === 'Yes'){
            trialFunding.selectNCIGrantQueRdo('0');
        }
        browser.sleep(25).then(callback);
    });

    this.Then(/^the FDAAA required Grant Information for the trial will not be complete$/, function (callback) {
        trialFunding.verifyNCIGrantYesOrNoOption('1', true);
        //Fudning Mechanism Fields
        helper.verifyElementDisplayed(trialFunding.nciGrantFundingMechanism, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantInstitueCode, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantSerialNumber, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantNCIDivisionProgCode, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantAddButton, false);
        //Fudning Mechanism Labels
        helper.verifyElementDisplayed(trialFunding.nciGrantLblFundingMechanism, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantLblInstitueCode, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantLblSerialNumber, false);
        helper.verifyElementDisplayed(trialFunding.nciGrantLblNCIDivisionProgCode, false);
        browser.sleep(25).then(callback);
    });








};