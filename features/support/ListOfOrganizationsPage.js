/**
 * Created by singhs10 on 7/30/15.
 */

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
         this.orgName.clear();
       this.orgName.sendKeys(orgName);
     };

     this.checkAlias = function(aliass){
     var CheckBoxState = this.alias.getAttribute('checked');
     if (CheckBoxState != aliass)
     {
     this.alias.click();
     }
     };

     this.setPoId = function(poId){
     this.poId.clear();
     this.poId.sendKeys(poId);
     };

     this.setSource = function(source){
         this.source.clear();
     this.source.sendKeys(source);
     };

     this.selectSourceStatus = function(sourceStatus){
     this.sourceStatus.$('[value="' + sourceStatus + '"]').click();
     };

     this.setAddress = function(address){
     this.address.clear();
     this.address.sendKeys(address);
     };

     this.setAddress2 = function(address2){
     this.address2.clear();
     this.address2.sendKeys(address2);
     };

     this.setFamilyName = function(familyName){
     this.familyName.clear();
     this.familyName.sendKeys(familyName);
     };

     this.setEmail = function(email){
     this.email.clear();
     this.email.sendKeys(email);
     };

     this.selectCountry = function(country){
     this.country.$('[value="' + country + '"]').click();
     };

     this.selectState = function(state){
     this.state.$('[value="' + state + '"]').click();
     };

     this.setCity = function(city){
     this.city.clear();
     this.city.sendKeys(city);
     };

     this.setPostalCode = function(postalCode){
     this.postalCode.clear();
     this.postalCode.sendKeys(postalCode);
     };

     this.clickSearchButton = function(){
     this.searchButton.click();
     };

     this.clickClearButton = function(){
     this.clearButton.click();
     };

};
module.exports = ListOfOrganizationsPage;