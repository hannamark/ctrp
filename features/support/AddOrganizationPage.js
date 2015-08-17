/**
 * Created by singhs10 on 8/7/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

AddOrganizationsPage = function(){
    this.addOrgName = element(by.model('orgDetailView.curOrg.name'));
    this.addSourceId = element(by.model('orgDetailView.curOrg.source_id'));
    this.addSourceStatus = element(by.model('orgDetailView.curOrg.source_status_id'));
    this.addAddress = element(by.model('orgDetailView.curOrg.address'));
    this.addAddress2 = element(by.model('orgDetailView.curOrg.address2'));
    this.addCountry = element(by.model('orgDetailView.curOrg.country'));
    this.addState = element(by.model('orgDetailView.curOrg.state_province'));
    this.addCity = element(by.model('orgDetailView.curOrg.city'));
    this.addPostalCode = element(by.model('orgDetailView.curOrg.postal_code'));
    this.addEmail = element(by.model('orgDetailView.curOrg.email'));
    this.addPhone = element(by.model('orgDetailView.curOrg.phone'));
    this.addFax = element(by.model('orgDetailView.curOrg.fax'));
    this.saveButton = element(by.css('input[value="Save"]'));
    this.resetButton = element(by.css('input[value="Reset"]'));

    var addOrg = new helper();

    this.setAddOrgName = function(orgName){
        addOrg.setValue(this.addOrgName,orgName,"Organization by Name field");
    };

    this.setAddSourceId = function(sourceId){
        addOrg.setValue(this.addSourceId,sourceId,"Organization by Source ID field");
    };

    this.selectAddSource = function(sourceStatus){
        addOrg.selectValue(this.addSourceStatus,sourceStatus,"Organization by Source Status field");
    };

    this.setAddAddress = function(address){
        addOrg.setValue(this.addAddress,address,"Organization by Address field");
    };

    this.setAddAddress2 = function(address2){
        addOrg.setValue(this.addAddress2,address2,"Organization by Address2 field");
    };

    this.selectAddCountry = function(country){
        addOrg.selectValue(this.addCountry,country,"Organization by Country field");
    };

    this.selectAddState = function(state){
        addOrg.selectValue(this.addState,state,"Organization by State field");
    };

    this.setAddCity = function(city){
        addOrg.setValue(this.addCity,city,"Organization by City field");
    };

    this.setAddPostalCode = function(postalCode){
        addOrg.setValue(this.addPostalCode,postalCode,"Organization by Postal Code field");
    };

    this.setAddEmail = function(email){
        addOrg.setValue(this.addEmail,email,"Organization by Email field");
    };

    this.setAddPhone = function(phone){
        addOrg.setValue(this.addPhone,phone,"Organization by Phone field");
    };

    this.setAddFax = function(fax){
        addOrg.setValue(this.addFax,fax,"Organization by Fax field");
    };

    this.clickSave = function(){
        addOrg.clickButton(this.saveButton,"Save button on Organization page");
    };

    this.clickReset = function(){
        addOrg.clickButton(this.resetButton,"Reset button on Organization page");
    };

};
module.exports = AddOrganizationsPage;
