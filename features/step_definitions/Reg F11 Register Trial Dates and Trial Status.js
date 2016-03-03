/**
 * Created by singhs10 on 1/25/16.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var moment = require('moment');

module.exports = function() {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    /*********************
     * Validation message *
     *********************/
    var FDAIND_IDERequired = 'IND/IDE is required';
    var FDATableValidationMessage = 'Please select an IND/IDE Type, enter an IND/IDE Number, select an IND/IDE Grantor and IND/IDE Holder Type';


    this.Given(/^I am on the Register Trial Status screen$/, function (callback) {
        callback();
    });

    this.When(/^I add a trial status from (.*) to trial status (.*) along with why study stopped reason (.*) the respective checks (.*) will be there$/, function (statusFrom, statusTo, whyStudyStopped, errorsWarnings, table, callback) {
        statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            var convErrorsWarningsString = statusTable[i].errorsWarnings.toString().replace(/\\n/g, "\n", -1);
            console.log('**************** Error Warning String *************');
            console.log(convErrorsWarningsString);
            if (statusTable[i].statusFrom === 'STATUSZERO') {
                console.log('**************** STATUS FROM *************');
                console.log(statusTable[i].statusFrom);
            }
            else {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                console.log('**************** STATUS FROM *************');
                console.log(statusTable[i].statusFrom);
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                if(statusTable[i].whyStudyStopped === '') {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                else if (statusTable[i].statusFrom === 'Withdrawn' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' ||statusTable[i].statusFrom === 'Administratively Complete' ){
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                    addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                }
                addTrial.clickAddTrialAddStatusButton();
                if(statusTable[i].statusFrom !== statusTable[i].statusTo) {
                    if(statusTable[i].whyStudyStopped === '' ) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                    }
                    else if (statusTable[i].statusFrom === 'Withdrawn' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' ||statusTable[i].statusFrom === 'Administratively Complete' ){
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, '');
                    }
                    else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                    }
                }
            }
            if (statusTable[i].statusTo === 'STATUSZERO') {
                console.log('**************** STATUS TO *************');
                console.log(statusTable[i].statusTo);
            }
            else  {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                console.log('**************** STATUS TO *************');
                console.log(statusTable[i].statusTo);
                addTrial.selectAddTrialStatus(statusTable[i].statusTo);
                if(statusTable[i].whyStudyStopped === '') {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                else if (statusTable[i].statusFrom === 'Withdrawn' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' ||statusTable[i].statusFrom === 'Administratively Complete' ){
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                    addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                }
                addTrial.clickAddTrialAddStatusButton();
                if(statusTable[i].statusFrom !== statusTable[i].statusTo) {
                    if(statusTable[i].whyStudyStopped === '') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                    }
                    else if (statusTable[i].statusFrom === 'Withdrawn' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual' ||statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' ||statusTable[i].statusFrom === 'Administratively Complete' ){
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                    }
                    else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                    }
                }
                else {
                    projectFunctionsRegistry.verifyAddTrialDuplicateStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                }
            }
            addTrial.clickAddTrialResetButton();
        }
            browser.sleep(25).then(callback);
    });

    this.When(/^I add a trial status from (.*) to trial status (.*) with the condition (.*)$/, function (statusFrom, statusTo, conditionText, table, callback) {
    /*    statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
           // console.log('Table value');
           // console.log(statusTable);
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
                console.log(' ******* Status From ******* ');
            console.log(statusTable[i].statusFrom);
            if (statusTable[i].statusFrom === 'In Review'){
                console.log('statusTable value here');
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
                if(statusTable[i].statusTo === 'Active') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.clickAddTrialAddStatusButton();
                }
                else if(statusTable[i].statusTo === 'Enrolling by Invitation'){
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.clickAddTrialAddStatusButton();
                }
            }
            else if (statusTable[i].statusFrom === 'Approved' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            else if (statusTable[i].statusFrom === 'Active' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            else if (statusTable[i].statusFrom === 'Enrolling by Invitation' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Active');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            else if (statusTable[i].statusFrom === 'Closed to Accrual' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Active');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Enrolling by Invitation');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Active');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Enrolling by Invitation');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Closed to Accrual');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Active');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Enrolling by Invitation');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Closed to Accrual');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Closed to Accrual and Intervention');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' ){
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Active');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Enrolling by Invitation');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Closed to Accrual');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Closed to Accrual and Intervention');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('Temporarily Closed to Accrual');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                addTrial.clickAddTrialAddStatusButton();
            }
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            console.log(' ******* Status To *******');
            console.log(statusTable[i].statusTo);
            addTrial.selectAddTrialStatus(statusTable[i].statusTo);
            addTrial.clickAddTrialAddStatusButton();
            console.log(' ******* Condition Text ******* ');
            console.log(statusTable[i].conditionText);
            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', '');
        //    browser.sleep(5678);
            addTrial.clickAddTrialResetButton();
        } */
        statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
            addTrial.clickAddTrialAddStatusButton();
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialStatus(statusTable[i].statusTo);
            addTrial.clickAddTrialAddStatusButton();
            console.log(' ******* Condition Text ******* ');
            console.log(statusTable[i].conditionText);

            var convStrng = statusTable[i].conditionText.toString().replace(/\\n/g, "\n", -1);
            console.log(convStrng);

            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convStrng);
        }
        browser.sleep(25).then(callback);
    });

    this.Then(/^no error or warning should be displayed in the validation messages column$/, function (callback) {
        browser.sleep(25).then(callback);
    });


};