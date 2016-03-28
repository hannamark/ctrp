/**
 * Created by singhs10 on 3/24/16.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var menuItemList = require('../support/PoCommonBar');
var moment = require('moment');
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var orgPage = require('../support/ListOfOrganizationsPage');
var underscore = require('underscore');

module.exports = function() {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var searchOrg = new orgPage();

    this.Given(/^the following parameters of an Organization exist:$/, function (table, callback) {
        organizationTable = table.hashes();
        for (var i = 0; i < organizationTable.length; i++) {
            organizationCityValue = organizationTable[i].City;
            organizationCountryValue = organizationTable[i].Country;
            organizationPostalValue = organizationTable[i].PostalCode;
            organizationPhoneValue = organizationTable[i].Phone;
            organizationEmailValue = organizationTable[i].Email;
            organizationStateValue = organizationTable[i].State;
           // projectFunctions.searchOrganizationLink();
            projectFunctions.createOrgForSearchWithParameters('ctrptrialsubmitter',organizationTable[i].Name, organizationTable[i].Alias, 'tr Org Add1', 'tr Org Add2', organizationTable[i].Country, organizationTable[i].State, organizationTable[i].PostalCode, organizationTable[i].City, organizationTable[i].Email, organizationTable[i].Phone, '456-786-0981', organizationTable[i].FamilyName, 'Active', 'NIH', 'Organizational', '05', 'May', '2015', '15', 'April', '2018');
        }
        browser.sleep(25).then(callback);
    });




};




