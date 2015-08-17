/**
 * Created by singhs10 on 7/30/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

ListOfOrganizationsPage = function () {

     this.orgName = element(by.model('searchParams.name'));
     this.alias = element(by.model('searchParams.alias'));
     this.poId = element(by.model('searchParams.ctrp_id'));
     this.phone = element(by.model('searchParams.phone'));
     this.sourceContext = element(by.model('searchParams.source_context'));
     this.sourceId = element(by.model('searchParams.source_id'));
     this.sourceStatus = element(by.model('searchParams.source_status'));
     this.address = element(by.model('searchParams.address'));
     this.address2 = element(by.model('searchParams.address2'));
     this.familyName = element(by.model('searchParams.family_name'));
     this.email = element(by.model('searchParams.email'));
     this.country = element(by.model('searchParams.country'));
     this.state = element(by.model('searchParams.state_province'));
     this.city = element(by.model('searchParams.city'));
     this.postalCode = element(by.model('searchParams.postal_code'));
     this.searchButton = element(by.css('button[ng-click="searchOrgs()"]'));
     this.clearButton = element(by.buttonText('Clear'));

    this.names = element.all(by.binding('grid.getCellValue(row, col) '));

    var search = new helper();

    this.setOrgName = function(orgName){
        search.setValue(this.orgName,orgName,"Organization Search by Name field");
    };

 /*    this.setOrgName = function(orgName){
         helper.wait(this.orgName,"Organization Search by Name field");
         this.orgName.clear();
         this.orgName.sendKeys(orgName);
     };*/

   /*  this.checkAlias = function(alias){
         search.wait(this.alias,"Organization Alias checkbox");
         var CheckBoxState = this.alias.isSelected(); //.getAttribute('checked');
         if (!CheckBoxState && alias) //check it now
            {
                this.alias.click();
            } else if (CheckBoxState && !alias) {
             console.log("trying to uncheck");
             this.alias.click();
         } else if (!CheckBoxState && !alias) {

         }

     };
*/

    this.checkAlias = function(aliass) {
        var useSslInput = this.alias;
        if (useSslInput.isSelected() != aliass && aliass) {
            useSslInput.isSelected().then(function (selected) {
                if (selected) {
                    useSslInput.click();
                }
            });
        } else {
            useSslInput.isSelected().then(function (selected) {
                if (!selected) {
                    useSslInput.click();
                }
            });
        }
    };

     this.setPoId = function(poId){
         search.setValue(this.poId,poId,"Organization Search by PO ID field");
     };

    this.setPhone = function(phone){
        search.setValue(this.phone,phone,"Organization Search by Phone field");
    };

    this.selectSourceContext = function(sourceContext){
        search.selectValue(this.sourceContext,sourceContext,"Organization Search by Source Context field");
    };

     this.setSourceId = function(sourceId){
         search.setValue(this.sourceId,sourceId,"Organization Search by SourceId field");
     };



     this.selectSourceStatus = function(sourceStatus){
         search.selectValue(this.sourceStatus,sourceStatus,"Organization Search by Source Status field");
     };

     this.setAddress = function(address){
         search.setValue(this.address,address,"Organization Search by address field");
     };

     this.setAddress2 = function(address2){
         search.setValue(this.address2,address2,"Organization Search by Address2 field");
     };

     this.setFamilyName = function(familyName){
         search.setValue(this.familyName,familyName,"Organization Search by Family Name field");
     };

     this.setEmail = function(email){
         search.setValue(this.email,email,"Organization Search by Email field");
     };

     this.selectCountry = function(country){
         search.selectValue(this.country,country,"Organization Search by Name field");
     };

     this.selectState = function(state){
         search.selectValue(this.state,state,"Organization Search by State field");
     };

     this.setCity = function(city){
         search.setValue(this.city,city,"Organization Search by City field");
     };

     this.setPostalCode = function(postalCode){
         search.setValue(this.postalCode,postalCode,"Organization Search by Postal Code field");
     };

     this.clickSearchButton = function(){
         search.wait(this.searchButton,"Organization Click Search button");
         this.searchButton.click();
     };

     this.clickClearButton = function(){
         search.wait(this.clearButton,"Organization Click Clear button");
         this.clearButton.click();
     };

    this.inResults = function(nameString) {
        return this.names.filter(function(name) {
            return name.getText().then(function(text) {
                return text === nameString;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            return filteredElements.length > 0;
        });
    };

};
module.exports = ListOfOrganizationsPage;