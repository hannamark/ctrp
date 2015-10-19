/**
 * Created by singhs10 on 10/19/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItem = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var helper = require('../support/helper');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItemList = new menuItem();
    var search = new listOfPeoplePage();
    var person = new personPage();
    var projectFunctions = new projectFunctionsPage();
    var orgEffectiveDate = '19-Oct-2015';
    var orgExpirationDate = '19-Oct-2020';

    this.Given(/^I know the name of the alias I wish to add for an organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected the function Add Alias$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on the Add Alias information screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I enter the alias name of the organization I wish to add for the selected organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I submit my request$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should add the alias name to the list of alias names for the selected organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}
