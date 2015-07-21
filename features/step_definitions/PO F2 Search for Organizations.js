/**
 * Created by singhs10 on 7/16/15.
 */

var fs = require('fs');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var supports = require('../support/Page_ListOfOrganizations');
//var support = require('../support.js');

module.exports = function() {
    this.Given(/^I know the name of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
       var searchorg = "boston*";
        callback();
    });

    this.Given(/^I am logged in to CTRP$/, function (callback) {
        //browser.get('http://localhost/ctrp/angular#/main/welcome');
        browser.get('http://localhost/ctrp/angular#/main/sign_in');
        element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
        element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
        element(by.css('.btn.btn-success')).click();
        setTimeout(callback, 10000);
    });

    this.Given(/^I have selected the option to search for an organization$/, function (callback) {
        expect(element(by.linkText("Organizations")).isPresent()).to.become(true);
        element(by.linkText("Organizations")).click();
     //   expect(element(by.linkText("List of Organizations")).isPresent()).to.become(false);
     //   element(by.linkText("List of Organizations")).click();
     //   expect(element(by.css('a[ui-sref="main.organizations"]')).isPresent()).to.become(true);
       //    element(by.css('a[ui-sref="main.organizations"]')).click();
        callback();
    });

    this.When(/^I provide the full or partial name of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
      //  element(by.model('orgsView.searchParams.name')).sendKeys('university*');
      //  element(by.id('organization_name')).sendKeys('university*');
        supports.action_Fill_SearchField_Org_Name("university*", "false", "1234","ctep","Pending","add1","add2","fam","test","","","city","98");
       // element(by.buttonText("Clear")).click();
        setTimeout(callback, 10000);
    });

    this.When(/^I indicate to include aliases$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I submit my search request$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the name or the alias$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I indicate to not search Aliases$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the CTEP ID of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the CTEP ID of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the CTEP ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the PO Organization ID of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the PO Organization ID of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the PO Organization ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the Family name to which the organization I wish to search for belongs to$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the full or partial Family name of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that are members of the Family Name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the city I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the full or partial city of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations whose address contains the city$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the state I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the state from a list of states displayed by CTRP$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations whose address contains the state$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the country I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the country from a list of countries displayed by CTRP$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations whose address contains the country$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the zip code I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the full or partial zip code of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations whose address contains the zip code$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the organization phone number I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the full or partial phone number of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations with matching phone numbers$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the (.*) I wish to search forxx$/, function (organizationTrialRelationship, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the (.*) of the organization I wish to search for$/, function (organizationTrialRelationship, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that have the (.*)$/, function (organizationTrialRelationship, table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know multiple parameters of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on the search organizations screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the parameters of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain all of the entered parameters$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the curator date I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am logged in to CTRP PO application$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the curator date of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the curator date$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the curator name I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the curator name of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the curator name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
}