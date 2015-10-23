/**
 * Created by singhs10 on 8/7/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');

AddOrganizationsPage = function(){
    this.addOrgName = element(by.model('orgDetailView.curOrg.name'));
    this.addSourceContext = element(by.model('orgDetailView.curOrg.source_context_id'));
    this.addSourceId = element(by.model('orgDetailView.curOrg.source_id'));
    this.addSourceStatus = element(by.model('orgDetailView.curOrg.source_status_id'));
    this.addAlias = element(by.model('orgDetailView.alias'));
    this.addAliasButton = element(by.css('button[ng-click="orgDetailView.addNameAlias()"]'));
    this.addAddress = element(by.model('orgDetailView.curOrg.address'));
    this.addAddress2 = element(by.model('orgDetailView.curOrg.address2'));
    this.addCountry = element(by.model('orgDetailView.curOrg.country'));
    this.addState = element(by.model('orgDetailView.curOrg.state_province'));
    this.addCity = element(by.model('orgDetailView.curOrg.city'));
    this.addPostalCode = element(by.model('orgDetailView.curOrg.postal_code'));
    this.addEmail = element(by.model('orgDetailView.curOrg.email'));
    this.addPhone = element(by.model('orgDetailView.curOrg.phone'));
    this.addFax = element(by.model('orgDetailView.curOrg.fax'));
    this.saveButton = element(by.id('save_btn')); //element(by.css('input[value="Save"]'));
    this.resetButton = element(by.css('input[value="Reset"]'));
    this.cancelButton = element(by.css('.btn.btn-default'));
    this.deleteButton = element(by.css('.btn.btn-danger'));
    this.orgLastUpdatedBy = element(by.binding('orgDetailView.curOrg.updated_by'));
    this.orgCreatedBy = element(by.binding('orgDetailView.curOrg.created_by'));
    this.addVerifyAddHeader = element(by.css('h4[ng-if="orgDetailView.curOrg.new"]'));
    this.addVerifyEditHeader = element(by.css('h4[ng-if="!orgDetailView.curOrg.new"]'));
    this.verifyAddedOrgAlias = element.all(by.binding('nameAlias.name'));
    this.addOrgCTRPID = element(by.binding('orgDetailView.curOrg.ctrp_id'));
    var addHeader = 'Add Organization';
    var editHeader = 'Edit Organization';

    var addOrg = new helper();
    var selectItem =new selectList();
    var menuItem = new menuItemList();

    this.setAddOrgName = function(orgName){
        addOrg.setValue(this.addOrgName,orgName,"Organization by Name field");
    };


    this.setAddSourceId = function(sourceId){
        addOrg.setValue(this.addSourceId,sourceId,"Organization by Source ID field");
    };


    this.setAddAlias = function(alias){
        addOrg.setValue(this.addAlias,alias,"Organization by Alias field");
    };

    this.clickSaveAlias = function(){
        addOrg.clickButton(this.addAliasButton,"Add Alias button on Organization page");
    };

    this.setAddAddress = function(address){
        addOrg.setValue(this.addAddress,address,"Organization by Address field");
    };

    this.setAddAddress2 = function(address2){
        addOrg.setValue(this.addAddress2,address2,"Organization by Address2 field");
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

    this.clickDelete = function(){
        addOrg.clickButton(this.deleteButton,"Delete button on Organization page");
    };

    this.clickReset = function(){
        addOrg.clickButton(this.resetButton,"Reset button on Organization page");
    };

    this.getVerifyAddOrgName = function(orgName){
        addOrg.getVerifyValue(this.addOrgName,orgName,"Get Organization by Name field");
    };

    this.getVerifyAddSourceId = function(sourceId){
        addOrg.getVerifyValue(this.addSourceId,sourceId,"Get Organization by Source ID field");
    };

    this.getVerifyAddSourceStatus = function(sourceStatus){
        addOrg.getVerifyListValue(this.addSourceStatus,sourceStatus,"Get Organization by Source Status field");
    };

    this.getVerifyAddAddress = function(address){
        addOrg.getVerifyValue(this.addAddress,address,"Get Organization by Address field");
    };

    this.getVerifyAddAddress2 = function(address2){
        addOrg.getVerifyValue(this.addAddress2,address2,"Get Organization by Address2 field");
    };

    this.getVerifyAddCountry = function(country){
        addOrg.getVerifyListValue(this.addCountry,country,"Get Organization by Country field");
    };

    this.getVerifyAddState = function(state){
        addOrg.getVerifyListValue(this.addState,state,"Get Organization by State field");
    };

    this.getVerifyAddCity = function(city){
        addOrg.getVerifyValue(this.addCity,city,"Get Organization by City field");
    };

    this.getVerifyAddPostalCode = function(postalCode){
        addOrg.getVerifyValue(this.addPostalCode,postalCode,"Get Organization by Postal Code field");
    };

    this.getVerifyAddEmail = function(email){
        addOrg.getVerifyValue(this.addEmail,email,"Get Organization by Email field");
    };

    this.getVerifyAddPhone = function(phone){
        addOrg.getVerifyValue(this.addPhone,phone,"Get Organization by Phone field");
    };

    this.getVerifyAddFax = function(fax){
        addOrg.getVerifyValue(this.addFax,fax,"Get Organization by Fax field");
    };

    this.getVerifyAddHeader = function(){
        addOrg.getVerifyheader(this.addVerifyAddHeader,addHeader,"Organization by Add header field");
    };

    this.getVerifyEditHeader = function(){
        addOrg.getVerifyheader(this.addVerifyEditHeader,editHeader,"Organization by Edit header field");
    };

    this.orgDefaultCreate = function(orgName, status, alias,address1, address2, country, state, city, postalCode, email, phone, fax){
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        this.setAddOrgName(orgName + moment().format('MMMDoYY hmmss'));
        org4 = this.addOrgName.getAttribute('value');
      //  org4.then(function(value2){
        //    console.log('print value'+ value2)});
        if(alias !== ''){this.setAddAlias(alias);this.clickSaveAlias();}
        this.setAddAddress(address1);
        this.setAddAddress2(address2);
     //   selectItem.selectCountry(country);
     //   selectItem.selectState(state);
        this.setAddCity(city);
        this.setAddPostalCode(postalCode);
        this.setAddEmail(email);
        this.setAddPhone(phone);
        this.setAddFax(fax);
        this.clickSave();
    };

};
module.exports = AddOrganizationsPage;
