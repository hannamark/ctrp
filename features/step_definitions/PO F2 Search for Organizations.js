/**
 * Created by singhs10 on 7/16/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList.js');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require ('moment');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchOrg = new listOfOrganizationPage();
    var addOrg = new addOrganizationPage();
    var selectItem =new mainSelectItemPage();
    var projectFunctions = new projectFunctionsPage();
    var CTEPID = 'ACRN';

    this.Given(/^I know the name of the organization I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrg1', 'alias', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            storeOrg1 = cukeOrganization.then(function(value) {
                console.log('This is the first org that is added' + value);
                return value;
            });
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            menuItem.clickOrganizations();
            menuItem.clickAddOrganizations();
            projectFunctions.createOrganization('singhOrg2', 'alias2', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                cukeOrganization.then(function(value) {
                    console.log('This is the second Org:' + value);
                    menuItem.clickOrganizations();
                    menuItem.clickListOrganizations();
                    searchOrg.setOrgName(value);
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inSearchResults(value)).to.become('true');
                    element(by.linkText(value)).click();
                    storeOrg1.then(function(value) {
                        console.log('This is the first1 org that will be added in Alias' + value);
                        addOrg.setAddAlias(value);
                        addOrg.clickSaveAlias();
                        addOrg.clickSave();
                    });
                });
            });
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am logged in to CTRP$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpadmin', 'Welcome01');
        login.accept();
        menuItem.clickHomeEnterOrganizations();
        login.clickWriteMode();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the option to search for an organization$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial name of the organization I wish to search for$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org for search:' + value);
            searchOrg.setOrgName(value);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I indicate to include aliases$/, function (callback) {
        searchOrg.checkAlias(false);
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my search request$/, function (callback) {
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the name or the alias$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        cukeOrganization.then(function (value) {
            console.log('This is the second Org which contains the alias:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I indicate to not search Aliases$/, function (callback) {
        searchOrg.checkAlias(true);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the name$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        cukeOrganization.then(function (value) {
            console.log('This is the second Org that has the first Org Alias:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('false');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the Source Context and Source ID of the organization I wish to search for$/, function (callback) {
       callback();
    });

    this.When(/^I provide the Source Context and Source ID of the organization I wish to search for$/, function (callback) {
        selectItem.selectSourceContext('CTEP');
        searchOrg.setSourceId(CTEPID);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the CTEP ID$/, function (callback) {
        expect(projectFunctions.inSearchResults(CTEPID)).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the PO Organization ID of the organization I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function()  {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgPOID', 'alias', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                cukeOrganization.then(function(value) {
                    console.log('This is the second Org:' + value);
                    menuItem.clickOrganizations();
                    menuItem.clickListOrganizations();
                    searchOrg.setOrgName(value);
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inSearchResults(value)).to.become('true');
                    element(by.linkText(value)).click();
                });
            });
        });
        ctrpID = addOrg.addOrgCTRPID.getText();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the PO Organization ID of the organization I wish to search for$/, function (callback) {
        ctrpID.then(function(value) {
           console.log('This is the CTRP ID of added Org' + value);
            searchOrg.setSourceId(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the Source ID for the Source Context$/, function (callback) {
        ctrpID.then(function(value) {
            console.log('This is the CTRP ID of added Org' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the Family name to which the organization I wish to search for belongs to$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createFamilyWithMembers('shiFam','Active','NIH','shiFamOrg','','','');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial Family name of the organization I wish to search for$/, function (callback) {
        cukeFamily.then(function(value) {
            console.log('This is the family created for Org-Family search:' + value);
            searchOrg.setFamilyName(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that are members of the Family Name$/, function (callback) {
        cukeFamily.then(function(value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the city I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgCity','alias','add1','add2','United States','Florida','cityAvenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial city of the organization I wish to search for$/, function (callback) {
        searchOrg.setCity('cityAvenue');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the city$/, function (callback) {
        expect(projectFunctions.inSearchResults('cityAvenue')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the state I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgState','alias','add1','add2','Andorra','Canillo','cityAvenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the state from a list of states displayed by CTRP$/, function (callback) {
        selectItem.selectCountrySearchOrg('Andorra');
        selectItem.selectStateSearchOrg('Canillo');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the state$/, function (callback) {
        expect(projectFunctions.inSearchResults('Canillo')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the country I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgCountry','alias','add1','add2','Malta','Isla','cityAvenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the country from a list of countries displayed by CTRP$/, function (callback) {
        selectItem.selectCountrySearchOrg('Malta');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the country$/, function (callback) {
        expect(projectFunctions.inSearchResults('Malta')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the zip code I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgZip','alias','add1','add2','Malta','Isla','cityAvenue','99999','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial zip code of the organization I wish to search for$/, function (callback) {
        searchOrg.setPostalCode('99999');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the zip code$/, function (callback) {
        expect(projectFunctions.inSearchResults('99999')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the organization phone number I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgPhone','alias','add1','add2','Malta','Isla','cityAvenue','99999','s@s.com','007-7777-777','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial phone number of the organization I wish to search for$/, function (callback) {
        searchOrg.setPhone('007-7777-777');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations with matching phone numbers$/, function (callback) {
        expect(projectFunctions.inSearchResults('007-7777-777')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know multiple parameters of the organization I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgMulti','alias','add1','add2','Palau','Airai','cityAvenueM','88888','sem@s.com','008-8888-888','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the search organizations screen$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the parameters of the organization I wish to search for$/, function (callback) {
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            selectItem.selectCountrySearchOrg('Palau');
            selectItem.selectStateSearchOrg('Airai');
            searchOrg.setCity('cityAvenueM');
            searchOrg.setPostalCode('88888');
            searchOrg.setEmail('sem@s.com');
            searchOrg.setPhone('008-8888-888')
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain all of the entered parameters$/, function (callback) {
        cukeOrganization.then(function(value){
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            expect(projectFunctions.inSearchResults('Palau')).to.become('true');
            expect(projectFunctions.inSearchResults('Airai')).to.become('true');
            expect(projectFunctions.inSearchResults('cityAvenueM')).to.become('true');
            expect(projectFunctions.inSearchResults('88888')).to.become('true');
            expect(projectFunctions.inSearchResults('sem@s.com')).to.become('true');
            expect(projectFunctions.inSearchResults('008-8888-888')).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the date of the curator date I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgCuDate','alias','add1','add2','Palau','Airai','cityAvenueM','88888','sem@s.com','008-8888-888','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am logged in to CTRP PO application$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        menuItem.clickHomeEnterOrganizations();
        login.clickWriteMode();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the curator date of the organization I wish to search for$/, function (callback) {
        curatorDate = moment().format('YYYY-MM-DD');
        searchOrg.setOrgLastUpdatedStartDate(curatorDate);
        searchOrg.setOrgLastUpdatedEndDate(curatorDate);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the curator date$/, function (callback) {
        cukeOrganization.then(function(value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            expect(projectFunctions.inSearchResults('curatorDate')).to.become('true').and.notify(callback);
        });
    });

    this.Given(/^I know the name of the curator user name I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgCuName','alias','add1','add2','Palau','Airai','cityAvenueM','88888','sem@s.com','008-8888-888','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the curator user name of the organization I wish to search for$/, function (callback) {
        searchOrg.setOrgLastUpdatedName('ctrpcurator');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the curator user name$/, function (callback) {
        cukeOrganization.then(function(value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            expect(projectFunctions.inSearchResults('ctrpcurator')).to.become('true').and.notify(callback);
        });
    });


    this.Given(/^I know the status of the organization I wish to search for$/, function (callback) {
        callback();
    });

    this.Given(/^I am on a search organizations screen$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the status of the organization I wish to search for$/, function (table, callback) {
        selectItem.selectSourceStatus('Pending');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that have a matching organization status$/, function (callback) {
        expect(projectFunctions.inSearchResults('Pending')).to.become('true');
    browser.sleep(25).then(callback);
    });

    this.Given(/^I know the parameters of organization I wish to search for$/, function (callback) {
        callback();
    });

    this.When(/^I provide the partial name with wild card '\*' of the (.*) I wish to search for$/, function (OrganizationName, callback) {
        searchOrg.setOrgName(OrganizationName);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I indicate to include or not include a (.*)$/, function (SearchAliases, callback) {
        if(SearchAliases == 'No'){
            searchOrg.checkAlias(true);
        }
        if(SearchAliases == 'Yes'){
            searchOrg.checkAlias(false);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Source Context (.*)$/, function (SourceContext, callback) {
        selectItem.selectSourceContext(SourceContext);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Source ID (.*)$/, function (SourceID, callback) {
        searchOrg.setSourceId(SourceID);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Source Status (.*)$/, function (SourceStatus, callback) {
        selectItem.selectSourceStatus(SourceStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Family Name (.*)$/, function (FamilyName, callback) {
        searchOrg.setFamilyName(FamilyName);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the City (.*)$/, function (City, callback) {
        searchOrg.setCity(City);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I select the State (.*) from a list of state names$/, function (State, callback) {
        selectItem.selectStateSearchOrg(State);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Country (.*)$/, function (Country, callback) {
        selectItem.selectCountrySearchOrg(Country);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Phone Number (.*)$/, function (PhoneNumber, callback) {
        searchOrg.setPhone(PhoneNumber);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Email (.*)$/, function (Email, callback) {
        searchOrg.setEmail(Email);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Curator Name (.*)$/, function (CuratorName, callback) {
        searchOrg.setOrgLastUpdatedName(CuratorName);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Curator Date (.*)$/, function (CuratorDate, callback) {
        searchOrg.setOrgLastUpdatedStartDate(CuratorDate);
        searchOrg.setOrgLastUpdatedEndDate(CuratorDate);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display (.*) with organizations that match the search criteria$/, function (Result, callback) {
        //console.log('value here is:' + searchOrg.orgName.getText());
        searchOrg.orgName.getAttribute('value').then(function(orgName){
            console.log('orgName here is:' + orgName);
            searchOrg.sourceContext.$('option:checked').getText().then(function(sourceContext){
                console.log('sourceContext here is:' + sourceContext);
                searchOrg.sourceStatus.$('option:checked').getText().then(function(sourceStatus){
                    console.log('sourceStatus here is:' + sourceStatus);
                    searchOrg.sourceId.getAttribute('value').then(function(sourceId){
                        console.log('sourceId here is:' + sourceId);
                        searchOrg.familyName.getAttribute('value').then(function(familyName){
                            console.log('familyName here is:' + familyName);
                            searchOrg.city.getAttribute('value').then(function(city){
                                console.log('city here is:' + city);
                                searchOrg.orgUpdatedByName.getAttribute('value').then(function(orgUpdatedByName){
                                    console.log('orgUpdatedByName here is:' + orgUpdatedByName);
                                    searchOrg.postalCode.getAttribute('value').then(function(postalCode){
                                        console.log('postalCode here is:' + postalCode);
                                        searchOrg.country.$('option:checked').getText().then(function(country){
                                            console.log('country here is:' + country);
                                            searchOrg.phone.getAttribute('value').then(function(phone){
                                                console.log('phone here is:' + phone);
                                                searchOrg.email.getAttribute('value').then(function(email){
                                                    console.log('email here is:' + email);
                                                    searchOrg.state.$('option:checked').getText().then(function(state) {
                                                        console.log('state here is:' + state);
                                                        if (orgName == '' && sourceContext == 'All Contexts' && sourceStatus == 'Select a Status' && sourceId == '' && familyName == '' && city == '' && postalCode == '' && country == 'All Countries' && phone == '' && email == '' && state == 'All States/Provinces') {
                                                            menuItem.verifyEmptySearchCriteria(callback);
                                                        } else {
                                                            console.log('in the else statement');
                                                            expect(projectFunctions.inSearchResults('CTRP')).to.become(Result).and.notify(callback);
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
         /*   if(value == ''){
                console.log('value here is:' + value);
                menuItem.verifyEmptySearchCriteria();
            }
        }) ;*/
      //  browser.sleep(25).then(callback);
    });

    this.Given(/^the following fields should be displayed:$/, function (table, callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^the result should be sorted by Organization Name$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to see the detail information of organization when linked with Family$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createFamilyWithMembers('shiFam','Active','NIH','shiFamOrg','','','');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select an organization name in the search results$/, function (callback) {
        cukeOrganization.then(function(value) {
            console.log('This is the Org:' + value);
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();});
        browser.sleep(25).then(callback);
    });

    this.Then(/^the complete family organization information will be displayed including:$/, function (table, callback) {
        expect(addOrg.verifyAddOrgLabels('CTRP ID:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Name:')).to.become('true');
           expect(addOrg.verifyAddOrgLabels('Name Alias:')).to.become('true');
             expect(addOrg.verifyAddOrgLabels('Source Context:')).to.become('true');
           expect(addOrg.verifyAddOrgLabels('Source ID:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Source Status:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Address 1:')).to.become('true');
             expect(addOrg.verifyAddOrgLabels('Address 2:')).to.become('true');
             expect(addOrg.verifyAddOrgLabels('City:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('State:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Country:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Families:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Email:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Phone:')).to.become('true');
           addOrg.verifyAddOrgPostalCodeLabel();
            addOrg.verifyAddOrgFaxLabel();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to see the detail information of organization$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrg','alias','add1','add2','United States','Florida','avenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the complete organization information will be displayed including:$/, function (table, callback) {
        expect(addOrg.verifyAddOrgLabels('CTRP ID:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Name:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Name Alias:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Source Context:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Source ID:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Source Status:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Address 1:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Address 2:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('City:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('State:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Country:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Families:')).to.become('false');
        expect(addOrg.verifyAddOrgLabels('Email:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Phone:')).to.become('true');
        addOrg.verifyAddOrgPostalCodeLabel();
        addOrg.verifyAddOrgFaxLabel();
        browser.sleep(25).then(callback);
    });


}