/**
 * Created by singhs10 on 7/25/16.
 */
var registryMessage = function() {

/******* Import Trial **********/
    this.invalidNCTIDErrorMsg = 'A study with the given identifier is not found in ClinicalTrials.gov.';
    this.duplicateNCTIDErrorMsg = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.';
    this.duplicateLeadOrgAndLeadOrgIDErrorMsg = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.';

/******* Registry Trial Dates *******/
    this.trialDatesCompletionActualMessage = 'Completion Date type cannot be Actual if Completion Date is in the future';
    this.trialDatesCompletionStatusMessage = function(trialStatus)  {
        return 'If current Trial Status is ' + trialStatus + ', Completion Date must be Anticipated';
    };


/******* Default Selected Values *********/
    this.trialSecondaryPurposeFieldDefaultValue = '-Select a Secondary Purpose-';
    this.trialReponsiblePartyFieldDefaultValue = '-Select a Responsible Party-';

};
module.exports = registryMessage;