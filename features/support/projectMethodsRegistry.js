/**
 * Created by singhs10 on 11/17/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
var searchTrialPage = require('../support/searchTrialPage');
var trialMenuItemList = require('../support/trialCommonBar');
//var menuItemList = require('../support/PoCommonBar');
//var addOrgPage = require('../support/AddOrganizationPage');
//var searchOrgPage = require('../support/ListOfOrganizationsPage');
//var searchPeoplePage = require('../support/ListOfPeoplePage');
//var addPeoplePage = require('../support/AddPersonPage');
//var searchFamilyPage = require('../support/ListOfFamiliesPage');
//var addFamilyPage = require('../support/AddFamilyPage');
//var selectValuePage = require('../support/CommonSelectList');
//var loginPage = require('../support/LoginPage');
//var moment = require('moment');


var projectMethodsRegistry = function() {
    //var login = new loginPage();
    //var menuItem = new menuItemList();
    //var selectValue = new selectValuePage();
    //var addOrg = new addOrgPage();
    //var searchOrg = new searchOrgPage();
    //var searchPeople = new searchPeoplePage();
    //var addPeople = new addPeoplePage();
    //var searchFamily = new searchFamilyPage();
    //var addFamily = new addFamilyPage();
    var helper = new helperFunctions();
    var addTrial = new addTrialPage();
    var searchTrial = new searchTrialPage();
    var trialMenuItem = new trialMenuItemList();

    this.selectTrials = function(trialType) {
        if (trialType === 'National') {
            trialMenuItem.clickRegisterNationalTrialLink();
        }
        else if (trialType === 'Externally Peer-Reviewed') {
            trialMenuItem.clickRegisterExternallyPeerReviewedTrialLink();
        }
        else if (trialType === 'Institutional')   {
            trialMenuItem.clickRegisterInstitutionalTrialLink();
        }
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value
     * @param protocolIDOrigin
     * @param protocolID
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifier = function (protocolIDOrigin, protocolID) {
        return addTrial.addTrialVerifyOtherTrialIdentifier.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === protocolIDOrigin;
            });
        }).then(function (rows) {
            console.log('value of row' + rows);
           expect(rows[0].element(by.css('.col-md-6.protocol-id')).getText()).to.eventually.equal(protocolID);
        },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value
     * @param anyItemInTable
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifierTable = function (anyItemInTable) {
        return addTrial.addTrialVerifyOtherTrialIdentifierTable.filter(function(name) {
            return name.getText().then(function(text) {
                console.log('text is' + text + 'Itemto be verified' + anyItemInTable);
                return text === anyItemInTable ;
            });
        }).then(function(filteredElements) {
            console.log('filtered elements' + filteredElements);
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };
};
module.exports = projectMethodsRegistry;