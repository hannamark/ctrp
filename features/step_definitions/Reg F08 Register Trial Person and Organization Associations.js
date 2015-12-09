/**
 * Created by singhs10 on 12/3/15.
 */
/**
 * Created by singhs10 on 11/28/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    this.Given(/^I am on the Register Trial Lead Organization\/Principal Investigator screen$/, function (callback) {
        callback();
    });

    this.When(/^I have performed a Lead Organization look-up in Search Organization$/, function (callback) {
        projectFunctionsRegistry.createOrgforTrial('shiTrialOrg0', typeOfTrial, '0');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected an Organization as the trial's Lead Organization$/, function (callback) {
        cukeOrganization.then(function (value) {
            console.log('value of Org' + value);
        addTrial.getVerifyAddTrialLeadOrganization(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a person look\-up in Search persons$/, function (callback) {
        projectFunctionsRegistry.createPersonforTrial('shiTrialPerson0',typeOfTrial, '0');
        browser.sleep(25).then(callback);
    });

    this.Given(/^Selected persons name will be displayed as Last Name, First Name as the trial's Principal Investigator$/, function (callback) {
        cukePerson.then(function (value) {
            console.log('value of Org' + value);
            addTrial.getVerifyAddTrialPrincipalInvestigator('lName, ' + value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Lead Organization\/Principal Investigator section will not indicate any errors during Trial Review$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        expect(projectFunctions.verifyWarningMessage('Lead Organization is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Principal Investigator is required')).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not selected an Organization as the trial's Lead Organization$/, function (callback) {
        addTrial.getVerifyAddTrialLeadOrganization('');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have not selected a person as the trial's Principal Investigator$/, function (callback) {
        addTrial.getVerifyAddTrialPrincipalInvestigator(' ');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Trial Lead Organization\/Principal Investigator screen will indicate errors as:$/, function (table, callback) {
        addTrial.clickAddTrialReviewButton();
        errorTableLeadOrg = table.raw();
        for (var i = 0; i < errorTableLeadOrg.length; i++) {
            console.log(errorTableLeadOrg[i].toString());
            expect(projectFunctions.verifyWarningMessage(errorTableLeadOrg[i].toString())).to.become('true');
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Register Trial Sponsor\/Responsible Party screen$/, function (callback) {
        callback();
    });

    this.When(/^I have performed a Sponsor organization look\-up in Search Organizations$/, function (callback) {
        projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1', typeOfTrial, '1');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected an organization as the trial's Sponsor$/, function (callback) {
        cukeOrganization.then(function (value) {
            console.log('value of Org' + value);
            addTrial.getVerifyAddTrialSponsor(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Responsible Party type as:$/, function (table, callback) {
        trialResponsibleParty = table.raw();
        console.log('value of table' + trialResponsibleParty);
        addTrial.addTrialResponsiblePartyList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialResponsibleParty.toString().split(","));
        });
        addTrial.selectAddTrialResponsibleParty('Sponsor');
        addTrial.getVerifyAddTrialResponsibleParty('Sponsor');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Trial Sponsor\/Responsible Party section will not indicate any errors during Trial Review$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        expect(projectFunctions.verifyWarningMessage('Sponsor is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Responsible Party is required')).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not selected an organization as the trial's Sponsor from the lookup$/, function (callback) {
        addTrial.getVerifyAddTrialSponsor('');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have not selected the Responsible Party type as:$/, function (table, callback) {
        addTrial.getVerifyAddTrialPhase('-Select a Responsible Party-');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Trial Sponsor\/Responsible Party section will indicate errors during Trial Review as:$/, function (table, callback) {
        addTrial.clickAddTrialReviewButton();
        errorTableSponsor = table.raw();
        for (var i = 0; i < errorTableSponsor.length; i++) {
            console.log(errorTableSponsor[i].toString());
            expect(projectFunctions.verifyWarningMessage(errorTableSponsor[i].toString())).to.become('true');
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the Responsible Party type as the Sponsor$/, function (callback) {
        addTrial.clickAddTrialResetButton();
        projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1', typeOfTrial, '1');
        addTrial.selectAddTrialResponsibleParty('Sponsor');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Sponsor Organization will be recorded as the Responsible Party$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        cukeOrganization.then(function (value) {
            console.log('value of Org' + value);
            addTrial.getVerifyAddTrialSponsor(value);
        });
        addTrial.getVerifyAddTrialResponsibleParty('Sponsor');
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the Responsible Party type as the Principal Investigator$/, function (callback) {
        addTrial.clickAddTrialResetButton();
        projectFunctionsRegistry.createPersonforTrial('shiTrialPerson0', typeOfTrial, '0');
        projectFunctionsRegistry.createOrgforTrial('shiTrialOrg0', typeOfTrial, '0');
        projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1',typeOfTrial, '1');
        addTrial.selectAddTrialResponsibleParty('Principal Investigator');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Principal Investigator selected will be recorded as the Responsible Party Investigator$/, function (callback) {
        cukeOrganization.then(function (value) {
            console.log('value of Org' + value);
            addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Investigator Title will be displayed as Principal Investigator$/, function (callback) {
        addTrial.getVerifyAddTrialInvestigatorTitle('Principal Investigator');
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Title may be edited$/, function (callback) {
        addTrial.setAddTrialInvestigatorTitle('Principal Investigator Title Edited');
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Investigator Affiliation will be the Principal Investigator's organization affiliation$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Investigation Affiliation can be changed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the Responsible Party type as the Sponsor\-Investigator$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have performed a person search in Search Persons$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected a person as an Investigator$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the person selected will be recorded as the Sponsor\-Investigator$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Investigator Title will be displayed as "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Investigator Title may be edited$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Investigation Affiliation will be the Sponsor Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Investigation Affiliation cannot be changed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


};
