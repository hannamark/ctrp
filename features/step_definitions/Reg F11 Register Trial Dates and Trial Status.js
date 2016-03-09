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
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                    } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete')) {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        }
                    } else {
                        if (statusTable[i].statusFrom === 'In Review') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', statusTable[10].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
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
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[1].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    } else if (statusTable[i].statusFrom === 'Approved') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[2].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[3].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[6].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[7].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                        expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(statusTable[9].errorsWarnings.toString().replace(/\\n/g, "\n", -1));
                    } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
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
            if (statusTable[i].statusDateFrom === 'Date in Past') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldPreviousMonth('01');
            } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateFieldNextMonth('01');
            } else {
                if (statusTable[i].condition === 'all the previous Status before Active has been added') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus('In Review');
                    addTrial.clickAddTrialAddStatusButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.clickAddTrialAddStatusButton();
                } else if (/^all the previous Status before Active including Active/.test(statusTable[i].condition)) {
                    //else if (statusTable[i].condition === /all the previous Status before Active including Active*/) {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
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
                }
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
            }
            addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
            if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete') {
                addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                addTrial.clickAddTrialAddStatusButton();
                if (statusTable[i].statusDateFrom === 'Date in Past') {
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
                if (statusTable[i].statusDateFrom === 'Date in Past') {
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
            if (statusTable[i].statusDateTo === 'Date in Past') {
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
                if (statusTable[i].statusDateTo === 'Date in Past') {
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
                if (statusTable[i].statusDateTo === 'Date in Past') {
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
                    } else {
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                    }
                }
            }
            addTrial.clickAddTrialResetButton();
        }
        browser.sleep(25).then(callback);
    });

};


