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
    var nciID = 'NCI-2014-00894'; //A Phase II Study of Ziv-aflibercept
    var leadProtocolID = 'CTRP_01_1776';
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
        commonFunctions.clickLinkText(leadProtocolID); //CTRP_01_6894
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
        nciSpecific.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the selected value for Study Source will be associated with the trial$/, function (callback) {
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
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
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        //organizationSearch.clickSearchOrganization();
        //searchOrg.setOrgName(orgSearchNameB);
        //searchOrg.clickSearchButton();
        //searchOrg.selectOrgModelItem();
        //searchOrg.clickOrgModelConfirm();
        //organizationSearch.clickSearchOrganization();
        //searchOrg.setOrgName(orgSearchNameC);
        //searchOrg.clickSearchButton();
        //searchOrg.selectOrgModelItem();
        //searchOrg.clickOrgModelConfirm();
        /*
        organizationSearch.clickSearchOrganization();
        //nciSpecific.getVerifyListValue(organizationSearch.orgSearchCountryList,orgSearchCntryList,"Organization Search Country field");
        organizationSearch.setOrgSearchName('*');
        organizationSearch.clickSearch();
        organizationSearch.selectOrganizationFromGrid();
        helper.wait_for(9000);
        //organizationSearch.clickOrganizationSelectionConfirmation();
        */
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
        //expect(nciSpecific.orgAddFundingSourceBostonMed.getText()).to.eventually.equal(orgSearchNameA);
        //commonFunctions.wait(nciSpecific.orgAddFundingSourceBostonUni, "System displayed Funding Source - "+orgSearchNameB);
        //expect(nciSpecific.orgAddFundingSourceBostonUni.getText()).to.eventually.equal(orgSearchNameB);
        //commonFunctions.wait(nciSpecific.orgAddFundingSourceMemorialHos, "System displayed Funding Source - "+orgSearchNameC);
        //expect(nciSpecific.orgAddFundingSourceMemorialHos.getText()).to.eventually.equal(orgSearchNameC);
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
        nciSpecific.setProgramCode(programCode);
        nciSpecific.clickSave();
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        //expect(nciSpecific.nciSpecificProgramCode.getText()).to.eventually.equal(programCode);
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID); //CTRP_01_6894
        //nciSpecific.clickAdminCheckOut();
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
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolID); //CTRP_01_6894
        //nciSpecific.clickAdminCheckOut();
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        nciSpecific.verifyProgramCode(programCdeEdit)
        //expect(nciSpecific.nciSpecificProgramCode.getText()).to.eventually.equal(programCdeEdit);
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
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(25).then(callback);
    });

    this.When(/^I select one or more values from the for the NIH\/NCI Division\/Department Identifier \(CCR, CTEP, DCP, NHLBI\)$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the selected value\(s\) for NIH\/NCI Division\/Department Identifier will be associated with the trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });



    this.When(/^I select one or more values from the for the NIH\/NCI Program Identifier \(BIQSFP, SPORE, Steering Committee Reviewed\)$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the selected value\(s\) for NIH\/NCI Program Identifier will be associated with the trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

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

    this.When(/^I select the Comments field I can enter or edit comments$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the information entered for Comments will be associated with the trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the information entered or edited on the NCI Specific Information screen will be saved to the trial record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the information entered or edited on the NCI Specific Information screen will not be saved to the trial record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the follow (.*) exist$/, function (conditions, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the label and element for �Send Trial Information to ClinicalTrials\.gov\?� will not be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });






};
