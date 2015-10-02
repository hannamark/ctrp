/**
 * Created by singhs10 on 8/10/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

AddFamilyPage = function () {
    this.addFamilyName = element(by.model('familyDetailView.curFamily.name'));
    this.addFamilyStatus = element(by.model('familyDetailView.curFamily.family_status_id'));
    this.addFamilyType = element(by.model('familyDetailView.curFamily.family_type_id'));
    this.addFamilyDescription = element(by.model('familyDetailView.curFamily.description'));
    this.addFamilySearchMembership = element(by.model('familyDetailView.orgsSearchParams.name'));
    this.addFamilyMembership = element(by.model('familyDetailView.selectedOrgs'));
    this.addFamilySelectAllMembership = element(by.css('.glyphicon.glyphicon-arrow-right'));
    this.addFamilyRemoveAllMembership = element(by.css('.glyphicon.glyphicon-arrow-left'));
    this.addFamilySaveButton = element(by.css('input[ng-click="familyDetailView.updateFamily()"]'));
    this.addFamilyResetButton = element(by.css('input[value="Reset"]'));
    this.addFamilyDeleteButton = element(by.css('button[ng-hide="familyDetailView.curFamily.new"]'));

    var addFamily = new helper();

    this.setAddFamilyName = function(familyName){
        addFamily.setValue(this.addFamilyName,familyName,"Add Family by Name field");
    };

    this.selectAddFamilyStatus = function(familyStatus){
        addFamily.selectValue(this.addFamilyStatus,familyStatus,"Add Family by Status field");
    };

    this.selectAddFamilyType = function(familyType){
        addFamily.selectValue(this.addFamilyType,familyType,"Add Family by Type field");
    };

    this.setAddFamilyDescription = function(familyDescription){
        addFamily.setValue(this.addFamilyDescription,familyDescription,"Add Family by Description field");
    };

    this.setAddFamilySearchMembership = function(familySearchMembership){
        addFamily.setValue(this.addFamilySearchMembership,familySearchMembership,"Add Family by Search Membership field");
    };

    this.setAddFamilyMembership = function(familyMembership){
        addFamily.setValue(this.addFamilyMembership,familyMembership,"Add Family by Membership");
    };

    this.clickSelectAllMembership = function(){
        addFamily.clickButton(this.addFamilySelectAllMembership,"Add family Select All Membership button");
    };

    this.clickRemoveAllMembership = function(){
        addFamily.clickButton(this.addFamilyRemoveAllMembership, "Add Family Remove All Membership button");
    };

    this.clickSave = function(){
        addFamily.clickButton(this.addFamilySaveButton,"Add Family by Save button");
    };

    this.clickReset = function(){
        addFamily.clickButton(this.addFamilyResetButton,"Add Family by Reset button");
    };

    this.clickDelete = function(){
        addFamily.clickButton(this.addFamilyDeleteButton,"Add Family by Delete button");
    };

    this.familyVerifyAddName = function(familyName){
        addFamily.getVerifyValue(this.addFamilyName,familyName,"Get family by Name field");
    };

    this.familyVerifyAddType = function(familyType){
        addFamily.getVerifyListValue(this.addFamilyType,familyType,"Get family by Type field");
    };

    this.familyVerifyAddStatus = function(familyStatus){
        addFamily.getVerifyListValue(this.addFamilyStatus,familyStatus,"Get family by Status field");
    };
};
module.exports = AddFamilyPage;
