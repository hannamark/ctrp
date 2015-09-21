/**
 * Created by singhs10 on 7/16/15.
 */

//var fs = require('fs');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var LoginPage = require('../support/LoginPage');
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var MenuItem = require('../support/PoCommonBar');


module.exports = function() {
    var Login = new LoginPage();
    var MenuItemList = new MenuItem();
    var Search = new ListOfOrganizationPage();

    this.Given(/^I know the name of the organization I wish to search for$/, function (callback) {
        // callback();//
        setTimeout(callback, 2000);
    });

    this.Given(/^I am logged in to CTRP$/, function (callback) {
        browser.get('ui#/main/sign_in');
        Login.login('ctrpadmin', 'Welcome01');
        setTimeout(callback, 5000);
    });

    this.Given(/^I have selected the option to search for an organization$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        //callback();//
        setTimeout(callback, 5000);
    });

    this.When(/^I provide the full or partial name of the organization I wish to search for$/, function (callback) {
        Search.setOrgName('university*');
        // callback();
        setTimeout(callback, 2000);
    });

    this.When(/^I indicate to include aliases$/, function (callback) {
        // Search.checkAlias('true');
        setTimeout(callback, 2000);
        // callback();
    });

    this.When(/^I submit my search request$/, function (callback) {
        Search.clickSearchButton();
        setTimeout(callback, 2000);
        // callback();
    });

    this.Then(/^the system should display all organizations that contain the name or the alias$/, function (callback) {
        expect(Search.inResults('University of Minnesota/Masonic Children\'s Hospital')).to.become(true);
        expect(Search.inResults('University of Minnesota Medical Center-Fairview')).to.become(true);
        expect(Search.inResults('University of Minnesota Medical Center-Fairview-Riverside')).to.become(true).and.notify(callback);
        // setTimeout(callback, 2000);
        //  callback();
    });

    this.When(/^I indicate to not search Aliases$/, function (callback) {
        Search.checkAlias('false');
        setTimeout(callback, 2000);
        //  callback();
    });

    this.Then(/^the system should display all organizations that contain the name$/, function (callback) {
        expect(Search.inResults('University of Minnesota/Masonic Children\'s Hospital')).to.become(true);
        expect(Search.inResults('University of Minnesota Medical Center-Fairview')).to.become(true);
        expect(Search.inResults('University of Minnesota Medical Center-Fairview-Riverside')).to.become(false);
        setTimeout(callback, 2000);
        //  callback();
    });

    this.Given(/^I know the CTEP ID of the organization I wish to search for$/, function (callback) {
        setTimeout(callback, 2000);
        // callback();
    });

    this.When(/^I provide the CTEP ID of the organization I wish to search for$/, function (callback) {
        Search.setSourceId('NC164');
        setTimeout(callback, 2000);
        //  callback();
    });

    this.Then(/^the system should display all organizations that contain the CTEP ID$/, function (callback) {
        expect(Search.inResults('NC164')).to.become(true);
        setTimeout(callback, 2000);
        //  callback();
    });

    this.Given(/^I know the PO Organization ID of the organization I wish to search for$/, function (callback) {
        setTimeout(callback, 2000);
        //  callback();
    });

    this.When(/^I provide the PO Organization ID of the organization I wish to search for$/, function (callback) {
        Search.setPoId('153109');
        setTimeout(callback, 2000);
        // callback();
    });

    this.Then(/^the system should display all organizations that contain the PO Organization ID$/, function (callback) {
        expect(Search.inResults('153109')).to.become(true);
        setTimeout(callback, 2000);
        // callback();
    });

    this.Given(/^I know the Family name to which the organization I wish to search for belongs to$/, function (callback) {
        setTimeout(callback, 2000);
        //  callback();
    });

    this.When(/^I provide the full or partial Family name of the organization I wish to search for$/, function (callback) {
        Search.setFamilyName('Masonic Cancer Center');
        //  callback();//
        setTimeout(callback, 2000);
    });

    this.Then(/^the system should display all organizations that are members of the Family Name$/, function (callback) {
        expect(Search.inResults('Masonic Cancer Center')).to.become(true).and.notify(callback);
        //  callback();
        //  setTimeout(callback, 2000);
    });

    this.Given(/^I know the name of the city I wish to search for$/, function (callback) {
        //  callback();
        setTimeout(callback, 2000);
    });

    this.When(/^I provide the full or partial city of the organization I wish to search for$/, function (callback) {
        Search.setCity('Wilmington');
        //  callback();
        setTimeout(callback, 2000);
    });

    this.Then(/^the system should display all organizations whose address contains the city$/, function (callback) {
        expect(Search.inResults('Wilmington')).to.become(true);
        //  callback();
        setTimeout(callback, 2000);
    });

    this.Given(/^I know the name of the state I wish to search for$/, function (callback) {
        //  callback();
        setTimeout(callback, 2000);
    });

    this.When(/^I select the state from a list of states displayed by CTRP$/, function (callback) {
        Search.selectCountry('United States');
        Search.selectState('North Carolina');
        //  callback();
        setTimeout(callback, 3000);
    });

    this.Then(/^the system should display all organizations whose address contains the state$/, function (callback) {
        expect(Search.inResults('North Carolina')).to.become(true);
        //  callback();
        setTimeout(callback, 3000);
    });

    this.Given(/^I know the name of the country I wish to search for$/, function (callback) {
        //  callback();
        setTimeout(callback, 3000);
    });

    this.When(/^I select the country from a list of countries displayed by CTRP$/, function (callback) {
        Search.selectCountry('Switzerland');
        //  callback();
        setTimeout(callback, 3000);
    });

    this.Then(/^the system should display all organizations whose address contains the country$/, function (callback) {
        expect(Search.inResults('Switzerland')).to.become(true).and.notify(callback);
        //  callback();
        // setTimeout(callback, 2000);
    });

    this.Given(/^I know the name of the zip code I wish to search for$/, function (callback) {
        //  callback();
        setTimeout(callback, 2000);
    });

    this.When(/^I provide the full or partial zip code of the organization I wish to search for$/, function (callback) {
        Search.setPostalCode('27157');
        //  callback();
        setTimeout(callback, 2000);
    });

    this.Then(/^the system should display all organizations whose address contains the zip code$/, function (callback) {
        expect(Search.inResults('27157')).to.become(true).and.notify(callback);
        //  callback();
        //  setTimeout(callback, 2000);
    });

    this.Given(/^I know the organization phone number I wish to search for$/, function (callback) {
        //   callback();
        setTimeout(callback, 2000);
    });

    this.When(/^I provide the full or partial phone number of the organization I wish to search for$/, function (callback) {
        Search.setPhone('336-716-0891');
        //   callback();
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all organizations with matching phone numbers$/, function (callback) {
        expect(Search.inResults('336-716-0891')).to.become(true);
        //   callback();
        setTimeout(callback, 2000);
    });

    this.Given(/^I know the name of the organization_trial_relationship I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the organization_trial_relationship of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that have the organization_trial_relationship$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know multiple parameters of the organization I wish to search for$/, function (callback) {
        //   callback();
        setTimeout(callback, 2000);
    });

    this.Given(/^I am on the search organizations screen$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        // callback();
        setTimeout(callback, 3000);
    });

    this.When(/^I provide the parameters of the organization I wish to search for$/, function (callback) {
        Search.setOrgName('university*');
        Search.setSourceId('MN022');
        Search.selectCountry('United States');
        Search.selectState('Minnesota');
        // callback();
        setTimeout(callback, 3000);
    });

    this.Then(/^the system should display all organizations that contain all of the entered parameters$/, function (callback) {
        expect(Search.inResults('University of Minnesota Medical Center-Fairview')).to.become(true);
        expect(Search.inResults('MN022')).to.become(true);
        // expect(Search.inResults('United States')).to.become(true);
        expect(Search.inResults('Minnesota')).to.become(true);
        expect(Search.inResults('MN021')).to.become(false);
        // callback();
        setTimeout(callback, 3000);
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


    this.Given(/^I know the status of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on a search organizations screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the status of the organization I wish to search for$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that have a matching organization status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}