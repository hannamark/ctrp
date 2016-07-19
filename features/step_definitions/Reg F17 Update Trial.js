/**
 * Created by singhs10 on 7/11/16.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');
var searchTrialPage = require('../support/searchTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var importTrialPage = require('../support/registerImportTrialPage');
var menuItemList = require('../support/PoCommonBar');
var databaseConnection = require('../support/databaseConnection');
var Q = require('q');
var assert = require('assert');
var participatingSitePage = require('../support/registerAddParticipatingSite');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var searchTrial = new searchTrialPage();
    var commonFunctions = new abstractionCommonMethods();
    var login = new loginPage();
    var importTrial = new importTrialPage();
    var menuItem = new menuItemList();
    var dbConnect = new databaseConnection();
    var participatingSite = new participatingSitePage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();

    var getDBConnection = '';

    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';

    this.Given(/^I have selected the option to search my trials in CTRP$/, function (callback) {
        projectFunctionsRegistry.createTrialForTrialUpdate();
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 40).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            nciIDNT.then(function (trialNciIDNT) {
                searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result for Update');
            });
        });
            browser.sleep(25).then(callback);
    });

    this.Given(/^I am the Trial Owner$/, function (callback) {
        callback();
    });

    this.When(/^the Update option is enabled on one of my trials$/, function (callback) {
        searchTrial.clickSearchTrialActionButton();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected the Update option$/, function (callback) {
        searchTrial.clickSearchTrialsUpdateButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^all trial information will be displayed as in Registration with only Update fields enabled Type$/, function (table, callback) {

        //Other Trial ID//
        expect(addTrial.addTrialProtocolIDOrigin.isEnabled()).to.eventually.equal(true, 'Validating Other Trial Identifier Protocol ID Type field is Enabled');
        expect(addTrial.addTrialProtocolID.isEnabled()).to.eventually.equal(true, 'Validating Other Trial Identifier Protocol ID field is Enabled');
        expect(addTrial.addTrialAddProtocolButton.isEnabled()).to.eventually.equal(true, 'Validating Other Trial Identifier Add Button is Enabled');

        //Grant Information//
        expect(addTrial.addTrialFundedByNCIOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES field is Enabled');
        expect(addTrial.addTrialFundedByNCIOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option NO field is Enabled');
        addTrial.addTrialFundedByNCIOption.get(0).isSelected().then(function(state){
            if(state){
                expect(addTrial.addTrialFundingMechanism.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Funding Mechanism field is Enabled');
                expect(addTrial.addTrialInstituteCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Institute Code field is Enabled');
                expect(addTrial.addTrialSerialNumberBox.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Serial Number Box field is Enabled');
                expect(addTrial.addTrialNCIDivisionProgramCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, NCI/Division field is Enabled');
                expect(addTrial.addTrialAddGrantInfoButton.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Add Button is Enabled');
            }
            else{
                addTrial.addTrialFundedByNCIOption.get(1).isSelected().then(function(state){
                    if(state){
                            addTrial.selectAddTrialFundedByNCIOption('yes');
                        expect(addTrial.addTrialFundingMechanism.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Funding Mechanism field is Enabled');
                        expect(addTrial.addTrialInstituteCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Institute Code field is Enabled');
                        expect(addTrial.addTrialSerialNumberBox.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Serial Number Box field is Enabled');
                        expect(addTrial.addTrialNCIDivisionProgramCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, NCI/Division field is Enabled');
                        expect(addTrial.addTrialAddGrantInfoButton.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Add Button is Enabled');
                        addTrial.selectAddTrialFundedByNCIOption('no');
                    }
                });
            }
        });

        //Trial Status//
        expect(addTrial.addTrialDateFields.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Status Date Calender is Enabled');
        expect(addTrial.addTrialStatus.isEnabled()).to.eventually.equal(true, 'Validating Trial Status field is Enabled');
        expect(addTrial.addTrialStatusComment.isEnabled()).to.eventually.equal(true, 'Validating Trial Status Comment field is Enabled');
        addTrial.selectAddTrialStatus('Withdrawn');
        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.eventually.equal(true, 'Validating Trial Status Why Study stopped field is Enabled');
        expect(addTrial.addTrialAddStatusButton.isEnabled()).to.eventually.equal(true, 'Validating Trial Status Add Button is Enabled');

        //Trial Dates//
        expect(addTrial.addTrialDateFields.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Start Date Calender is Enabled');
        expect(addTrial.addTrialStartDateOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Start Date with Option YES field is Enabled');
        expect(addTrial.addTrialStartDateOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Start Date with Option NO field is Enabled');
        expect(addTrial.addTrialDateFields.get(2).isEnabled()).to.eventually.equal(true, 'Validating Trial Primary Completion Date Calender is Enabled');
        expect(addTrial.addTrialPrimaryCompletionDateOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Primary Completion Date with Option YES field is Enabled');
        expect(addTrial.addTrialPrimaryCompletionDateOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Primary Completion Date with Option NO field is Enabled');
        expect(addTrial.addTrialDateFields.get(3).isEnabled()).to.eventually.equal(true, 'Validating Trial Completion Date Calender is Enabled');
        expect(addTrial.addTrialCompletionDateOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Completion Date with Option YES field is Enabled');
        expect(addTrial.addTrialCompletionDateOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Completion Date with Option NO field is Enabled');
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will be able to add Other Protocol Identifiers$/, function (callback) {
       // projectFunctionsRegistry.addOtherTrialIdentifier('Other Identifier');
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Other Identifier')).click();
        addTrial.setAddTrialProtocolID('OTHupd' + projectFunctions.getRandomInt(100000, 990000));
        addTrial.clickAddTrialAddProtocolButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will be able to add Grant Information$/, function (callback) {
        addTrial.addTrialFundedByNCIOption.get(0).isSelected().then(function(state){
            if(state){
            // addTrial.addTrialVerifyGrantTableExist.isPresent().then(function(present){
            //     if(present){
            //   //  addTrial.addTrialRemoveGrantValues.click();
            //     }
                addTrial.selectAddTrialFundedByNCIOption('no');
             //   });
            }
            else{
        addTrial.addTrialFundedByNCIOption.get(1).isSelected().then(function(state){
            if(state){
                // addTrial.addTrialVerifyGrantTableExist.isPresent().then(function(present){
                //     if(present){
                //         addTrial.addTrialRemoveGrantValues.click();
                //     }
                    addTrial.selectAddTrialFundedByNCIOption('yes');
                    addTrial.selectAddTrialFundingMechanism('R01');
                    addTrial.selectAddTrialInstituteCode('CA');
                    addTrial.setAddTrialSerialNumber('131080');
                    addTrial.addTrialSerialNumberSelect.click();
                    addTrial.selectAddTrialNCIDivisionProgramCode('CCR');
                    addTrial.clickAddTrialAddGrantInfoButton();
              //  });
            }
        });
            }
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will be able to update trial status and trial status dates$/, function (callback) {
        addTrial.addTrialRemoveTrialStatus.click();
        addTrial.clickAddTrialDateField(0);
        addTrial.clickAddTrialDateFieldPreviousMonth(14);
        addTrial.selectAddTrialStatus('In Review');
        addTrial.setAddTrialStatusComment('Comment added testing Update Trial');
        addTrial.clickAddTrialAddStatusButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates$/, function (callback) {
        addTrial.clickAddTrialDateField(1);
        addTrial.clickAddTrialDateFieldPreviousMonth('20');
        addTrial.selectAddTrialStartDateOption('0');
        addTrial.clickAddTrialDateField(2);
        addTrial.clickAddTrialDateFieldNextMonth('15');
        addTrial.selectAddTrialPrimaryCompletionDateOption('1');
        addTrial.clickAddTrialDateField(3);
        addTrial.clickAddTrialDateFieldNextMonth('19');
        addTrial.selectAddTrialCompletionDateOption('1');
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will be able to update participating site status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I will be able to review existing Trial Related Documents type$/, function (table, callback) {
        expect(addTrial.addTrialVerifyAddedDocs.getText()).to.eventually.eql([ protocolDoc, IRBDoc ]);
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will be able to add Trial Related Document type Other$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I will be able to review or cancel my update$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I click on the Review Button to Review my trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the click on the submit button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^my trial will be updated in the CTRP application$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Submission source is a Cancer Center$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Submission method is Registry$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^Submission type is Update$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


};