/**
 * Created by singhs10 on 4/15/16.
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
var mailVerificationPage = require('../support/mailVerification');
var searchTrialPage = require('../support/searchTrialPage');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var emailVerify = new mailVerificationPage();
    var searchTrial = new searchTrialPage();

    var leadOrgTrialIdentifier = 'Shi Lead Organization Draft ';
    var grantOption = 'yes';
    var grantFundMcm = 'R01';
    var grantInstitute = 'CA';
    var grantSerialNumber = '129687';
    var grantDivision = 'OD';
    var secondaryPurpose = 'Other';
    var secondaryPurposeOtherDescription = 'Secondary Purpose other description';
    var otherIdentifierType = 'Other Identifier';
    var otherIdentifierID = 'SS1234';
    var otherDocument = 'testSampleXlsmFile.xlsm';

    /**** Email Verification ****/
    var gmaillink = 'https://mail.google.com/mail/#inbox';
    var gmailID = 'ctrptrialsubmitter@gmail.com';
    var firstLastName = 'rita tam';


    this.Given(/^I have entered the Lead Organization Trial ID$/, function (callback) {
        /**** Trial Identifiers ****/
        addTrial.setAddTrialLeadProtocolIdentifier(leadOrgTrialIdentifier + typeOfTrial  + ' ' + moment().format('MMMDoYY hmm') );
        /** Stores the value of Lead Protocol Identifier **/
        storeLeadProtocolId = addTrial.addTrialLeadProtocolIdentifier.getAttribute('value').then(function (value) {
            console.log('This is the Lead Organization Trial Identifier that is added' + value);
            return value;
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered some other Trial information$/, function (callback) {
        if (grantOption !== '') {
            addTrial.selectAddTrialFundedByNCIOption(grantOption);
        }
        if (grantOption.toUpperCase() !== 'NO' && grantOption !== '1') {
            addTrial.selectAddTrialFundingMechanism(grantFundMcm);
            addTrial.selectAddTrialInstituteCode(grantInstitute);
            addTrial.setAddTrialSerialNumber(grantSerialNumber);
            addTrial.addTrialSerialNumberSelect.click();
            addTrial.selectAddTrialNCIDivisionProgramCode(grantDivision);
            addTrial.clickAddTrialAddGrantInfoButton();
        }
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', otherIdentifierType)).click();
        addTrial.setAddTrialProtocolID(otherIdentifierID);
        addTrial.clickAddTrialAddProtocolButton();
        addTrial.selectAddTrialSecondaryPurpose(secondaryPurpose);
        addTrial.setAddTrialSecondaryPurposeOtherDescription(secondaryPurposeOtherDescription);
        trialDoc.trialRelatedFileUpload('reg', '5', otherDocument);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected Save as Draft$/, function (callback) {
        addTrial.clickAddTrialSaveDraftButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the CTRP application will save all information that was entered as a draft$/, function (callback) {
        storeLeadProtocolId.then(function(value) {
            addTrial.getVerifyAddTrialLeadProtocolIdentifier(value);
        });
        addTrial.getVerifyAddTrialSecondaryPurpose(secondaryPurpose);
        expect(addTrial.addTrialSecondaryPurposeOtherDescription.getAttribute('value')).to.eventually.equal(secondaryPurposeOtherDescription);
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier(otherIdentifierType, otherIdentifierID);
        projectFunctionsRegistry.verifyAddTrialGrantInformation(grantFundMcm,grantInstitute,grantSerialNumber,grantDivision);
        expect(trialDoc.trailFileUploadOther.getAttribute('value')).to.eventually.equal(otherDocument);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I will be able to search for saved draft registrations$/, function (callback) {
        trialMenuItem.clickTrials();
        trialMenuItem.clickListSearchTrialLink();
        storeLeadProtocolId.then(function(value) {
            searchTrial.setSearchTrialProtocolID(value);
        });
        searchTrial.clickSearchTrialSearchButton();
        searchTrial.clickSearchTrialSavedDrafts();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I will be able to complete the registration at a future date$/, function (callback) {
        searchTrial.clickSearchTrialActionButton();
        searchTrial.clickSearchTrialCompleteOption();
        storeLeadProtocolId.then(function(value) {
            addTrial.getVerifyAddTrialLeadProtocolIdentifier(value);
        });
        addTrial.getVerifyAddTrialSecondaryPurpose(secondaryPurpose);
        expect(addTrial.addTrialSecondaryPurposeOtherDescription.getAttribute('value')).to.eventually.equal(secondaryPurposeOtherDescription);
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier(otherIdentifierType, otherIdentifierID);
        projectFunctionsRegistry.verifyAddTrialGrantInformation(grantFundMcm,grantInstitute,grantSerialNumber,grantDivision);
        expect(trialDoc.trailFileUploadOther.getAttribute('value')).to.eventually.equal(otherDocument);

        browser.sleep(25).then(callback);
    });

    this.Given(/^the an email entitled "([^"]*)" will be sent to the user \( Emails list can be found on the share drive under functional\/Registartion: CTRP System Generated Emails\)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


    this.Given(/^I have not entered the Lead Organization Trial ID$/, function (callback) {
        addTrial.getVerifyAddTrialLeadProtocolIdentifier('');
        browser.sleep(25).then(callback);
    });


};
