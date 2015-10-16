/**
 * Created by singhs10 on 7/30/15.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helper = require('../support/helper');


var PoCommonBar = function(){
    this.home = element(by.css('a[href="#/main/welcome"]'));
    this.organizations = element(by.linkText('Organizations & Families'));
    this.listOrganizations = element(by.css('a[ui-sref="main.organizations"]')); //element(by.css('a[href="#/main/organizations"]'));
    this.addOrganizations = element(by.css('a[href="#/main/new_organization"]'));
    this.people = element(by.linkText('Persons'));
    this.listPeople = element(by.linkText('Search Persons'));// element(by.css('a[href="#/main/people"]'));
    this.addPerson = element(by.css('a[href="#/main/new_person"]'));
    this.family = element(by.linkText('Families'));
    this.listFamily = element(by.css('a[href="#/main/families"]'));
    this.addFamily = element(by.css('a[href="#/main/new_family"]'));
    this.signIn = element(by.css('a[href="#/main/sign_in"]'));
    this.signOut = element(by.css('a[ng-click="headerView.logOut()"]'));
    var menuItem = new helper();
    this.search_Page = element(by.css('div.row > h4'));
    this.add_Org_Page = element(by.css('h4[ng-if="orgDetailView.curOrg.new"]'));
    this.edit_Org_page = element(by.css('h4[ng-if="!orgDetailView.curOrg.new"]'));
    this.add_Family_Page = element(by.css('h4[ng-if="familyDetailView.curFamily.new"]'));
    this.edit_Family_Page = element(by.css('h4[ng-if="!familyDetailView.curFamily.new"]'));
    this.add_Person_Page = element(by.css('h4[ng-if="personDetailView.curPerson.new"]'));
    this.edit_Person_Page = element(by.css('h4[ng-if="!personDetailView.curPerson.new"]'));


    this.searchResult = element.all(by.binding('grid.getCellValue(row, col) '));
    this.searchHeader = element.all(by.binding(' col.displayName '));

    /*List parameters*/
    var search_Org_Page_Text = 'Search Organizations * for wild card (e.g. university* for any university)';
    var search_Family_Page_Text = 'Search Family * for wild card (e.g. Yal* for Yale Family)';
    var search_Person_Page_Text = 'Search Persons * for wild card (e.g. John*)';
    var add_Org_Page_Text = 'Add Organization';
    var edit_Org_Page_Text = 'Edit Organization';
    var add_Family_Page_Text = 'Add Family';
    var edit_Family_Page_Text = 'Edit Family';
    var add_Person_Page_Text = 'Add Person';
    var edit_Person_Page_Text = 'Edit Person';




    this.clickHome = function(){
        menuItem.clickLink(this.home, "Home link");
    };

    this.clickOrganizations = function(){
        menuItem.clickLink(this.organizations, "Organization link");
    };

    this.clickListOrganizations = function(){
        menuItem.clickLink(this.listOrganizations, "List of Organization link");
        expect(this.search_Page.getText()).to.eventually.equal(search_Org_Page_Text);
    };

    this.clickAddOrganizations = function(){
        menuItem.clickLink(this.addOrganizations, "Add Organization link");
        expect(this.add_Org_Page.getText()).to.eventually.equal(add_Org_Page_Text);
    };

    this.clickPeople = function(){
        menuItem.clickLink(this.people, "People link");
    };

    this.clickListPeople = function(){
        menuItem.clickLink(this.listPeople, "List of People link");
        expect(this.search_Page.getText()).to.eventually.equal(search_Person_Page_Text);
    };

    this.clickAddPerson = function(){
        menuItem.clickLink(this.addPerson, "Add Person link");
        expect(this.add_Person_Page.getText()).to.eventually.equal(add_Person_Page_Text);
    };


    this.clickListFamily = function(){
        menuItem.clickLink(this.listFamily, "List of Family link");
        expect(this.search_Page.getText()).to.eventually.equal(search_Family_Page_Text);
    };

    this.clickAddFamily = function(){
        menuItem.clickLink(this.addFamily, "Add Family link");
        expect(this.add_Family_Page.getText()).to.eventually.equal(add_Family_Page_Text);
    };

    this.clickSignIn = function(){
        menuItem.clickLink(this.signIn, "Sign in link");
    };

    this.clickSignOut = function(){
        menuItem.clickLink(this.signOut, "Sign Out link");
    };

    this.inResults = function(searchString) {
        return this.searchResult.filter(function(name) {
            return name.getText().then(function(text) {
                return text === searchString ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    this.inResultsHeader = function(searchString) {
        return this.searchHeader.filter(function(name) {
            return name.getText().then(function(text) {
                return text === searchString;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    this.clickRole = function(role){
       var role =  element(by.css('label[uib-btn-radio="\\\''+ role +'\\\'"]')); //element(by.css('label[btn-radio="\\\''+ role +'\\\'"]'));
        menuItem.clickButton(role,"Role");
    };

};

module.exports = PoCommonBar;
