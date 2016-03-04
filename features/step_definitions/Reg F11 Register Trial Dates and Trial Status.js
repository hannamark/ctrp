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
            //console.log('**************** Error Warning String *************');
            //console.log(convErrorsWarningsString);
            if (statusTable[i].statusFrom === 'STATUSZERO') {
                console.log('**************** STATUS FROM *************');
                console.log(statusTable[i].statusFrom);
            }
            else {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                //console.log('**************** STATUS FROM *************');
                //console.log(statusTable[i].statusFrom);
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                if (statusTable[i].whyStudyStopped === '') {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete' )) {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                    addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                }
                else {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusFrom !== statusTable[i].statusTo) {
                    if (statusTable[i].whyStudyStopped === '') {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Approved') {
                            console.log('status row 2' + statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                    }
                    else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete' )) {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Approved') {
                            console.log('status row 2' + statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                    }
                    else {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Approved') {
                            console.log('status row 2' + statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                        else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                    }
                }
            }
            if (statusTable[i].statusTo === 'STATUSZERO') {
                //console.log('**************** STATUS TO *************');
                //console.log(statusTable[i].statusTo);
            }
            else {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                //console.log('**************** STATUS TO *************');
                //console.log(statusTable[i].statusTo);
                addTrial.selectAddTrialStatus(statusTable[i].statusTo);
                if (statusTable[i].whyStudyStopped === '') {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete' )) {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                    addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                }
                else {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusFrom !== statusTable[i].statusTo) {
                    if (statusTable[i].whyStudyStopped === '') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                    }
                    else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete' )) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                    }
                    else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                    }
                }
                else {
                    projectFunctionsRegistry.verifyAddTrialDuplicateStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                    if (statusTable[i].statusFrom === 'In Review') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                    else if (statusTable[i].statusFrom === 'Approved') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                    else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                    else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                    else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                    else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                    else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    }
                }
            }
            addTrial.clickAddTrialResetButton();
        }
        browser.sleep(25).then(callback);
    });


    this.Then(/^no error or warning should be displayed in the validation messages column$/, function (callback) {
        browser.sleep(25).then(callback);
    });


};


