/**
 * Created by singhs10 on 8/10/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

ListOfFamiliesPage = function () {
    this.familyName = element(by.model('familyView.searchParams.name'));
    this.familyId = element(by.model('familyView.searchParams.po_id'));
    this.familyStatus = element(by.model('familyView.searchParams.family_status'));
    this.familyType = element(by.model('familyView.searchParams.family_type'));
    this.familySearchButton = element(by.css('.glyphicon.glyphicon-search'));
    this.familyClearButton = element(by.css('button[type="reset"]'));

    var searchFamily = new helper();

    this.setFamilyName = function(familyName){
       searchFamily.setValue(this.familyName,familyName,"Search Family by Name field");
    };

    this.setFamilyId = function(familyId){
        searchFamily.setValue(this.familyId,familyId,"Search Family by Id field");
    };

    this.selectFamilyStatus = function(familyStatus){
        searchFamily.selectValue(this.familyStatus,familyStatus,"Search Family by Status field");
    };

    this.selectFamilyType = function(familyType){
        searchFamily.selectValue(this.familyType,familyType,"Search Family by Type field");
    };

    this.clickSearchButton = function(){
        searchFamily.clickButton(this.familySearchButton, "Search button on Family Search");
    };

    this.clearSearchButton = function(){
        searchFamily.clickButton(this.familyClearButton, "Clear button on Family Search");
    };
};

module.exports = ListOfFamiliesPage;
