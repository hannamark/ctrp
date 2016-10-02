/**
 * Created by singhs10 on 10/1/16.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');
var mailVerificationPage = require('../support/mailVerification');
var databaseConnection = require('../support/databaseConnection');
var searchTrialPage = require('../support/searchTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var trialDataVerificationPage = require('../support/registerVerifyTrialDataPage');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var emailVerify = new mailVerificationPage();
    var dbConnect = new databaseConnection();
    var searchTrial = new searchTrialPage();
    var login = new loginPage();
    var commonFunctions = new abstractionCommonMethods();
    var verifyTrialData = new trialDataVerificationPage();


    var userCtrpTrialSubmitter = 'ctrptrialsubmitter';
    var trialTypeNational = 'National';
    var leadOrgIdentifierNational = 'SSLdOrg ';
    var clinicalIdentifierID = 'NCT22446688';
    var officialTitleNT = 'Trial Created by Cuke Test script - SS.';
    var phaseNT = 'I/II';
    var researchCategory = 'Observational';
    var primaryPurposeNT = 'Diagnostic';
    var secondaryPurpose = '';
    var accrualDisease = 'ICD9';
    var leadOrgNT = 'leadOrgSS';
    var principalInvNT = 'prinInvSS';
    var sponsorOrgNT = 'sponOrg';
    var dataTableOrg = 'dataTblOrg';
    var programCode = '';
    var grantOption = 'no';
    var grantFundingMechanism = '';
    var grantInstituteCode = '';
    var grantSerialNumber = '';
    var grantNCIDivisionCode = '';
    var trialStatus = 'In Review';
    var trialComment = '';
    var trialWhyStudyStopped = '';
    var INDIDEOption = 'no';
    var INDIDEType = '';
    var INDIDENumber = '';
    var INDIDEGrantor = '';
    var INDIDEHolder = '';
    var INDIDEInstitution = '';
    var responsibleParty = '';
    var trialOversightCountry = '';
    var trialOversightOrg = '';
    var FDARegulatedIndicator = '';
    var section801Indicator = '';
    var dataMonitoringIndicator = '';
    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';
    var participatingSiteDoc = '';
    var informedConsentDoc = '';
    var otherDoc = '';
    var submitTrial = 'SUBMITTRIAL';

    var getDBConnection = '';

    this.Given(/^I am in the CTRP Registration application$/, function () {
        return  browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
            });
        });
    });

    this.Given(/^I have selected the option to search my trials in CTRP \(trials where I am listed as owner\)$/, function () {
        return  browser.sleep(25).then(function () {
            projectFunctionsRegistry.createTrial(userCtrpTrialSubmitter, trialTypeNational, leadOrgIdentifierNational, clinicalIdentifierID, '', '', officialTitleNT, phaseNT, '', researchCategory, primaryPurposeNT, secondaryPurpose,
    accrualDisease, leadOrgNT, principalInvNT, sponsorOrgNT, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
    INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
    protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                leadProtocolIDNT = leadProtocolID;
                nciIDNT = nciID;
                otherIDNT = otherIDs;
                trialOfficialTitleNT = officialTitle;
                trialPhaseNT = phase;
                trialPurposeNT = purpose;
                principalInvestigatorNT = principalInvestigator;
                leadOrganizationNT = leadOrganization;
                sponsorNT = sponsor;
                participatingSiteNT = participatingSiteInTrial;
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                nciIDNT.then(function (trialNciIDNT) {
                    searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                });
            });
        });
    });

    this.When(/^I select the Verify Data option on one of my trial from the trial results available actions$/, function () {
        return  browser.sleep(25).then(function () {
                searchTrial.clickSearchTrialActionButton();
            searchTrial.clickSearchTrialsVerifyDataButton();
        });
    });

    this.Then(/^the Trial Verification Data information will be displayed including$/, function (table) {
        return  browser.sleep(25).then(function () {
            //   var TrialDataFieldTable = table.raw();
            //verifyTrialData.viewTDFieldsLabel.getText().then(function(value){
            //    console.log('Table trial data');
            //    console.log(TrialDataFieldTable);
            //    console.log('screen trial data');
            //    console.log(value);
            //    expect(value).to.eql(TrialDataFieldTable, 'Verification of Trial Data Field Label');
            //});
            nciIDNT.then(function (trialNciIDNT) {
                verifyTrialData.getTDNCIID(trialNciIDNT);
            });
            otherIDNT.then(function (trialOtherIDNT) {
                verifyTrialData.getTDNCTID(trialOtherIDNT.toString());
            });
            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                verifyTrialData.getTDLeadOrgId(trialLeadProtocolIDNT);
            });
            trialOfficialTitleNT.then(function (trialOfficialTitleNT) {
                verifyTrialData.getTDOfficialTitle(trialOfficialTitleNT);
            });
        });
    });

    this.When(/^I click on the Save Verification Record Button$/, function () {
        return  browser.sleep(25).then(function () {
verifyTrialData.clickAddTDSaveButton();

        });
    });

    this.When(/^I click on the "([^"]*)" button for "([^"]*)"$/, function (arg1, arg2) {
        return  browser.sleep(25).then(function () {
            verifyTrialData.getTDDialogText(arg2);
verifyTrialData.clickAcceptTDDialogButton();
        });
    });

    this.Then(/^the current Verification Date will be saved with today's date$/, function () {
        return  browser.sleep(25).then(function () {
            verifyTrialData.getTDVerificationDate(moment().format('DD-MMM-YYYY'));

        });
    });

    this.Then(/^I can view the current Verification Date displayed on the Trial Data Verification Screen$/, function (table) {
        return  browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                verifyTrialData.getTDNCIID(trialNciIDNT);
            });
            otherIDNT.then(function (trialOtherIDNT) {
                verifyTrialData.getTDNCTID(trialOtherIDNT.toString());
            });
            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                verifyTrialData.getTDLeadOrgId(trialLeadProtocolIDNT);
            });
            trialOfficialTitleNT.then(function (trialOfficialTitleNT) {
                verifyTrialData.getTDOfficialTitle(trialOfficialTitleNT);
            });
            verifyTrialData.getTDVerificationDate(moment().format('DD-MMM-YYYY'));
        });
    });

    this.Given(/^I am on the Trial Data Verification Screen$/, function () {
        return  browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
            });
            projectFunctionsRegistry.createTrial(userCtrpTrialSubmitter, trialTypeNational, leadOrgIdentifierNational, clinicalIdentifierID, '', '', officialTitleNT, phaseNT, '', researchCategory, primaryPurposeNT, secondaryPurpose,
                accrualDisease, leadOrgNT, principalInvNT, sponsorOrgNT, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
                INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                leadProtocolIDNT = leadProtocolID;
                nciIDNT = nciID;
                otherIDNT = otherIDs;
                trialOfficialTitleNT = officialTitle;
                trialPhaseNT = phase;
                trialPurposeNT = purpose;
                principalInvestigatorNT = principalInvestigator;
                leadOrganizationNT = leadOrganization;
                sponsorNT = sponsor;
                participatingSiteNT = participatingSiteInTrial;
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                nciIDNT.then(function (trialNciIDNT) {
                    searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                    searchTrial.clickSearchTrialActionButton();
                    searchTrial.clickSearchTrialsVerifyDataButton();
                    currentVerificationDate =  verifyTrialData.viewTDVerificationDate.getText();
                });
            });
        });
    });

    this.When(/^When I click on the Save Verification Record Button$/, function () {
        verifyTrialData.clickAddTDSaveButton();
    });

    this.When(/^I click on the "([^"]*)" Button for "([^"]*)"$/, function (arg1, arg2) {
        verifyTrialData.getTDDialogText(arg2);
        verifyTrialData.clickCancelTDDialogButton();
    });

    this.Then(/^the Last Verified Date will not be changed$/, function () {
        currentVerificationDate.then(function(value){
            verifyTrialData.getTDVerificationDate(value);
        })
    });




};
