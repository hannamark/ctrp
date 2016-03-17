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

    this.When(/^I add a trial status from (.*) to trial status (.*) along with why study stopped reason (.*) and same day rule (.*) the respective checks (.*) will be there$/, function (statusFrom, statusTo, whyStudyStopped, Sameday, errorsWarnings, table, callback) {
         statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            var convErrorsWarningsString = statusTable[i].errorsWarnings.toString().replace(/\\n/g, "\n", -1);
            console.log('**************** Error Warning String *************');
            console.log(convErrorsWarningsString);
            if (statusTable[i].statusFrom === 'STATUSZERO') {
                console.log('**************** STATUS FROM *************');
                console.log(statusTable[i].statusFrom);
            } else {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                console.log('**************** STATUS FROM *************');
                console.log(statusTable[i].statusFrom);
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                if (statusTable[i].whyStudyStopped === '') {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete')) {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                    addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                } else {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusFrom !== statusTable[i].statusTo) {
                    if (statusTable[i].whyStudyStopped === '') {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing');
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing');
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing');
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing');
                        }
                    } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete')) {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '');
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, 'WARNING: Interim status [In Review] is missing');
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing');
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing');
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing');
                        }
                    } else {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing');
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing');
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing');
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing');
                        }
                    }
                }
            }
            if (statusTable[i].statusTo === 'STATUSZERO') {
                console.log('**************** STATUS TO *************');
                console.log(statusTable[i].statusTo);
            } else {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                console.log('**************** STATUS TO *************');
                console.log(statusTable[i].statusTo);
                addTrial.selectAddTrialStatus(statusTable[i].statusTo);
                if (statusTable[i].whyStudyStopped === '') {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete')) {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                    addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                } else {
                    expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                }
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusFrom !== statusTable[i].statusTo) {
                    if (statusTable[i].whyStudyStopped === '') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                    } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                    }
                } else {
                    projectFunctionsRegistry.verifyAddTrialDuplicateStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                    if (statusTable[i].statusFrom === 'In Review') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('');
                    } else if (statusTable[i].statusFrom === 'Approved') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing');
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing');
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing');
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

    this.When(/^I add a (.*) and status transitions from (.*)$/, function (statusDate, statusTransitions, table, callback) {
        statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            console.log('Status Trnasitions');
            var splitTO = statusTable[i].statusTransitions.replace(/'/g, "").split(" TO ");
            console.log(splitTO);
            console.log('Length after split' + splitTO.length);
            for (var j = 0; j < splitTO.length; j++) {
                addTrial.clickAddTrialDateField('0');
                var jIn = j+1;
                addTrial.clickAddTrialDateFieldPreviousMonth('0' + jIn);
                addTrial.selectAddTrialStatus(splitTO[j]);
                if (splitTO[j] === 'Withdrawn' || splitTO[j] === 'Temporarily Closed to Accrual' || splitTO[j] === 'Temporarily Closed to Accrual and Intervention' || splitTO[j] === 'Administratively Complete') {
                    addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                    addTrial.clickAddTrialAddStatusButton();
                    projectFunctionsRegistry.verifyAddTrialStatusInformation(splitTO[j], moment().subtract(1, 'months').startOf('month').add(j, 'day').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                }
                else {
                    addTrial.clickAddTrialAddStatusButton();
                    projectFunctionsRegistry.verifyAddTrialStatusInformation(splitTO[j], moment().subtract(1, 'months').startOf('month').add(j, 'day').format('DD-MMM-YYYY'), '', '', '');
                }
            }
            addTrial.clickAddTrialResetButton();
        }
        browser.sleep(25).then(callback);
    });

    this.Then(/^no errors\-warnings will be displayed$/, function (callback) {
        callback();
    });

    this.When(/^I add a trial date (.*) and trial status from (.*) to trial date (.*) trial status (.*) with the (.*) then the respective checks (.*) will be there$/, function (statusDateFrom, statusFrom, statusDateTo, statusTo, condition, errorsWarnings, table, callback) {
        statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            if (statusTable[i].statusDateFrom === 'Date Entered past' && statusTable[i].condition === 'all the previous Status before Active has been added') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldPreviousMonth('01');
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldPreviousMonth('01');
                addTrial.selectAddTrialStatus('Approved');
                addTrial.clickAddTrialAddStatusButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldPreviousMonth('01');
            } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldNextMonth('01');
            } else if (statusTable[i].statusDateFrom === 'Date Entered past') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldPreviousMonth('01');
            } else
                {
                if (statusTable[i].condition === 'all the previous Status before Active has been added') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('In Review');
                    addTrial.clickAddTrialAddStatusButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.clickAddTrialAddStatusButton();
                } else if (/^all the previous Status before Active including Active/.test(statusTable[i].condition)) {
                    //else if (statusTable[i].condition === /all the previous Status before Active including Active*/) {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('In Review');
                    addTrial.clickAddTrialAddStatusButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.clickAddTrialAddStatusButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('Active');
                    addTrial.clickAddTrialAddStatusButton();
                }
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
            }
            addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
            if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete') {
                addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusDateFrom === 'Date Entered past') {
                    if (statusTable[i].statusFrom === 'Approved') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    }
                } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                    if (statusTable[i].statusFrom === 'Approved') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    }
                } else {
                    if (statusTable[i].statusFrom === 'Approved') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    }
                }
            } else {
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusDateFrom === 'Date Entered past') {
                    if (statusTable[i].statusFrom === 'Approved') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                    }
                } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                    if (statusTable[i].statusFrom === 'Approved') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                    }
                } else {
                    if (statusTable[i].statusFrom === 'Approved') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [In Review] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing');
                    } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                    }
                }
            }
            if (statusTable[i].statusDateTo === 'Date Entered past') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldPreviousMonth('01');
            } else if (statusTable[i].statusDateTo === 'Date in Future') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldNextMonth('01');
            } else {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
            }
            addTrial.selectAddTrialStatus(statusTable[i].statusTo);
            if (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete') {
                addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusDateTo === 'Date Entered past') {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', statusTable[i].errorsWarnings);
                    }
                } else if (statusTable[i].statusDateTo === 'Date in Future') {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', statusTable[i].errorsWarnings);
                    }
                } else {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', statusTable[i].errorsWarnings);
                    }
                }
            } else {
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusDateTo === 'Date Entered past') {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                    }
                } else if (statusTable[i].statusDateTo === 'Date in Future') {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                    }
                } else {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', '');
                    } else if (statusTable[i].condition === 'all the previous Status before Active including Active before Closed to Accrual has been added' && statusTable[i].statusFrom === 'Closed to Accrual') {
                        //  projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', '');
                        expect(addTrial.addTrialErrorWarningTable.get(2).getText()).to.eventually.equal('');
                        expect(addTrial.addTrialErrorWarningTable.get(4).getText()).to.eventually.equal(statusTable[i].errorsWarnings);
                    } else if (statusTable[i].condition === 'all the previous Status before Active including Active before Temporarily Closed to Accrual has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                        expect(addTrial.addTrialErrorWarningTable.get(2).getText()).to.eventually.equal('');
                        expect(addTrial.addTrialErrorWarningTable.get(4).getText()).to.eventually.equal(statusTable[i].errorsWarnings);
                    } else if (statusTable[i].condition === 'all the previous Status before Active including Active before Temporarily Closed to Accrual and Intervention has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(2).getText()).to.eventually.equal('');
                        expect(addTrial.addTrialErrorWarningTable.get(4).getText()).to.eventually.equal(statusTable[i].errorsWarnings);
                    }
                    else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                    }
                }
            }
            addTrial.clickAddTrialResetButton();
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on the Trial status list$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Then(/^the order of trial status list should be$/, function (table, callback) {
        trialStatusList = table.raw();
        console.log('value of table' + trialStatusList);
        addTrial.addTrialStatusList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialStatusList.toString().split(","));
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on Review Trial without any Trial Status$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I should get an error message as "([^"]*)"$/, function (arg1, callback) {
        if(arg1 === 'Trial Status is required'){
            expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^On Add Trial Status if Status Date or Status is missing$/, function (callback) {
        addTrial.clickAddTrialAddStatusButton();
        /****** Status Date and Status both not provided *********/
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('Please provide a Status Date, select a Status')).to.become('true');
        /****** Status Date provided but Status not provided *********/
        addTrial.clickAddTrialDateField('0');
        addTrial.clickAddTrialDateToday();
        addTrial.clickAddTrialAddStatusButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('Please provide a Status Date, select a Status')).to.become('true');
        /****** Status Date not provided but Status provided *********/
        addTrial.clickAddTrialResetButton();
        addTrial.selectAddTrialStatus('In Review');
        addTrial.clickAddTrialAddStatusButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('Please provide a Status Date, select a Status')).to.become('true');
        /****** Status Date and Status both provided so no error *********/
        addTrial.clickAddTrialResetButton();
        addTrial.clickAddTrialDateField('0');
        addTrial.clickAddTrialDateToday();
        addTrial.selectAddTrialStatus('In Review');
        addTrial.clickAddTrialAddStatusButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('Please provide a Status Date, select a Status')).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.Given(/^On Add Trial Status when the Status selected is$/, function (table, callback) {
        trialStatusStudyStoppedList = table.raw();
        trialStatusStudyStoppedItems = trialStatusStudyStoppedList.toString().split(",");
        console.log('trialStatusStudyStoppedList');
        console.log(trialStatusStudyStoppedList);
        console.log('trialStatusStudyStoppedItems');
        console.log(trialStatusStudyStoppedItems);
        browser.sleep(25).then(callback);
    });

    this.Given(/^Why Study Stopped reason is not provided$/, function (callback) {
        for (var i = 0; i < trialStatusStudyStoppedItems.length; i++) {
            addTrial.clickAddTrialResetButton();
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialStatus(trialStatusStudyStoppedItems[i]);
            addTrial.clickAddTrialAddStatusButton();
            expect(projectFunctionsRegistry.verifyTrialValidationMessage('Please provide a Status Date, select a Status and enter Why Study Stopped')).to.become('true');
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I select a Status Date in Past$/, function (callback) {
        addTrial.clickAddTrialDateField('0');
        addTrial.clickAddTrialDateFieldPreviousMonth('01');
        browser.sleep(25).then(callback);
    });

    this.Then(/^It should not give any error message for status date$/, function (callback) {
        addTrial.selectAddTrialStatus('In Review');
        addTrial.clickAddTrialAddStatusButton();
        browser.sleep(25).then(callback);
    });

    this.Given(/^the added date format should be DD\-MMM\-YYYY format$/, function (callback) {
        /*************** Verify the date format in Trial Status table ************/
         addTrial.addTrialStatusDateTableVerifyDateExist.isPresent().then(function (result) {
            if (result) {
                addTrial.addTrialStatusDateTable.getText().then(function (value) {
                    if (value.toString() === moment().format('DD-MMM-YYYY')) {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation('In Review', moment().format('DD-MMM-YYYY'), '', '', '');
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation('In Review', moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                    }
                });
            }
        });
        /*************** Verify the date format in Trial Start Date ************/
        addTrial.addTrialStartDate.getAttribute('value').then(function(value) {
            if (value !== '') {
                addTrial.getVerifyAddTrialStartDate(moment().format('DD-MMM-YYYY'));
            }
        });
        /*************** Verify the date format in Trial Primary Completion Date ************/
        addTrial.addTrialPrimaryCompletionDate.getAttribute('value').then(function (value) {
            if (value !== '') {
                addTrial.getVerifyAddTrialPrimaryCompletionDate(moment().format('DD-MMM-YYYY'));
            }
        });
        /*************** Verify the date format in Trial Completion date ************/
        addTrial.addTrialCompletionDate.getAttribute('value').then(function (value) {
            if (value !== '') {
                addTrial.getVerifyAddTrialCompletionDate(moment().format('DD-MMM-YYYY'));
            }
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select a Status Date in Today$/, function (callback) {
        addTrial.clickAddTrialResetButton();
        addTrial.clickAddTrialDateField('0');
        addTrial.clickAddTrialDateToday();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select a Status Date in Future$/, function (callback) {
        addTrial.clickAddTrialResetButton();
        addTrial.clickAddTrialDateField('0');
        addTrial.clickAddTrialDateFieldNextMonth('01');
        browser.sleep(25).then(callback);
    });

    this.Then(/^It should give an error message for future status date$/, function (callback) {
        addTrial.selectAddTrialStatus('In Review');
        addTrial.clickAddTrialAddStatusButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('The Status Date should not be in the future')).to.become('true');
        expect(addTrial.addTrialStatusDateTableVerifyDateExist.isPresent()).to.become(false);
        browser.sleep(25).then(callback);
    });

    this.When(/^When I add a trial status$/, function (callback) {
        addTrial.clickAddTrialDateField('0');
        addTrial.clickAddTrialDateToday();
        addTrial.selectAddTrialStatus('In Review');
        addTrial.setAddTrialStatusComment('Status Comment cuke');
        addTrial.clickAddTrialAddStatusButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^a new trial status will appear in the Trial Status History$/, function (callback) {
        projectFunctionsRegistry.verifyAddTrialStatusInformation('In Review', moment().format('DD-MMM-YYYY'), 'Status Comment cuke', '', '');
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on the delete button in the Actions column for a selected status$/, function (callback) {
        projectFunctionsRegistry.clickDeleteTrialStatusInformation('In Review');
        browser.sleep(25).then(callback);
    });

    this.Then(/^Please provide a comment box will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I must provide a comment explaining why deleting this trial status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the comment is entered in the provided box$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^click on the delete button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the selected status will be marked as deleted$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the record will be deleted after the trial is submitted$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on the Trial Dates Section$/, function (callback) {
        callback();
    });

    this.Given(/^I must enter Trial Dates values type$/, function (table, callback) {
        trialStatusStudyStoppedList = table.raw();
        trialStatusStudyStoppedItems = trialStatusStudyStoppedList.toString().split(",");
        addTrial.clickAddTrialDateField('1');
        addTrial.clickAddTrialDateToday();
        addTrial.clickAddTrialDateField('2');
        addTrial.clickAddTrialDateToday();
        addTrial.clickAddTrialDateField('3');
        addTrial.clickAddTrialDateToday();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I must Select Trial Date type for every Trial Date value$/, function (table, callback) {
        trialStatusStudyStoppedList = table.raw();
        trialStatusStudyStoppedItems = trialStatusStudyStoppedList.toString().split(",");
        addTrial.selectAddTrialStartDateOption('0');
        addTrial.selectAddTrialStartDateOption('1');
        addTrial.selectAddTrialPrimaryCompletionDateOption('0');
        addTrial.selectAddTrialPrimaryCompletionDateOption('1');
        addTrial.selectAddTrialCompletionDateOption('0');
        addTrial.selectAddTrialCompletionDateOption('1');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked on the review button$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^no errors should be displayed$/, function (callback) {
        expect(projectFunctions.verifyWarningMessage('Trial Start Date is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Trial Start Date Type is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Primary Completion Date is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Primary Completion Date Type is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Completion Date is required')).to.become('false');
        expect(projectFunctions.verifyWarningMessage('Completion Date Type is required')).to.become('false');
        addTrial.getVerifyAddTrialStartDate(moment().format('DD-MMM-YYYY'));
        addTrial.verifyAddTrialStartDateOption('1', true);
        addTrial.getVerifyAddTrialPrimaryCompletionDate(moment().format('DD-MMM-YYYY'));
        addTrial.verifyAddTrialPrimaryCompletionDateOption('1', true);
        addTrial.getVerifyAddTrialCompletionDate(moment().format('DD-MMM-YYYY'));
        addTrial.verifyAddTrialCompletionDateOption('1', true);
        browser.sleep(25).then(callback);
    });


    this.When(/^I have not entered a Trial Date values for$/, function (table, callback) {
        addTrial.getVerifyAddTrialStartDate('');
        addTrial.getVerifyAddTrialPrimaryCompletionDate('');
        addTrial.getVerifyAddTrialCompletionDate('');
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^an error message type will be displayed$/, function (table, callback) {
        errorTableTrialDate = table.raw();
        for (var i = 0; i < errorTableTrialDate.length; i++) {
            expect(projectFunctions.verifyWarningMessage(errorTableTrialDate[i].toString())).to.become('true');
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not entered a Trial Date type for the mandatory Trial Dates$/, function (table, callback) {
        addTrial.verifyAddTrialStartDateOption('0', false);
        addTrial.verifyAddTrialPrimaryCompletionDateOption('0', false);
        addTrial.verifyAddTrialCompletionDateOption('0', false);
        addTrial.verifyAddTrialStartDateOption('1', false);
        addTrial.verifyAddTrialPrimaryCompletionDateOption('1', false);
        addTrial.verifyAddTrialCompletionDateOption('1', false);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the error message type will be displayed$/, function (table, callback) {
        errorTableTrialDateType = table.raw();
        for (var i = 0; i < errorTableTrialDateType.length; i++) {
            expect(projectFunctions.verifyWarningMessage(errorTableTrialDateType[i].toString())).to.become('true');
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^Current Trial Status is (.*) then for the "([^"]*)" below rules for "([^"]*)" (.*) along with warning (.*) should be there$/, function (TrialStatusType, arg1, arg2, DateTypeActual, DateTypeActualWarning, table, callback) {
        trialDateTable = table.hashes();
        for (var i = 0; i < trialDateTable.length; i++) {
            addTrial.clickAddTrialResetButton();
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            console.log('**************** CURRENT TRIAL STATUS *************');
            console.log(trialDateTable[i].TrialStatusType);
            addTrial.selectAddTrialStatus(trialDateTable[i].TrialStatusType);
            if (trialDateTable[i].TrialStatusType === 'Withdrawn' || trialDateTable[i].TrialStatusType === 'Temporarily Closed to Accrual' || trialDateTable[i].TrialStatusType === 'Temporarily Closed to Accrual and Intervention' || trialDateTable[i].TrialStatusType === 'Administratively Complete') {
                addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test SS');
            }
            addTrial.clickAddTrialAddStatusButton();
            if(arg2 === 'Actual') {
                if (arg1 === 'Trial Start Date') {
                    addTrial.clickAddTrialDateField('1');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStartDateOption('0');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialStartDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualWarning);
                    addTrial.clickAddTrialDateField('1');
                    addTrial.clickAddTrialDateClear();
                    addTrial.clickAddTrialDateField('1');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialStartDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualWarning);
                }
                else if (arg1 === 'Primary Completion Date') {
                    addTrial.clickAddTrialDateField('2');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialPrimaryCompletionDateOption('0');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialPrimaryCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualWarning);
                    addTrial.clickAddTrialDateField('2');
                    addTrial.clickAddTrialDateClear();
                    addTrial.clickAddTrialDateField('2');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialPrimaryCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualWarning);
                }
                else if (arg1 === 'Completion Date') {
                    addTrial.clickAddTrialDateField('3');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialCompletionDateOption('0');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualWarning);
                    addTrial.clickAddTrialDateField('3');
                    addTrial.clickAddTrialDateClear();
                    addTrial.clickAddTrialDateField('3');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualWarning);
                }
            }
            else if (arg2 === 'Anticipated'){
                if (arg1 === 'Trial Start Date') {
                    addTrial.clickAddTrialDateField('1');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStartDateOption('1');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialStartDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedWarning);
                    addTrial.clickAddTrialDateField('1');
                    addTrial.clickAddTrialDateClear();
                    addTrial.clickAddTrialDateField('1');
                    addTrial.clickAddTrialDateFieldNextMonth('01');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialStartDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedWarning);
                }
                else if (arg1 === 'Primary Completion Date') {
                    addTrial.clickAddTrialDateField('2');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialPrimaryCompletionDateOption('1');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialPrimaryCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedWarning);
                    addTrial.clickAddTrialDateField('2');
                    addTrial.clickAddTrialDateClear();
                    addTrial.clickAddTrialDateField('2');
                    addTrial.clickAddTrialDateFieldNextMonth('01');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialPrimaryCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedWarning);
                }
                else if (arg1 === 'Completion Date') {
                    addTrial.clickAddTrialDateField('3');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialCompletionDateOption('1');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedWarning);
                    addTrial.clickAddTrialDateField('3');
                    addTrial.clickAddTrialDateClear();
                    addTrial.clickAddTrialDateField('3');
                    addTrial.clickAddTrialDateFieldNextMonth('01');
                    addTrial.clickAddTrialReviewButton();
                    expect(addTrial.addTrialCompletionDateErrorMessage.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedWarning);
                }

            }
        }
        browser.sleep(25).then(callback);
    });

    //this.When(/^Current Trial Status is (.*) then for the "([^"]*)" below rules for "([^"]*)" (.*) along with warning (.*) should be there$/, function (arg1, arg2, TrialStatusType, DateTypeAnticipated, DateTypeAnticipatedWarning, table, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback();
    //});

    this.Given(/^I am on the Trial Dates Screen$/, function (callback) {
        callback();
    });

    this.When(/^the Trial date is in the past$/, function (callback) {
        console.log('******* Trial Start Date Verification Date in Past *********');
        addTrial.clickAddTrialDateField('1');
        addTrial.clickAddTrialDateFieldPreviousMonth('01');
        console.log('******* Trial Primary Completion Date Verification Date in Past *********');
        addTrial.clickAddTrialDateField('2');
        addTrial.clickAddTrialDateFieldPreviousMonth('01');
        console.log('******* Trial Completion Date Verification Date in Past *********');
        addTrial.clickAddTrialDateField('3');
        addTrial.clickAddTrialDateFieldPreviousMonth('01');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial date type must be actual$/, function (callback) {
        console.log('******* Trial Start Date Actual Type Option Verification in Past *********');
        addTrial.selectAddTrialStartDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Start Date Anticipated Type Option Verification in Past *********');
        addTrial.selectAddTrialStartDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('Trial Start Date type cannot be Anticipated if Trial Start Date is in the past');
        console.log('******* Trial Primary Completion Date Actual Type Option Verification in Past *********');
        addTrial.selectAddTrialPrimaryCompletionDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Primary Completion Date Anticipated Type Option Verification in Past *********');
        addTrial.selectAddTrialPrimaryCompletionDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('Primary Completion Date type cannot be Anticipated if Primary Completion Date is in the past');
        console.log('******* Trial Completion Date Actual Type Option Verification in Past *********');
        addTrial.selectAddTrialCompletionDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Completion Date Anticipated Type Option Verification in Past *********');
        addTrial.selectAddTrialCompletionDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('Completion Date type cannot be Anticipated if Completion Date is in the past');
        browser.sleep(25).then(callback);
    });

    this.When(/^the Trial date is today$/, function (callback) {
        console.log('******* Trial Start Date Verification Date Today *********');
        addTrial.clickAddTrialDateField('1');
        addTrial.clickAddTrialDateToday();
        console.log('******* Trial Primary Completion Date Verification Date Today *********');
        addTrial.clickAddTrialDateField('2');
        addTrial.clickAddTrialDateToday();
        console.log('******* Trial Completion Date Verification Date Today *********');
        addTrial.clickAddTrialDateField('3');
        addTrial.clickAddTrialDateToday();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Date type could be actual$/, function (callback) {
        console.log('******* Trial Start Date Actual Type Option Verification for Today *********');
        addTrial.selectAddTrialStartDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Primary Completion Date Actual Type Option Verification for Today *********');
        addTrial.selectAddTrialPrimaryCompletionDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Completion Date Actual Type Option Verification for Today *********');
        addTrial.selectAddTrialCompletionDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Trial date Type could be anticipated$/, function (callback) {
        console.log('******* Trial Start Date Anticipated Type Option Verification for Today *********');
        addTrial.selectAddTrialStartDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Primary Completion Date Anticipated Type Option Verification for Today *********');
        addTrial.selectAddTrialPrimaryCompletionDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Completion Date Anticipated Type Option Verification for Today *********');
        addTrial.selectAddTrialCompletionDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        browser.sleep(25).then(callback);
    });

    this.When(/^the Trial date is in the future$/, function (callback) {
        console.log('******* Trial Start Date Verification Date in Future *********');
        addTrial.clickAddTrialDateField('1');
        addTrial.clickAddTrialDateFieldNextMonth('01');
        console.log('******* Trial Completion Date Verification Date in Future *********');
        addTrial.clickAddTrialDateField('2');
        addTrial.clickAddTrialDateFieldNextMonth('01');
        console.log('******* Trial Completion Date Verification Date in Future *********');
        addTrial.clickAddTrialDateField('3');
        addTrial.clickAddTrialDateFieldNextMonth('01');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial date type must always be anticipated$/, function (callback) {
        console.log('******* Trial Start Date Actual Type Option Verification in Future *********');
        addTrial.selectAddTrialStartDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('Trial Start Date type cannot be Actual if Trial Start Date is in the future');
        console.log('******* Trial Start Date Anticipated Type Option Verification in Future *********');
        addTrial.selectAddTrialStartDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Primary Completion Date Actual Type Option Verification in Future *********');
        addTrial.selectAddTrialPrimaryCompletionDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('Primary Completion Date type cannot be Actual if Primary Completion Date is in the future');
        console.log('******* Trial Primary Completion Date Anticipated Type Option Verification in Future *********');
        addTrial.selectAddTrialPrimaryCompletionDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        console.log('******* Trial Completion Date Actual Type Option Verification in Future *********');
        addTrial.selectAddTrialCompletionDateOption('0');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('Completion Date type cannot be Actual if Completion Date is in the future');
        console.log('******* Trial Completion Date Anticipated Type Option Verification in Future *********');
        addTrial.selectAddTrialCompletionDateOption('1');
        addTrial.clickAddTrialReviewButton();
        expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
        browser.sleep(25).then(callback);
    });



};