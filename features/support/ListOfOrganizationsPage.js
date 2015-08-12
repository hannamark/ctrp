/**
 * Created by singhs10 on 7/30/15.
 */

var helper = require('../support/helper');

ListOfOrganizationsPage = function () {

     this.orgName = element(by.model('orgsView.searchParams.name'));
     this.alias = element(by.model('orgsView.searchParams.alias'));
     this.poId = element(by.model('orgsView.searchParams.id'));
     this.source = element(by.model('orgsView.searchParams.source_id'));
     this.sourceStatus = element(by.model('orgsView.searchParams.source_status'));
     this.address = element(by.model('orgsView.searchParams.address'));
     this.address2 = element(by.model('orgsView.searchParams.address2'));
     this.familyName = element(by.model('orgsView.searchParams.family_name'));
     this.email = element(by.model('orgsView.searchParams.email'));
     this.country = element(by.model('orgsView.searchParams.country'));
     this.state = element(by.model('orgsView.searchParams.state_province'));
     this.city = element(by.model('orgsView.searchParams.city'));
     this.postalCode = element(by.model('orgsView.searchParams.postal_code'));
     this.searchButton = element(by.css('button[ng-click="orgsView.searchOrgs()"]'));
     this.clearButton = element(by.buttonText('Clear'));

     this.setOrgName = function(orgName){
         helper.wait(this.orgName,"Organization Search by Name field");
         this.orgName.clear();
         this.orgName.sendKeys(orgName);
     };

     this.checkAlias = function(aliass){
        // helper.wait(this.checkAlias(),"Organization Alias checkbox");
         var CheckBoxState = this.alias.getAttribute('checked');
         if (CheckBoxState != aliass)
            {
                this.alias.click();
            }
     };


/*    this.checkAlias = function(aliass) {
        var useSslInput = this.alias;
        if (useSslInput.isSelected() != aliass) {
            useSslInput.isSelected().then(function (selected) {
                if (!selected) {
                    useSslInput.click();
                }
            });
        } else {
            useSslInput.isSelected().then(function (selected) {
                if (selected) {
                    useSslInput.click();
                }
            });
        }
    };*/

     this.setPoId = function(poId){
         helper.wait(this.poId,"Organization Search by PO ID field");
         this.poId.clear();
         this.poId.sendKeys(poId);
     };

     this.setSource = function(source){
         helper.wait(this.source,"Organization Search by Source field");
         this.source.clear();
         this.source.sendKeys(source);
     };

     this.selectSourceStatus = function(sourceStatus){
         helper.wait(this.sourceStatus,"Organization Search by Source Status field");
         this.sourceStatus.$('[value="' + sourceStatus + '"]').click();
     };

     this.setAddress = function(address){
         helper.wait(this.address,"Organization Search by address field");
         this.address.clear();
         this.address.sendKeys(address);
     };

     this.setAddress2 = function(address2){
         helper.wait(this.address2,"Organization Search by address2 field");
         this.address2.clear();
         this.address2.sendKeys(address2);
     };

     this.setFamilyName = function(familyName){
         helper.wait(this.familyName,"Organization Search by Family Name field");
         this.familyName.clear();
         this.familyName.sendKeys(familyName);
     };

     this.setEmail = function(email){
         helper.wait(this.email,"Organization Search by Email field");
         this.email.clear();
         this.email.sendKeys(email);
     };

     this.selectCountry = function(country){
         helper.wait(this.country,"Organization Search by Country field");
         this.country.$('[value="' + country + '"]').click();
     };

     this.selectState = function(state){
         helper.wait(this.state,"Organization Search by State field");
         this.state.$('[value="' + state + '"]').click();
     };

     this.setCity = function(city){
         helper.wait(this.city,"Organization Search by City field");
         this.city.clear();
         this.city.sendKeys(city);
     };

     this.setPostalCode = function(postalCode){
         helper.wait(this.postalCode,"Organization Search by Postal Code field");
         this.postalCode.clear();
         this.postalCode.sendKeys(postalCode);
     };

     this.clickSearchButton = function(){
         helper.wait(this.searchButton,"Organization Click Search button");
         this.searchButton.click();
     };

     this.clickClearButton = function(){
         helper.wait(this.clearButton,"Organization Click Clear button");
         this.clearButton.click();
     };

};
module.exports = ListOfOrganizationsPage;