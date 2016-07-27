/**
 * Created by singhs10 on 7/25/16.
 */
var registryMessage = function() {


    this.invalidNCTIDErrorMsg = 'A study with the given identifier is not found in ClinicalTrials.gov.';
    this.duplicateNCTIDErrorMsg = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.';
    this.duplicateLeadOrgAndLeadOrgIDErrorMsg = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.';

};
module.exports = registryMessage;