/**
 * Author: Shamim Ahmed
 * Date: 01/08/2015
 * Feature: PAA F02 Add and Edit NCI Specific Information
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


module.exports = function() {
    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var searchResultCountText = 'Trial Search Results';
    var adminDataNCISpecific = 'NCI specific information';
    var nciSpecificStudySourceVal = '';
    var nciSpecificStudySourceResltVal = '';
    var orgSearchCntryList = 'All Countries';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'Memorial Hospital Colorado Springs';
    var nciSpecificFundingSourceValA = '';
    var programCode = '7771234';
    var programCdeEdit = '8881234';
    var nciSpecificDepIdVal = '';
    var nciSpecificDepIDValSelect = '-Select a NIH/NCI Division/Department Identifier-';
    var nciSpecificDepIDValCCR = 'CCR';
    var nciSpecificDepIDValCTEP = 'CTEP';
    var nciSpecificDepIDValDCP = 'DCP';
    var nciSpecificDepIDValNHBLI = 'NHBLI';
    var nciSpecificDeptIDResltVal = '';
    var nciSpecificProgramIdVal = '';
    var nciSpecificProgramIdValSelect = '-Select a NIH/NCI Program ID-';
    var nciSpecificProgramIdValBIQSFP = 'BIQSFP';
    var nciSpecificProgramIdValSPORE = 'SPORE';
    var nciSpecificProgramIdValSteering = 'Steering Commitee Reviewed';
    var nciSpecificProgramIdResultVal = '';
    var nciSpecificCommnetsAdd = 'Test Comments Added to the Comments fields';
    var nciSpecificCommnetsEdit = 'Test Comments Edited to the Comments fields';
    var verfiStudySourceVal = '';
    var verfiSpecificStudySourceRsltVal = '';
    var nciSpecificProgramCodeVal = '';
    var nciSpecificCurrentCommentVal = '';
    var convPrgCde = '';
    var convComment = '';
    var verfiSpecificStudySourceRequired = '';
    var msgStduySourceReq = 'Study Source is required';
    var msgFundingSourceReq = 'Funding Source is required';

    /*
     Scenario: #1 I can view and edit the value for Study Source
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And see the value for Study Source
     When I select a different Study Source value of National, Externally Peer-Reviewed, Institutional, Industrial, or Other
     Then the selected value for Study Source will be associated with the trial
     */

    this.Given(/^I am logged into the CTRP PA application$/, function (callback) {
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the NCI Specific Information screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID);
        //nciSpecific.clickAdminCheckOut();
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        browser.sleep(25).then(callback);
    });

    this.Given(/^see the value for Study Source$/, function (callback) {
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+nciSpecificStudySourceVal+'] as the current Study Source selected value');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select a different Study Source value of National, Externally Peer\-Reviewed, Institutional, Industrial, or Other$/, function (callback) {
        if (nciSpecificStudySourceVal === 'National'){
            nciSpecific.selectStudySource('Institutional');
            var pasNCISpecNewVal = 'Institutional';
            function retNCISpecNewVal(){
                return pasNCISpecNewVal;
            }
            nciSpecificStudySourceResltVal = retNCISpecNewVal();
        };
        if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed'){
            nciSpecific.selectStudySource('Institutional');
            var pasNCISpecNewVal = 'Institutional';
            function retNCISpecNewVal(){
                return pasNCISpecNewVal;
            }
            nciSpecificStudySourceResltVal = retNCISpecNewVal();
        };
        if (nciSpecificStudySourceVal === 'Institutional'){
            nciSpecific.selectStudySource('National');
            var pasNCISpecNewVal = 'National';
            function retNCISpecNewVal(){
                return pasNCISpecNewVal;
            }
            nciSpecificStudySourceResltVal = retNCISpecNewVal();
        };
        if (nciSpecificStudySourceVal === 'Industrial'){
            nciSpecific.selectStudySource('National');
            var pasNCISpecNewVal = 'National';
            function retNCISpecNewVal(){
                return pasNCISpecNewVal;
            }
            nciSpecificStudySourceResltVal = retNCISpecNewVal();
        };
        if (nciSpecificStudySourceVal === 'Other'){
            nciSpecific.selectStudySource('National');
            var pasNCISpecNewVal = 'National';
            function retNCISpecNewVal(){
                return pasNCISpecNewVal;
            }
            nciSpecificStudySourceResltVal = retNCISpecNewVal();
        };
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the selected value for Study Source will be associated with the trial$/, function (callback) {
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        console.log('Expected Study source value to verify: '+nciSpecificStudySourceResltVal);
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificStudySource,nciSpecificStudySourceResltVal,"Study Source field validation");
        login.logout();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #2 I can associate one or more organizations as the Specific Funding Source for a clinical trial
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information page screen
     And I have selected organization look-up
     When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
     Then the selected organization will be associated to the trial as Specific Funding Source
     */

    this.Given(/^I am on the NCI Specific Information page screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected funding source organization look\-up$/, function (callback) {
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+nciSpecificStudySourceVal+'] as the current Study Source selected value');
            if (nciSpecificStudySourceVal === 'National'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Institutional'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Industrial'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Other'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
        });
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(25).then(callback);
    });

    this.When(/^a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(sponsor, Lead, IRB\) are displayed$/, function (callback) {
        nciSpecific.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the selected organization will be associated to the trial as Specific Funding Source$/, function (callback) {
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.verifyFundingSourceOrg(orgSearchNameA);
        nciSpecific.clickFundingSourceOrganizationDel();
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3 I can unassociate one or more organizations from the Specific Funding Source for a clinical trial
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information page screen
     When I have selected the organization to remove from the trial's Specific Funding Source
     Then the selected organization will not be associated to the trial as Specific Funding Source
     */

    this.When(/^I have selected the organization to remove from the trial's Specific Funding Source$/, function (callback) {
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+nciSpecificStudySourceVal+'] as the current Study Source selected value');
            if (nciSpecificStudySourceVal === 'National'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Institutional'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Industrial'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Other'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
        });
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the selected organization will not be associated to the trial as Specific Funding Source$/, function (callback) {
        nciSpecific.verifyFundingSourceOrg(orgSearchNameB);
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.clickFundingSourceOrganizationDel();
        nciSpecific.clickSave();
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        //nciSpecific.verifyFundingSourceOrg('');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #4 I can view and edit the Program Code
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When I select the Program Code field I can edit the value for Program Code
     Then the selected value for Program Code will be associated with the trial
     */

    this.When(/^I select the Program Code field I can edit the value for Program Code$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDC);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDC);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+nciSpecificStudySourceVal+'] as the current Study Source selected value');
            if (nciSpecificStudySourceVal === 'National'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Institutional'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Industrial'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Other'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
        });
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        nciSpecific.setProgramCode(programCode);
        nciSpecific.clickSave();
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDC);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDC);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.setProgramCode(programCdeEdit);
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the selected value for Program Code will be associated with the trial$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDC);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDC);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.verifyProgramCode(programCdeEdit);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #5 I can view and edit the values for NIH/NCI Division/Department Identifier
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And see the value for NIH/NCI Division/Department Identifier
     When I select one or more values from the for the NIH/NCI Division/Department Identifier (CCR, CTEP, DCP, NHLBI)
     Then the selected value(s) for NIH/NCI Division/Department Identifier will be associated with the trial
     */

    this.Given(/^see the value for NIH\/NCI Division\/Department Identifier$/, function (callback) {
        nciSpecific.nciSpecificDepartmentIdentifier.$('option:checked').getText().then(function(value){
            var pasNCISpecDepId = ''+value+'';
            function retNciSpecificDepIdVal(){
                return pasNCISpecDepId;
            }
            nciSpecificDepIdVal = retNciSpecificDepIdVal();
            console.log('System Identified ['+nciSpecificDepIdVal+'] as the current NIH/NCI Division/Department Identifier selected value');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select one or more values from the for the NIH\/NCI Division\/Department Identifier \(CCR, CTEP, DCP, NHLBI\)$/, function (callback) {
        if (nciSpecificDepIdVal === nciSpecificDepIDValSelect){
            nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
            var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;
            function retNCISpecDeptIDNewVal(){
                return pasNCISpecDeptIDNewVal;
            }
            nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
        };
        if (nciSpecificDepIdVal === nciSpecificDepIDValCCR){
            nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
            var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
            function retNCISpecDeptIDNewVal(){
                return pasNCISpecDeptIDNewVal;
            }
            nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
        };
        if (nciSpecificDepIdVal === nciSpecificDepIDValDCP){
            nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
            var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;
            function retNCISpecDeptIDNewVal(){
                return pasNCISpecDeptIDNewVal;
            }
            nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
        };
        if (nciSpecificDepIdVal === nciSpecificDepIDValCTEP){
            nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
            var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
            function retNCISpecDeptIDNewVal(){
                return pasNCISpecDeptIDNewVal;
            }
            nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
        };
        if (nciSpecificDepIdVal === nciSpecificDepIDValNHBLI){
            nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
            var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
            function retNCISpecDeptIDNewVal(){
                return pasNCISpecDeptIDNewVal;
            }
            nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
        };
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the selected value\(s\) for NIH\/NCI Division\/Department Identifier will be associated with the trial$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificDepartmentIdentifier,nciSpecificDeptIDResltVal,"NIH/NCI Division/Department Identifier");
        login.logout();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #6 I can view and edit the values for NIH/NCI Division/Department Identifier
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And see the value for NIH/NCI Program Id
     When I select one or more values from the for the NIH/NCI Program Identifier (BIQSFP, SPORE, Steering Committee Reviewed)
     Then the selected value(s) for NIH/NCI Program Identifier will be associated with the trial
     */

    this.Given(/^see the value for NIH\/NCI Program Id$/, function (callback) {
        nciSpecific.nciSpecificProgramID.$('option:checked').getText().then(function(value){
            var pasNCISpecProgramId = ''+value+'';
            function retNciSpecificProgramIdVal(){
                return pasNCISpecProgramId;
            }
            nciSpecificProgramIdVal = retNciSpecificProgramIdVal();
            console.log('System Identified ['+nciSpecificProgramIdVal+'] as the current NIH/NCI Program Identifier selected value');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select one or more values from the for the NIH\/NCI Program Identifier \(BIQSFP, SPORE, Steering Committee Reviewed\)$/, function (callback) {
        if (nciSpecificProgramIdVal === ''){
            nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
            var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
            function retNCISpecProgIDNewVal(){
                return pasNCISpecProgIDNewVal;
            }
            nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
        };
        if (nciSpecificProgramIdVal === nciSpecificProgramIdValSelect){
            nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
            var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
            function retNCISpecProgIDNewVal(){
                return pasNCISpecProgIDNewVal;
            }
            nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
        };
        if (nciSpecificProgramIdVal === nciSpecificProgramIdValBIQSFP){
            nciSpecific.selectProgramID(nciSpecificProgramIdValSPORE);
            var pasNCISpecProgIDNewVal = nciSpecificProgramIdValSPORE;
            function retNCISpecProgIDNewVal(){
                return pasNCISpecProgIDNewVal;
            }
            nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
        };
        if (nciSpecificProgramIdVal === nciSpecificProgramIdValSPORE){
            nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
            var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
            function retNCISpecProgIDNewVal(){
                return pasNCISpecProgIDNewVal;
            }
            nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
        };
        if (nciSpecificProgramIdVal === nciSpecificProgramIdValSteering){
            nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
            var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
            function retNCISpecProgIDNewVal(){
                return pasNCISpecProgIDNewVal;
            }
            nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
        };
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the selected value\(s\) for NIH\/NCI Program Identifier will be associated with the trial$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificProgramID,nciSpecificProgramIdResultVal,"NIH/NCI Program Id");
        login.logout();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #7 I can view and edit the �Send Trial Information to ClinicalTrials.gov?�
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And the Trial Sponsor is "National Cancer Institute" (Trial/Sponsor_ID where organizations/name = "National Cancer Institute")
     And the Trial Lead Organization is not "NCI - Center for Cancer Research" (Trial/Lead_Org_ID where Organizations/Name = "NCI - Center for Cancer Research")
     And the Trial processing status is �Verification Pending�, "Abstracted", "No Response�, or �Abstracted, Response�
     And the Trial Overall Status is not �Complete�, �Administratively Complete� or �Terminated�
     And the trial Research Category is "Interventional" (Trial/Research_Category_id where Research_Categories/Name = "Interventional")
     When I select the radio button for Yes or No for �Send Trial Information to ClinicalTrials.gov?�
     Then the selected value for �Send Trial Information to ClinicalTrials.gov?� will be Yes or No
     */

    this.Given(/^the Trial Sponsor is "([^"]*)" \(Trial\/Sponsor_ID where organizations\/name = "([^"]*)"\)$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Trial Lead Organization is not "([^"]*)" \(Trial\/Lead_Org_ID where Organizations\/Name = "([^"]*)"\)$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Trial processing status is �Verification Pending�, "([^"]*)", "No Response�, or �Abstracted, Response�$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Trial Overall Status is not �Complete�, �Administratively Complete� or �Terminated�$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the trial Research Category is "([^"]*)" \(Trial\/Research_Category_id where Research_Categories\/Name = "([^"]*)"\)$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the radio button for Yes or No for �Send Trial Information to ClinicalTrials\.gov\?�$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the selected value for �Send Trial Information to ClinicalTrials\.gov\?� will be Yes or No$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    /*
     Scenario: #8 I can view and edit the NCI Specific Information Comments
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When I select the Comments field I can enter or edit comments
     Then the information entered for Comments will be associated with the trial
     */

    this.When(/^I select the Comments field I can enter or edit comments$/, function (callback) {
        nciSpecific.setComment(nciSpecificCommnetsAdd);
        nciSpecific.clickSave();
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.verifyComment(nciSpecificCommnetsAdd);
        nciSpecific.setComment(nciSpecificCommnetsEdit);
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the information entered for Comments will be associated with the trial$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.verifyComment(nciSpecificCommnetsEdit);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #9 Save NCI Specific Information
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information screen
     When select save
     Then the information entered or edited on the NCI Specific Information screen will be saved to the trial record

     var verfiStudySourceVal = '';
     var verfiSpecificStudySourceRsltVal = '';
     */

    this.When(/^select save NCI Specific Information$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDA);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDA);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        //Study Source
        commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            verfiStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+verfiStudySourceVal+'] as the current Study Source selected value');
            if (verfiStudySourceVal === 'National'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Externally Peer-Reviewed'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Institutional'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Industrial'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Other'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
        });
        //Funding Source
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        //Program Code
        nciSpecific.setProgramCode(programCode);
        //NIH/NCI Department Identifiers
        nciSpecific.nciSpecificDepartmentIdentifier.$('option:checked').getText().then(function(value){
            var pasNCISpecDepId = ''+value+'';
            function retNciSpecificDepIdVal(){
                return pasNCISpecDepId;
            }
            nciSpecificDepIdVal = retNciSpecificDepIdVal();
            console.log('System Identified ['+nciSpecificDepIdVal+'] as the current NIH/NCI Division/Department Identifier selected value');
            if (nciSpecificDepIdVal === nciSpecificDepIDValSelect){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValCCR){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValDCP){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValCTEP){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValNHBLI){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
        });
        //NIH/NCI Identifiers
        nciSpecific.nciSpecificProgramID.$('option:checked').getText().then(function(value){
            var pasNCISpecProgramId = ''+value+'';
            function retNciSpecificProgramIdVal(){
                return pasNCISpecProgramId;
            }
            nciSpecificProgramIdVal = retNciSpecificProgramIdVal();
            console.log('System Identified ['+nciSpecificProgramIdVal+'] as the current NIH/NCI Program Identifier selected value');
            if (nciSpecificProgramIdVal === ''){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSelect){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValBIQSFP){
                nciSpecific.selectProgramID(nciSpecificProgramIdValSPORE);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValSPORE;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSPORE){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSteering){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
        });
        //Send Trial Information to ClinicalTrials.gov

        //Comments
        nciSpecific.setComment(nciSpecificCommnetsAdd);
        //Save
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the information entered or edited on the NCI Specific Information screen will be saved to the trial record$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDA);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDA);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        console.log('Expected Study Source: '+verfiSpecificStudySourceRsltVal);
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificStudySource,verfiSpecificStudySourceRsltVal,"Study Source field validation");
        console.log('Expected Funding Source Organization: '+orgSearchNameA);
        nciSpecific.verifyFundingSourceOrg(orgSearchNameA);
        console.log('Expected Program Code: '+programCode);
        nciSpecific.verifyProgramCode(programCode);
        console.log('Expected NIH/NCI Department Identifiers: '+nciSpecificDeptIDResltVal);
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificDepartmentIdentifier,nciSpecificDeptIDResltVal,"NIH/NCI Division/Department Identifier");
        console.log('Expected NIH/NCI Program Id: '+nciSpecificProgramIdResultVal);
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificProgramID,nciSpecificProgramIdResultVal,"NIH/NCI Program Id");
        console.log('Expected Comments: '+nciSpecificCommnetsAdd);
        nciSpecific.verifyComment(nciSpecificCommnetsAdd);
        //nciSpecific.clickFundingSourceOrganizationDel();
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #10 Cancel NCI Specific Information
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information screen
     When I select Reset NCI Specific Information
     Then the information entered or edited on the NCI Specific Information screen will not be saved to the trial record
     And the screen will be refreshed with the existing data
     */
    this.When(/^I select Reset NCI Specific Information$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDB);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        //Study Source
        commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            verfiStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+verfiStudySourceVal+'] as the current Study Source selected value');
            if (verfiStudySourceVal === 'National'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Externally Peer-Reviewed'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Institutional'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Industrial'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
            if (verfiStudySourceVal === 'Other'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
            };
        });
        //Funding Source
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        //Program Code
        nciSpecific.nciSpecificProgramCode.getAttribute().then(function(value){
            var pasProgramCode = ''+value+'';
            function retNciSpecificProgramCodeVal(){
                return pasProgramCode;
            }
            nciSpecificProgramCodeVal = retNciSpecificProgramCodeVal();
        });
        nciSpecific.setProgramCode(programCode);
        //NIH/NCI Department Identifiers
        nciSpecific.nciSpecificDepartmentIdentifier.$('option:checked').getText().then(function(value){
            var pasNCISpecDepId = ''+value+'';
            function retNciSpecificDepIdVal(){
                return pasNCISpecDepId;
            }
            nciSpecificDepIdVal = retNciSpecificDepIdVal();
            console.log('System Identified ['+nciSpecificDepIdVal+'] as the current NIH/NCI Division/Department Identifier selected value');
            if (nciSpecificDepIdVal === nciSpecificDepIDValSelect){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValCCR){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValDCP){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValCTEP){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
            if (nciSpecificDepIdVal === nciSpecificDepIDValNHBLI){
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;
                function retNCISpecDeptIDNewVal(){
                    return pasNCISpecDeptIDNewVal;
                }
                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            };
        });
        //NIH/NCI Identifiers
        nciSpecific.nciSpecificProgramID.$('option:checked').getText().then(function(value){
            var pasNCISpecProgramId = ''+value+'';
            function retNciSpecificProgramIdVal(){
                return pasNCISpecProgramId;
            }
            nciSpecificProgramIdVal = retNciSpecificProgramIdVal();
            console.log('System Identified ['+nciSpecificProgramIdVal+'] as the current NIH/NCI Program Identifier selected value');
            if (nciSpecificProgramIdVal === ''){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSelect){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValBIQSFP){
                nciSpecific.selectProgramID(nciSpecificProgramIdValSPORE);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValSPORE;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSPORE){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSteering){
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;
                function retNCISpecProgIDNewVal(){
                    return pasNCISpecProgIDNewVal;
                }
                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            };
        });
        //Send Trial Information to ClinicalTrials.gov

        //Comments
        nciSpecific.nciSpecificComments.getAttribute().then(function(value){
            var pasCurrntComment = ''+value+'';
            function retNciSpecificCommentVal(){
                return pasCurrntComment;
            }
            nciSpecificCurrentCommentVal = retNciSpecificCommentVal();
        });
        nciSpecific.setComment(nciSpecificCommnetsAdd);
        //Reset
        nciSpecific.clickReset();
        browser.sleep(300).then(callback);
    });

    this.Then(/^the information entered or edited on the NCI Specific Information screen will not be saved to the trial record$/, function (callback) {
        console.log('Expected Study Source: '+verfiStudySourceVal);
        helper.getVerifyListValue(nciSpecific.nciSpecificStudySource,verfiStudySourceVal,"Study Source field validation");
        //console.log('Expected Funding Source Organization: '+verfiStudySourceVal);
        //nciSpecific.verifyFundingSourceOrg(verfiStudySourceVal);
        if (nciSpecificProgramCodeVal === ''){
            convPrgCde === 'null';
        } else{
            convPrgCde === nciSpecificProgramCodeVal;
        }
        console.log('Expected Program Code: '+convPrgCde);
        nciSpecific.verifyProgramCode(convPrgCde);
        console.log('Expected NIH/NCI Department Identifiers: '+nciSpecificDepIdVal);
        helper.getVerifyListValue(nciSpecific.nciSpecificDepartmentIdentifier,nciSpecificDepIdVal,"NIH/NCI Division/Department Identifier");
        console.log('Expected NIH/NCI Program Id: '+nciSpecificProgramIdVal);
        helper.getVerifyListValue(nciSpecific.nciSpecificProgramID,nciSpecificProgramIdVal,"NIH/NCI Program Id");
        if (nciSpecificCurrentCommentVal === ''){
            convComment === 'null';
        } else{
            convComment === nciSpecificCurrentCommentVal;
        }
        console.log('Expected Comments: '+convComment);
        nciSpecific.verifyComment(convComment);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the screen will be refreshed with the existing data$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    /*
     Scenario Outline: #11 I cannot change the �Send Trial Information to ClinicalTrials.gov? - greyed out
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When the following <conditions> exist
     Then the label and element for �Send Trial Information to ClinicalTrials.gov?� will not greyed out and not editible

     Examples:

     |<Conditions>|<Field>|
     |Trial is sponsored by "National Cancer Institute" |trials.sponsor_id Organizations.name = "National Cancer Institute"|
     |Trial Lead Organization is "NCI - Center for Cancer Research"|trials.lead_org_id Organizations.name = "NCI - Center for Cancer Research"|
     |Trial processing status is not "Verification Pending"|processing_status_wrappers.processing_status_id processing_statuses.name not = "Verification Pending"|
     |Trial processing status is not "Abstracted"| processing_status_wrappers.processing_status_id processing_statuses.name not = "Abstracted"|
     |Trial processing status is not "No Response"|processing_status_wrappers.processing_status_id processing_statuses.name not = No Response"|
     |Trial processing status is not "Abstracted, Response"|processing_status_wrappers.processing_status_id processing_statuses.name not = "Abstracted, Response"|
     |Trial Overall Status is �Complete�|trial_status_wrappers.trial_status_id trial_statuses.name = "Complete"|
     |Trial Overall Status is �Administratively Complete�|trial_status_wrappers.trial_status_id trial_statuses.name = "Administratively Complete"|
     |Trial Overall Status is �Terminated�| trial_status_wrappers.trial_status_id trial_statuses.name = "Terminated"|
     |Trial Research Category is not "Interventional"|trials.Research_catagory_id Research_catagories.name not = "Interventional"|
     */

    this.When(/^the following (.*) exist$/, function (conditions, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the label and element for �Send Trial Information to ClinicalTrials\.gov\?� will not greyed out and not editable$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    /*
     Scenario: #11a I cannot view the �Send Trial Information to ClinicalTrials.gov?�
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When the following <conditions> exist
     Then the label and element for �Send Trial Information to ClinicalTrials.gov?� will not be visible

     |<Conditions>|<Field>|
     |Trial is not sponsored by "National Cancer Institute" |trials.sponsor_id Organizations.name not = "National Cancer Institute"|
     */

    this.When(/^the following (.*) exist to send the trail to the ClinicalTrials\.gov$/, function (conditions, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the label and element for �Send Trial Information to ClinicalTrials\.gov\?� will not be visible$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    /*
     Scenario: #12 Study Source is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the NCI Specific Information screen
     And I have not selected a Study Source
     When I select Save to verify Study Source is required
     Then an Error message will appear "Study Source is required”
     */

    this.Given(/^I have not selected a Study Source$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        //commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            verfiStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+verfiStudySourceVal+'] as the current Study Source selected value');
            if (verfiStudySourceVal === '-Select a Study Source-'){
                nciSpecific.selectStudySource('-Select a Study Source-');
                var pasNCISpecReqNewVal = '-Select a Study Source-';
                function retNCISpecReqNewVal(){
                    return pasNCISpecReqNewVal;
                }
                verfiSpecificStudySourceRequired = retNCISpecReqNewVal();
            }else{
                nciSpecific.selectStudySource('-Select a Study Source-');
                var pasNCISpecReqNewVal = '-Select a Study Source-';
                function retNCISpecReqNewVal(){
                    return pasNCISpecReqNewVal;
                }
                verfiSpecificStudySourceRequired = retNCISpecReqNewVal();
            };
        });
        //Funding Source
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select Save to verify Study Source is required$/, function (callback) {
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^an Error message will appear "Study Source is required”$/, function (callback) {
        nciSpecific.verifyStudySourceReq(msgStduySourceReq);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #13 Funding Source is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the NCI Specific Information screen
     And I have not selected a Funding Source
     When I select Save to verify Funding Source is required
     Then an Error message will appear "Funding Source is required”
     */

    this.Given(/^I have not selected a Funding Source$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        //commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            verfiStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+verfiStudySourceVal+'] as the current Study Source selected value');
            if (verfiStudySourceVal === '-Select a Study Source-'){
                nciSpecific.selectStudySource('Indsutrial');
                var pasNCISpecReqNewVal = 'Indsutrial';
                function retNCISpecReqNewVal(){
                    return pasNCISpecReqNewVal;
                }
                verfiSpecificStudySourceRequired = retNCISpecReqNewVal();
            }else{
                //Do nothing
            };
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select Save to verify Funding Source is required$/, function (callback) {
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^an Error message will appear "Funding Source is required”$/, function (callback) {
        nciSpecific.verifyFundingSourceReq(msgFundingSourceReq);
        browser.sleep(25).then(callback);
    });


};
